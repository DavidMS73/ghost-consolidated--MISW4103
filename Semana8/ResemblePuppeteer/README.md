# VRT - ResembleJS with Puppeteer
## Prerequisitos
- Tener Node instalado

**Para las pruebas se recomienda usar Node v18.20.4 dado que esta versión fue la utilizada en el desarrollo.**

## Instalar Dependencias
Antes de correr las pruebas, se deben instalar las dependencias. Para esto, utilizar el siguiente comando (debe estar dentro de [ResemblePuppeteer](../ResemblePuppeteer)):
```bash
npm install
```

Instalar Firefox para puppeteer en [Pruebas E2E](../Pruebas%20E2E/):
```bash
npx puppeteer browsers install firefox
```


## Preparación del Ambiente
Sigue estas instrucciones antes de correr las pruebas para asegurar que se ejecuten de la manera correcta.
1. Crear un usuario admin en Ghost
2. En los archivos [properties.js en /Pruebas E2E](../Pruebas%20E2E/Puppeteer-Cucumber/properties.js) cambiar los valores de `EMAIL` y `PASSWORD` por los de tu usuario.
3. Configurar `BASE_URL` para apuntar a Ghost.
4. Correr Ghost
5. Borra todo el contenido previo entrando a Ajustes > Danger Zone > Delete All Content

## Ejecución
Para ejecutar las pruebas ejecute el siguiente comando (debe estar dentro de [ResemblePuppeteer](../ResemblePuppeteer)):

**Mac:**

Ejecutar Resemble con diferentes versiones
```bash
npm run vrt:versions
```
Ejecutar Resemble con diferentes browsers
```bash
npm run vrt:browsers
```

**Windows:**

Ejecutar Resemble con diferentes versiones
```bash
npm run vrt:versions:win
```
Ejecutar Resemble con diferentes browsers
```bash
npm run vrt:browsers:win
```

## Resultados
Al finalizar las pruebas, se genará una carpeta `results_full_flow`. En esta carpeta encontrará las imágenes de todas las comparaciones y un json en el que podrá ver los resultados de esas comparaciones.

Para poder ver el reporte visual siga los siguientes pasos:
1. Abrir una consola en [ResemblePuppeteer](./)
2. Instalar `http-server`
```bash
npm install http-server -g
```
3. Ejecutar `http-server`
```bash
http-server
```
4. Abrir navegador e ir a la ruta [http://127.0.0.1:8080/report](http://127.0.0.1:8080/report)

En este reporte podrá ver un resumen de la ejecución y el detalle de las diferencias encontradas entre las distintas versiones.

> Por defecto hemos incluído ya el reporte generado para la semana 8 en la carpeta report, por lo que es posible consultarlo sin tener que ejecutar todas las pruebas. Tenga en cuenta que debe ejecutar http-server para verlo correctamente
