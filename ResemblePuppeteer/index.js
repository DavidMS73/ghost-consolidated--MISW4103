const compareImages = require("resemblejs/compareImages");
const fs = require("fs");

async function executeTest() {
  //Reporte
  let html = "";
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

        html += cardScenario(info);
      }
    }
  }
  const totalAvgDiff = averageDiff / contador;
  const consolitatedInfo = {
    lessThan10,
    lessThan30,
    lessThan50,
    lessThan70,
    lessThan90,
    highThan90,
    contador,
    totalAnalysisTime,
    totalAvgDiff,
  };
  const report = baseReport(consolitatedInfo, html);
  fs.writeFileSync(`./results/report.html`, report);
  console.log("HTML report generated sucessfully");
}

(async () => await executeTest())();

function cardScenario(info) {
  return `
  <div class="card">
    <h5 class="card-header">${info.scenario} - ${info.feature} - ${info.step}</h5>
    <div class="card-body">
      <p class="card-text">
        Same dimensions: ${info.isSameDimensions}
      </p>
      <p class="card-text">
        Mismatch percentage: ${info.misMatchPercentage}
      </p>
      <div style="display: flex;justify-content: space-between;">
          <div style="flex: 1;text-align: center;">
              <h3>Version 4.5</h3>
              <img id="image1" src="${info.stepPathv1}" alt="Imagen versión 4.5">
          </div>
          <div style="flex: 1;text-align: center;">
              <h3>Version 5.96</h3>
              <img id="image2" src="${info.stepPathv2}" alt="Imagen versión 5.96">
          </div>
          <div style="flex: 1;text-align: center;">
              <h3>Diferencia</h3>
              <img id="diffImage" src="${info.diffPath}" alt="Diferencia">
          </div>
      </div>
    </div>
  </div>
  `;
}

function baseReport(consolitatedInfo, htmlComplete) {
  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Reporte de comparación de imágenes</title>
      <style>
        img {
          max-width: 100%;
          height: auto;
        }
      </style>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
        crossorigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossorigin="anonymous"
      ></script>
    </head>

    <body>
      <div class="container-fluid">
        <h1>Reporte de comparación de imágenes</h1>
        <div class="alert alert-info" role="alert">
          <h2>Datos generales</h2>
        </div>
        <ul class="list-group list-group-horizontal mt-2">
          <li class="list-group-item">Total comparaciones</li>
          <li class="list-group-item">${consolitatedInfo.contador}</li>
        </ul>
        <ul class="list-group list-group-horizontal-sm mt-2">
          <li class="list-group-item">Promedio de diferencia entre versiones</li>
          <li class="list-group-item">${consolitatedInfo.totalAvgDiff}%</li>
        </ul>
        <ul class="list-group list-group-horizontal-sm mt-2">
          <li class="list-group-item">Tiempo total de ejecución</li>
          <li class="list-group-item">
            ${consolitatedInfo.totalAnalysisTime} ms
          </li>
        </ul>
        <h3>Comparaciones agrupadas</h3>
        <div class="row">
          <div class="col-4">
            <ul class="list-group list-group-horizontal">
              <li class="list-group-item">Menos del 10% de diferencia</li>
              <li class="list-group-item">${consolitatedInfo.lessThan10}</li>
            </ul>
          </div>
          <div class="col-4">
            <ul class="list-group list-group-horizontal-sm">
              <li class="list-group-item">Menos del 30% de diferencia</li>
              <li class="list-group-item">${consolitatedInfo.lessThan30}</li>
            </ul>
          </div>
          <div class="col-4">
            <ul class="list-group list-group-horizontal-sm">
              <li class="list-group-item">Menos del 50% de diferencia</li>
              <li class="list-group-item">${consolitatedInfo.lessThan50}</li>
            </ul>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col-4">
            <ul class="list-group list-group-horizontal-sm">
              <li class="list-group-item">Menos del 70% de diferencia</li>
              <li class="list-group-item">${consolitatedInfo.lessThan70}</li>
            </ul>
          </div>
          <div class="col-4">
            <ul class="list-group list-group-horizontal-sm">
              <li class="list-group-item">Menos del 90% de diferencia</li>
              <li class="list-group-item">${consolitatedInfo.lessThan90}</li>
            </ul>
          </div>
          <div class="col-4">
            <ul class="list-group list-group-horizontal-sm">
              <li class="list-group-item">Mayor o igual al 90% de diferencia</li>
              <li class="list-group-item">${consolitatedInfo.highThan90}</li>
            </ul>
          </div>
        </div>
        <div class="alert alert-success mt-2" role="alert">
          <h2>Reporte por escenario y paso</h2>
        </div>
        ${htmlComplete}
      </div>
    </body>
  </html>
  `;
  return html;
}
