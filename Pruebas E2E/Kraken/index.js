const fs = require("fs-extra");
const { spawn } = require("child_process");
const path = require("path");

// Lista de directorios base
const sourceDirs = [path.join(__dirname, "./features/web/e2e/create_page")];
const destDir = path.join(__dirname, "./features/");
const reportFilePath = path.join(__dirname, "test_report.txt");
const logFilePath = path.join(__dirname, "execution_log.txt");

// Función para mover un archivo
async function moveFile(file, fromDir, toDir) {
  const sourceFile = path.join(fromDir, file);
  const destFile = path.join(toDir, file);
  try {
    await fs.move(sourceFile, destFile, { overwrite: true });
    return destFile;
  } catch (err) {
    throw err;
  }
}

// Función para ejecutar el script
function runScript(filePath) {
  return new Promise((resolve, reject) => {
    const process = spawn("npx", ["kraken-node", "run"], { shell: true });

    let output = "";

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
      console.error(
        `Error executing script for ${filePath}: ${err.message}`
      );
      reject(err);
    });
  });
}

// Función para filtrar la salida relevante
function filterOutput(output) {
  const successPattern =
    /(\d+ scenario[s]? \(\d+ passed\)[\s\S]*?executing steps: \d+m\d+\.\d+s)/g;
  const failurePattern =
    /(\d+ scenario[s]? \(\d+ failed\)[\s\S]*?executing steps: \d+m\d+\.\d+s\))/g;
  const detailedFailurePattern = /(Failures:\s*1\).*?√ After)/gs;

  const successMatches = output.match(successPattern);
  const failureMatches = output.match(failurePattern);
  const detailedFailureMatches = output.match(detailedFailurePattern);

  const successResults = successMatches ? successMatches.join("\n\n") : "";
  const failureResults = failureMatches ? failureMatches.join("\n\n") : "";
  const detailedFailureResults = detailedFailureMatches
    ? detailedFailureMatches.join("\n\n")
    : "";

  let result = "";
  if (successResults) {
    result += `Successful tests:\n${successResults}\n\n`;
  }
  if (failureResults) {
    result += `Failed tests:\n${failureResults}\n\n`;
  }
  if (detailedFailureResults) {
    result += `Detailed failure steps:\n${detailedFailureResults}`;
  }

  return result.trim() || "No se encontraron resultados relevantes";
}

// Función principal
async function main() {
  const report = [];
  const log = [];
  try {
    for (const sourceDir of sourceDirs) {
      const functionalitySplit = sourceDir.split("\\");
      const functionality =
        functionalitySplit[functionalitySplit.length - 2] +
        "/" +
        functionalitySplit[functionalitySplit.length - 1];
      report.push(`\n=== Analyzing folder: ${functionality} ===\n`);
      log.push(`\n=== Analyzing folder: ${functionality} ===\n`);

      const files = await fs.readdir(sourceDir); // Leer archivos de carpeta de origen
      const sortedFiles = files.sort(); // Ordenar los archivos alfabéticamente

      for (const file of sortedFiles) {
        console.log(`Executing tests: ${file} of folder: ${functionality}`);
        log.push(
          `=== Executing tests: ${file} of folder: ${functionality} ===`
        );

        // Mover cualquier .feature de vuelta a la carpeta de origen antes de mover el nuevo archivo
        const existingFiles = await fs.readdir(destDir);
        for (const existingFile of existingFiles) {
          if (path.extname(existingFile) === ".feature") {
            await moveFile(existingFile, destDir, sourceDir);
            console.log(
              `Existing file returned to the original location: ${existingFile}`
            );
            log.push(
              `Existing file returned to the original location: ${existingFile}`
            );
          }
        }

        const destFilePath = await moveFile(file, sourceDir, destDir); // Mueve el archivo a la carpeta de destino

        try {
          const result = await runScript(destFilePath); // Ejecuta el script por cada archivo movido
          log.push(`Execution result for ${file}:\n${result}`);
          const filteredResult = filterOutput(result);
          console.log(`Feature successfully: ${file}`);
          log.push(`Feature successfully: ${file}`);
          report.push(`Feature successfully: ${file}\n${filteredResult}`);
        } catch (err) {
          const filteredError = filterOutput(err.message);
          console.error(`Feature failed: ${file}`);
          log.push(`Feature failed: ${file}\n${err.message}`);
          report.push(`Feature failed: ${file}\n${filteredError}`);
        } finally {
          await moveFile(file, destDir, sourceDir); // Mueve el archivo de vuelta a la carpeta de origen
          console.log(`File returned to the original location: ${file}`);
          log.push(`File returned to the original location: ${file}`);
        }

        log.push(
          `=== Ended tests file: ${file} of folder: ${functionality} ===\n`
        );
      }

      report.push(`\n=== Ended analysis folder: ${functionality} ===\n`);
      log.push(`\n=== Ended analysis folder: ${functionality} ===\n`);
    }
  } catch (err) {
    console.error("Error:", err);
    log.push(`Error: ${err}`);
  } finally {
    // Escribir el reporte en un archivo de texto
    await fs.writeFile(reportFilePath, report.join("\n\n"), "utf8");
    console.log(`Final report stored in: ${reportFilePath}`);
    log.push(`Final report stored in: ${reportFilePath}`);

    // Escribir el log completo en un archivo de texto
    await fs.writeFile(logFilePath, log.join("\n\n"), "utf8");
    console.log(`Log stored in: ${logFilePath}`);
  }
}

main();
