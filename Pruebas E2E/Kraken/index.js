const fs = require('fs-extra');
const { spawn } = require('child_process');
const path = require('path');

// Lista de directorios base
const sourceDirs = [
  path.join(__dirname, './features/web/e2e/create_page'),
];
const destDir = path.join(__dirname, './features/');
const reportFilePath = path.join(__dirname, 'test_report.txt');
const logFilePath = path.join(__dirname, 'execution_log.txt');

// Función para mover un archivo
async function moveFile(file, fromDir, toDir) {
  const sourceFile = path.join(fromDir, file);
  const destFile = path.join(toDir, file);
  try {
    await fs.move(sourceFile, destFile, { overwrite: true }); // Mueve el archivo
    console.log(`Archivo movido con éxito: ${file}`);
    return destFile;
  } catch (err) {
    console.error(`Error moviendo el archivo ${file}:`, err);
    throw err;
  }
}

// Función para ejecutar el script
function runScript(filePath) {
  return new Promise((resolve, reject) => {
    const process = spawn('npx', ['kraken-node', 'run'], { shell: true });

    let output = '';

    process.stdout.on('data', (data) => {
      output += data.toString();
    });

    process.stderr.on('data', (data) => {
      output += data.toString();
    });

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(output));
        return;
      }
      resolve(output);
    });

    process.on('error', (err) => {
      console.error(`Error ejecutando el script para ${filePath}: ${err.message}`);
      reject(err);
    });
  });
}

// Función para filtrar la salida relevante
function filterOutput(output) {
  const successPattern = /(\d+ scenario[s]? \(\d+ passed\)[\s\S]*?executing steps: \d+m\d+\.\d+s)/g;
  const failurePattern = /(\d+ scenario[s]? \(\d+ failed\)[\s\S]*?executing steps: \d+m\d+\.\d+s\))/g;
  const detailedFailurePattern = /(Failures:\s*1\).*?√ After)/gs;

  const successMatches = output.match(successPattern);
  const failureMatches = output.match(failurePattern);
  const detailedFailureMatches = output.match(detailedFailurePattern);

  const successResults = successMatches ? successMatches.join('\n\n') : '';
  const failureResults = failureMatches ? failureMatches.join('\n\n') : '';
  const detailedFailureResults = detailedFailureMatches ? detailedFailureMatches.join('\n\n') : '';

  let result = '';
  if (successResults) {
    result += `Successful tests:\n${successResults}\n\n`;
  }
  if (failureResults) {
    result += `Failed tests:\n${failureResults}\n\n`;
  }
  if (detailedFailureResults) {
    result += `Detailed failure steps:\n${detailedFailureResults}`;
  }

  return result.trim() || 'No se encontraron resultados relevantes';
}



const targetDirectory = path.join(__dirname, 'backstop_data/bitmaps_reference');

// Asegúrate de que el directorio objetivo existe
if (!fs.existsSync(targetDirectory)) {
  fs.mkdirSync(targetDirectory, { recursive: true });
}

// Función principal
async function main() {
  const report = [];
  const log = [];
  try {
    for (const sourceDir of sourceDirs) {
      report.push(`\n=== Analizando la carpeta: ${sourceDir} ===\n`);
      log.push(`\n=== Analizando la carpeta: ${sourceDir} ===\n`);

      const files = await fs.readdir(sourceDir); // Lee los archivos en la carpeta de origen
      const sortedFiles = files.sort(); // Ordena los archivos alfabéticamente

      for (const file of sortedFiles) {
        console.log(`Ejecutando pruebas del archivo: ${file} en el directorio: ${sourceDir}`);
        log.push(`=== Ejecutando pruebas del archivo: ${file} en el directorio: ${sourceDir} ===`);

        // Mover cualquier archivo .feature de vuelta a la carpeta de origen antes de mover el nuevo archivo
        const existingFiles = await fs.readdir(destDir);
        for (const existingFile of existingFiles) {
          if (path.extname(existingFile) === '.feature') {
            await moveFile(existingFile, destDir, sourceDir);
            console.log(`Archivo existente retornado a su ubicación original: ${existingFile}`);
            log.push(`Archivo existente retornado a su ubicación original: ${existingFile}`);
          }
        }

        const destFilePath = await moveFile(file, sourceDir, destDir); // Mueve el archivo a la carpeta de destino

        try {
          const result = await runScript(destFilePath); // Ejecuta el script por cada archivo movido
          log.push(`Resultado de ejecución para ${file}:\n${result}`);
          const filteredResult = filterOutput(result);
          console.log(`Pruebas exitosas para: ${file}`);
          log.push(`Pruebas exitosas para: ${file}`);
          report.push(`Pruebas exitosas para: ${file}\n${filteredResult}`);
        } catch (err) {
          const filteredError = filterOutput(err.message);
          console.error(`Fallaron las pruebas para: ${file}`);
          log.push(`Fallaron las pruebas para: ${file}\n${err.message}`);
          report.push(`Fallaron las pruebas para: ${file}\n${filteredError}`);
        } finally {
          await moveFile(file, destDir, sourceDir); // Mueve el archivo de vuelta a la carpeta de origen
          console.log(`Archivo retornado a su ubicación original: ${file}`);
          log.push(`Archivo retornado a su ubicación original: ${file}`);
        }

        log.push(`=== Fin de pruebas para el archivo: ${file} en el directorio: ${sourceDir} ===\n`);
      }

      report.push(`\n=== Fin del análisis de la carpeta: ${sourceDir} ===\n`);
      log.push(`\n=== Fin del análisis de la carpeta: ${sourceDir} ===\n`);
    }
  } catch (err) {
    console.error('Error en el proceso:', err);
    log.push(`Error en el proceso: ${err}`);
  } finally {
    // Escribir el reporte en un archivo de texto
    await fs.writeFile(reportFilePath, report.join('\n\n'), 'utf8');
    console.log(`Reporte final guardado en: ${reportFilePath}`);
    log.push(`Reporte final guardado en: ${reportFilePath}`);
    
    // Escribir el log completo en un archivo de texto
    await fs.writeFile(logFilePath, log.join('\n\n'), 'utf8');
    console.log(`Log de ejecución guardado en: ${logFilePath}`);
  }
}

main();
