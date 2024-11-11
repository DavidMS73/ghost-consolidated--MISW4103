# E2E Kraken
## Prerequisitos
- Tener instalados las herramientas de Android
- Tener instalado appium
- Tener Node instalado

**Para las pruebas se recomienda usar Node v22.11.2 dado que esta versión fue la utilizada en el desarrollo.**

## Instalar Dependencias
Antes de correr las pruebas, se deben instalar las dependencias. Para esto, utilizar el siguiente comando (debe estar dentro de [PruebasE2E/Kraken](../../Pruebas%20E2E/Kraken/)):
```bash
npm install
```

## Preparación del Ambiente
Sigue estas instrucciones antes de correr las pruebas para asegurar que se ejecuten de la manera correcta.
1. Crear un usuario admin en Ghost
2. En el archivo [properties.json](./properties.json) cambiar los valores de `EMAIL` y `PASSWORD` por los de tu usario.
3. Borra todo el contenido previo entrando a Ajustes > Danger Zone > Delete All Content

## Ejecución
Para ejecutar las pruebas ejecute el siguiente comando (debe estar dentro de [PruebasE2E/Kraken](../../Pruebas%20E2E/Kraken/)):
```bash
npm run tests
```

## Resultados
Al finalizar las pruebas, se genarán 2 archivos txt:
- `execution_log.txt` contiene el log de las pruebas ejecutadas
- `test_report.txt` contiene el reporte de cada prueba ejecutada

Adicional a esto, se creará una nueva carpeta `reports` donde se guardarán las capturas de cada paso de las pruebas. Para visualizar estos resultados pueden ejecutar el html dentro de cada carpeta.

## Troubleshooting
### adb: command not found
En caso de obtener este error al correr los tests:
```log
Error: Command failed: adb devices -l
/bin/sh: adb: command not found
```
Es necesario instalar las herramientas de Android.

#### Mac:
```bash
brew install android-platform-tools
```
#### Windows:

Descargar herramientas de este link: https://developer.android.com/tools/releases/platform-tools?hl=es-419.