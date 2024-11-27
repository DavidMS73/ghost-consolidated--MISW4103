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
const sourceDirs = [
  "../../PruebasRV/Puppeteer-Cucumber/",
  "../../Pruebas E2E/Puppeteer-Cucumber/",
];
const commands = ["npm run tests:rv:45", "npm run tests:rv:596"];
const versions = ["v4.5", "v5.96"];
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
// Función principal
async function main() {
  const log = [];
  try {
    console.log("Starting version 4.5");
    log.push("Version 4.5");
    const script1 = await runScript(sourceDirs[0], commands[0]);
    console.log("Finished version 4.5");
    log.push(script1);

    console.log("Starting version 5.96");
    log.push("Version 5.96");
    const script2 = await runScript(sourceDirs[1], commands[1]);
    console.log("Finished version 5.96");
    log.push(script2);

    console.log("Starting comparison");
    await executeTest();
    console.log("Ended comparison, review results_full_flow folder");
    await fs.writeFile(logFilePath, log.join("\n\n"), "utf8");
  } catch (err) {
    console.error("Error:", err);
    log.push(`Error: ${err}`);
  }
}

async function executeTest() {
  //Reporte
  let results = {
    report: []
  };
  //Metricas
  let contador = 0;
  let averageDiff = 0;
  let totalAnalysisTime = 0;
  let lessThan10 = 0;
  let lessThan30 = 0;
  let lessThan50 = 0;
  let lessThan70 = 0;
  let lessThan90 = 0;
  let highThan90 = 0;

  if (!fs.existsSync(`./results_full_flow`)) {
    fs.mkdirSync(`./results_full_flow`, { recursive: true });
  }

  const sourceDirsOutput = sourceDirs.map((dir) => dir + "output/screenshots/");

  //Lista
  const features = fs.readdirSync(sourceDirsOutput[0] + `${versions[0]}`);

  // Count total comparisons to show progress bar (Right now is number of scenarios)
  const totalComparisons = features.map((feat) => {
    const featurePathv1 = `${sourceDirsOutput[0] + versions[0]}/${feat
      }`;
    const featurePathv2 = `${sourceDirsOutput[1] + versions[1]}/${feat
      }`;
    //Revisar que existan las carpetas
    if (fs.existsSync(featurePathv1) && fs.existsSync(featurePathv2)) {
      return fs.readdirSync(featurePathv1);
    }
  }).reduce((prevValue, currentValue) => prevValue + currentValue.length, 0);
  let comparisonsMade = 0;

  for (let feat = 0; feat < features.length; feat++) {
    const featurePathv1 = `${sourceDirsOutput[0] + versions[0]}/${features[feat]
      }`;
    const featurePathv2 = `${sourceDirsOutput[1] + versions[1]}/${features[feat]
      }`;
    //Revisar que existan las carpetas
    if (!fs.existsSync(featurePathv1) || !fs.existsSync(featurePathv2)) {
      console.log("Directory not found " + features[feat]);
      continue;
    }
    //Revisar que existan escenarios
    const scenarios = fs.readdirSync(featurePathv1);
    for (let scenario = 0; scenario < scenarios.length; scenario++) {
      const escenarioPathv1 = `${sourceDirsOutput[0] + versions[0]}/${features[feat]
        }/${scenarios[scenario]}`;
      const escenarioPathv2 = `${sourceDirsOutput[1] + versions[1]}/${features[feat]
        }/${scenarios[scenario]}`;
      if (!fs.existsSync(escenarioPathv1) || !fs.existsSync(escenarioPathv2)) {
        console.log(
          " Directory not found " +
          features[feat] +
          " in " +
          scenarios[scenario]
        );
        continue;
      }
      const stepsv1 = fs.readdirSync(escenarioPathv1);
      const stepsv2 = fs.readdirSync(escenarioPathv2);

      //Ordenar los pasos, el numero esta al final
      stepsv1.sort((a, b) => {
        return a.match(/\d+/) - b.match(/\d+/);
      });
      stepsv2.sort((a, b) => {
        return a.match(/\d+/) - b.match(/\d+/);
      });
      mx_length = Math.max(stepsv1.length, stepsv2.length);

      const steps = [];
      for (let step = 0; step < mx_length; step++) {
        //Verificar que el paso exista en los dos escenarios
        if (stepsv1[step] === undefined || stepsv2[step] === undefined) {
          continue;
        }
        //Comparar imagenes
        const stepPathv1 = `${sourceDirsOutput[0] + versions[0]}/${features[feat]
          }/${scenarios[scenario]}/${stepsv1[step]}`;
        const stepPathv2 = `${sourceDirsOutput[1] + versions[1]}/${features[feat]
          }/${scenarios[scenario]}/${stepsv2[step]}`;
        const data = await compareImages(
          fs.readFileSync(stepPathv1),
          fs.readFileSync(stepPathv2)
        );
        //Guardar imagen
        const compareResultImg = stepsv1[step]
          .split(".")
          .slice(0, -1)
          .join(".");
        const reportImgPath = `./results_full_flow/${features[feat]}-${scenarios[scenario]}-${compareResultImg}.png`;
        fs.writeFileSync(reportImgPath, data.getBuffer());
        //Generar reporte
        const info = {
          feature: features[feat],
          scenario: scenarios[scenario],
          step: compareResultImg,
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
          stepPathv1: "../" + stepPathv1,
          stepPathv2: "../" + stepPathv2,
          diffPath: `${features[feat]}-${scenarios[scenario]}-${compareResultImg}.png`,
        };
        //Metricas
        contador++;
        averageDiff += data.rawMisMatchPercentage;
        totalAnalysisTime += data.analysisTime;
        if (data.misMatchPercentage < 10) {
          lessThan10++;
        } else if (data.misMatchPercentage < 30) {
          lessThan30++;
        } else if (data.misMatchPercentage < 50) {
          lessThan50++;
        } else if (data.misMatchPercentage < 70) {
          lessThan70++;
        } else if (data.misMatchPercentage < 90) {
          lessThan90++;
        } else {
          highThan90++;
        }

        steps.push({
          id: step + 1,
          sameDimensions: data.isSameDimensions,
          difference: data.misMatchPercentage,
          originalImage: "../" + stepPathv1,
          newImage: "../" + stepPathv2,
          diffImage: "../results_full_flow/" + `${features[feat]}-${scenarios[scenario]}-${compareResultImg}.png`,
        });
      }

      results["report"].push({
        scenarioId: scenarios[scenario],
        title: features[feat],
        steps
      });

      comparisonsMade++;
      const progressPercentage = Math.floor((comparisonsMade) / totalComparisons * 100);
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Progress: ${drawProgressBar(progressPercentage)}`);
    }
  }
  process.stdout.write("\n");
  const totalAvgDiff = averageDiff / contador;

  results = {
    ...results,
    totalComparisons: contador,
    averageDifference: totalAvgDiff,
    executionTime: totalAnalysisTime,
    differences: {
      10: lessThan10,
      30: lessThan30,
      50: lessThan50,
      70: lessThan70,
      90: lessThan90,
      100: highThan90,
    },
    vrtType: "version",
    originalTitle: versions[0],
    newTitle: versions[1],
  }
  fs.writeFileSync("./results_full_flow/results.json", JSON.stringify(results, null, 2));
  console.log("HTML report generated sucessfully");
}

main();
