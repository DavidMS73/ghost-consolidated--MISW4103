const { exec, execSync, spawn } = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const compareImages = require("resemblejs/compareImages");

// ProgressBar
const drawProgressBar = (progress) => {
  const barWidth = 30;
  const filledWidth = Math.floor(progress / 100 * barWidth);
  const emptyWidth = barWidth - filledWidth;
  const progressBar = '█'.repeat(filledWidth) + '▒'.repeat(emptyWidth);
  return `${progressBar} ${progress}%`;
}

// Lista de directorios base
const versionSourceDirs = [
  "../../PruebasRV/Puppeteer-Cucumber/",
  "../../Pruebas E2E/Puppeteer-Cucumber/",
];
const browserSourceDir = ["../Pruebas E2E/"]
const versionCommands = ["npm run tests:rv:45", "npm run tests:rv:596"];
const browserCommands = ["npm run puppeteer:chrome", "npm run puppeteer:firefox"];
const versions = ["v4.5", "v5.96"];
const browsers = ["Chrome", "Firefox"];
const logFilePath = path.join(__dirname, "execution_log.txt");

async function runScript(filePath, command) {
  let output = "";
  const promise1 = new Promise((resolve, reject) => {
    const process = spawn("npm", ["install"], {
      cwd: filePath,
      shell: true,
    });

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      output += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(output));
        return;
      }
      resolve(output);
    });

    process.on("error", (err) => {
      console.error(`Error executing script for ${filePath}: ${err.message}`);
      reject(err);
    });
  });
  await promise1;
  const promise2 = new Promise((resolve, reject) => {
    const process = spawn(command, {
      cwd: filePath,
      shell: true,
    });

    process.stdout.on("data", (data) => {
      output += data.toString();
    });

    process.stderr.on("data", (data) => {
      output += data.toString();
    });

    process.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(output));
        return;
      }
      resolve(output);
    });

    process.on("error", (err) => {
      console.error(`Error executing script for ${filePath}: ${err.message}`);
      reject(err);
    });
  });
  await promise2;
  return output;
}

async function copyScreenshots(source) {
  const destination = path.join(`${process.cwd()}/`, path.basename(source));
  await fs.copy(source, destination);
  console.log(`Folder copied from ${source} to ${destination}`);
}

async function runVersionsScript(log) {
  console.log("Starting version 4.5");
  log.push("Version 4.5");
  const script1 = await runScript(versionSourceDirs[0], versionCommands[0]);
  console.log("Finished version 4.5");
  log.push(script1);
  await copyScreenshots("../../PruebasRV/Puppeteer-Cucumber/output/screenshots");

  console.log("Starting version 5.96");
  log.push("Version 5.96");
  const script2 = await runScript(versionSourceDirs[1], versionCommands[1]);
  console.log("Finished version 5.96");
  log.push(script2);
  await copyScreenshots("../../Pruebas E2E/Puppeteer-Cucumber/output/screenshots");
}

async function runBrowsersScript(log) {
  console.log("Starting browser Chrome");
  log.push("Chrome");
  const script1 = await runScript(browserSourceDir[0], browserCommands[0]);
  console.log("Finished browser Chrome");
  log.push(script1);

  console.log("Starting browser Firefox");
  log.push("Firefox");
  const script2 = await runScript(browserSourceDir[0], browserCommands[1]);
  console.log("Finished browser Firefox");
  log.push(script2);

  await copyScreenshots("../Pruebas E2E/output/screenshots");
}

// Función principal
async function main() {
  const log = [];
  try {
    await fs.remove("./results_full_flow");
    if (process.env.VRT_TYPE === "versions") {
      await runVersionsScript(log);
    } else {
      await runBrowsersScript(log);
    }

    console.log("Starting comparison");
    await executeTest();
    console.log("Ended comparison, review results_full_flow folder");
    await fs.writeFile(logFilePath, log.join("\n\n"), "utf8");
  } catch (err) {
    console.error("Error:", err);
    log.push(`Error: ${err}`);
  }
}

// ===========================
// Compare Images
// ===========================

async function processSteps({ feature, scenario, outlinePathv1, outlinePathv2, outline
}, state) {
  const stepsv1 = fs.readdirSync(outlinePathv1);
  const stepsv2 = fs.readdirSync(outlinePathv2);

  //Ordenar los pasos, el numero esta al final
  stepsv1.sort((a, b) => {
    return a.match(/\d+/) - b.match(/\d+/);
  });
  stepsv2.sort((a, b) => {
    return a.match(/\d+/) - b.match(/\d+/);
  });
  const mx_length = Math.max(stepsv1.length, stepsv2.length);

  const steps = [];

  for (let step = 0; step < mx_length; step++) {
    //Verificar que el paso exista en los dos escenarios
    if (stepsv1[step] === undefined || stepsv2[step] === undefined) {
      continue;
    }
  //Comparar imagenes
    const stepPathv1 = `${outlinePathv1}/${stepsv1[step]}`;
    const stepPathv2 = `${outlinePathv2}/${stepsv2[step]}`;
    const data = await compareImages(
      fs.readFileSync(stepPathv1),
      fs.readFileSync(stepPathv2)
    );
    //Guardar imagen
    const compareResultImg = stepsv1[step]
      .split(".")
      .slice(0, -1)
      .join(".");
    const reportImgPath = `./results_full_flow/${feature}-${scenario}-${outline}-${compareResultImg}.png`;
    fs.writeFileSync(reportImgPath, data.getBuffer());

    //Metricas
    state.contador++;
    state.averageDiff += data.rawMisMatchPercentage;
    state.totalAnalysisTime += data.analysisTime;
    if (data.misMatchPercentage < 10) {
      state.lessThan10++;
    } else if (data.misMatchPercentage < 30) {
      state.lessThan30++;
    } else if (data.misMatchPercentage < 50) {
      state.lessThan50++;
    } else if (data.misMatchPercentage < 70) {
      state.lessThan70++;
    } else if (data.misMatchPercentage < 90) {
      state.lessThan90++;
    } else {
      state.highThan90++;
    }

    steps.push({
      id: step + 1,
      sameDimensions: data.isSameDimensions,
      difference: data.misMatchPercentage,
      originalImage: "../" + stepPathv1,
      newImage: "../" + stepPathv2,
      diffImage: "../results_full_flow/" + `${feature}-${scenario}-${outline}-${compareResultImg}.png`,
    });
  }

  return steps;
}

async function processOutline({ feature, scenario, escenarioPathv1, escenarioPathv2 }, state) {
  const outlinesv1 = fs.readdirSync(escenarioPathv1);
  const outlinesv2 = fs.readdirSync(escenarioPathv2);
  const outlinesLength = Math.max(outlinesv1.length, outlinesv2.length);
  const outlines = [];

  for (let outline = 0; outline < outlinesLength; outline++) {
    if (outlinesv1[outline] === undefined || outlinesv2[outline] === undefined) {
      continue;
    }

    const outlinePathv1 = `${escenarioPathv1}/${outlinesv1[outline]}`;
    const outlinePathv2 = `${escenarioPathv2}/${outlinesv2[outline]}`;

    const steps = await processSteps({ feature, scenario, outlinePathv1, outlinePathv2, outline: outlinesv1[outline] }, state);

    outlines.push({
      id: outline + 1,
      steps
    });
  }

  return outlines;
}

async function processScenarios({ feature, results, totalComparisons, featurePathv1, featurePathv2 }, state) {
  //Revisar que existan escenarios
  const scenarios = fs.readdirSync(featurePathv1);

  for (let scenario = 0; scenario < scenarios.length; scenario++) {
    const escenarioPathv1 = `${featurePathv1}/${scenarios[scenario]}`;
    const escenarioPathv2 = `${featurePathv2}/${scenarios[scenario]}`;
    if (!fs.existsSync(escenarioPathv1) || !fs.existsSync(escenarioPathv2)) {
      console.log(
        " Directory not found " +
        feature +
        " in " +
        scenarios[scenario]
      );
      continue;
    }

    const outlines = await processOutline({ feature, scenario: scenarios[scenario], escenarioPathv1, escenarioPathv2 }, state);

    results["report"].push({
      scenarioId: scenarios[scenario],
      title: feature,
      outlines
    });

    state.comparisonsMade++;
    const progressPercentage = Math.floor((state.comparisonsMade) / totalComparisons * 100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Progress: ${drawProgressBar(progressPercentage)}`);
  }
}

async function processFeatures({ features, sourceDirOutput, results, totalComparisons, collection }, state) {
  for (let feat = 0; feat < features.length; feat++) {
    const featurePathv1 = `${sourceDirOutput + collection[0]}/${features[feat]
      }`;
    const featurePathv2 = `${sourceDirOutput + collection[1]}/${features[feat]
      }`;
    //Revisar que existan las carpetas
    if (!fs.existsSync(featurePathv1) || !fs.existsSync(featurePathv2)) {
      console.log("Directory not found " + features[feat]);
      continue;
    }

    await processScenarios({ feature: features[feat], results, totalComparisons, featurePathv1, featurePathv2 }, state);
  }
}

async function executeTest() {
  //Reporte
  let results = {
    report: []
  };

  if (!fs.existsSync(`./results_full_flow`)) {
    fs.mkdirSync(`./results_full_flow`, { recursive: true });
  }

  // const sourceDirsOutput = versionSourceDirs.map((dir) => dir + "output/screenshots/");
  const sourceDirOutput = "./screenshots/";
  const vrtType = process.env.VRT_TYPE;
  const collection = vrtType === "versions" ? versions : browsers;

  //Lista
  const features = fs.readdirSync(sourceDirOutput + `${collection[0]}`);

  // Count total comparisons to show progress bar (Right now is number of scenarios)
  const totalComparisons = features.map((feat) => {
    const featurePathv1 = `${sourceDirOutput + collection[0]}/${feat
      }`;
    const featurePathv2 = `${sourceDirOutput + collection[1]}/${feat
      }`;
    //Revisar que existan las carpetas
    if (fs.existsSync(featurePathv1) && fs.existsSync(featurePathv2)) {
      return fs.readdirSync(featurePathv1);
    }
  }).reduce((prevValue, currentValue) => prevValue + currentValue.length, 0);

  let state = {
    comparisonsMade: 0,
    contador: 0,
    averageDiff: 0,
    totalAnalysisTime: 0,
    lessThan10: 0,
    lessThan30: 0,
    lessThan50: 0,
    lessThan70: 0,
    lessThan90: 0,
    highThan90: 0,
  }

  await processFeatures({ features, sourceDirOutput, results, totalComparisons, collection }, state);

  process.stdout.write("\n");
  const totalAvgDiff = state.averageDiff / state.contador;

  results = {
    ...results,
    totalComparisons: state.contador,
    averageDifference: totalAvgDiff,
    executionTime: state.totalAnalysisTime,
    differences: {
      10: state.lessThan10,
      30: state.lessThan30,
      50: state.lessThan50,
      70: state.lessThan70,
      90: state.lessThan90,
      100: state.highThan90,
    },
    vrtType,
    originalTitle: collection[0],
    newTitle: collection[1],
  }
  fs.writeFileSync("./results_full_flow/results.json", JSON.stringify(results, null, 2));
  console.log("HTML report generated sucessfully");
}

main();
