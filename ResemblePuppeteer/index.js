const compareImages = require("resemblejs/compareImages");
const fs = require("fs");

async function executeTest() {
  //Reporte
  let html = "";
  //Metricas
  let contador = 0;
  let highThan70 = 0;
  let highThan90 = 0;
  let highThan100 = 0;
  let lessThan50 = 0;
  let lessThan30 = 0;
  let lessThan10 = 0;

  let datetime = new Date().toISOString().replace(/:/g, ".");
  if (!fs.existsSync(`./results`)) {
    fs.mkdirSync(`./results`, { recursive: true });
  }

  //Lista
  const versions = ["v4.5", "v5.96"];

  const features = fs.readdirSync(`./screenshots/${versions[0]}`);
  for (let feat = 0; feat < features.length; feat++) {
    const featurePathv1 = `./screenshots/${versions[0]}/${features[feat]}`;
    const featurePathv2 = `./screenshots/${versions[1]}/${features[feat]}`;
    //Revisar que existan las carpetas
    if (!fs.existsSync(featurePathv1) || !fs.existsSync(featurePathv2)) {
      console.log("Directory not found " + features[feat]);
      continue;
    }
    //Revisar que existan escenarios
    const scenarios = fs.readdirSync(featurePathv1);
    for (let scenario = 0; scenario < scenarios.length; scenario++) {
      const escenarioPathv1 = `./screenshots/${versions[0]}/${features[feat]}/${scenarios[scenario]}`;
      const escenarioPathv2 = `./screenshots/${versions[1]}/${features[feat]}/${scenarios[scenario]}`;
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
      for (let step = 0; step < mx_length; step++) {
        //Verificar que el paso exista en los dos escenarios
        if (stepsv1[step] === undefined || stepsv2[step] === undefined) {
          continue;
        }
        //Comparar imagenes
        const stepPathv1 = `./screenshots/${versions[0]}/${features[feat]}/${scenarios[scenario]}/${stepsv1[step]}`;
        const stepPathv2 = `./screenshots/${versions[1]}/${features[feat]}/${scenarios[scenario]}/${stepsv2[step]}`;
        const data = await compareImages(
          fs.readFileSync(stepPathv1),
          fs.readFileSync(stepPathv2)
        );
        //Guardar imagen
        const compareResultImg = stepsv1[step]
          .split(".")
          .slice(0, -1)
          .join(".");
        const reportImgPath = `./results/${features[feat]}-${scenarios[scenario]}-${compareResultImg}.png`;
        fs.writeFileSync(reportImgPath, data.getBuffer());
        //Generar reporte
        const info = {
          feature: features[feat],
          escenario: scenarios[scenario],
          step: compareResultImg,
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime,
          stepPathv1: stepPathv1,
          stepPathv2: stepPathv2,
          diffPath: `${features[feat]}-${scenarios[scenario]}-${compareResultImg}.png`,
        };
        //Metricas
        contador++;
        if (data.misMatchPercentage < 10) {
          lessThan10++;
        } else if (data.misMatchPercentage < 30) {
          lessThan30++;
        } else if (data.misMatchPercentage < 50) {
          lessThan50++;
        } else if (data.misMatchPercentage < 70) {
          highThan70++;
        } else if (data.misMatchPercentage < 90) {
          highThan90++;
        } else {
          highThan100++;
        }

        console.log(info);
      }
    }
  }
  console.log("Less 10%: " + lessThan10);
  console.log("Less 30%: " + lessThan30);
  console.log("Less 50%: " + lessThan50);
  console.log("Less 70%: " + highThan70);
  console.log("Less 90%: " + highThan90);
  console.log("High 90%: " + highThan100);
}

(async () => await executeTest())();
