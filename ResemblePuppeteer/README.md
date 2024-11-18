# VRT - ResembleJS with Puppeteer
## Prerequisitos
- Tener Node instalado

**Para las pruebas se recomienda usar Node v18.20.4 dado que esta versión fue la utilizada en el desarrollo.**

## Instalar Dependencias
Antes de correr las pruebas, se deben instalar las dependencias. Para esto, utilizar el siguiente comando (debe estar dentro de [ResemblePuppeteer](../ResemblePuppeteer)):
```bash
npm install
```

## Preparación del Ambiente
Sigue estas instrucciones antes de correr las pruebas para asegurar que se ejecuten de la manera correcta.
1. Crear un usuario admin en Ghost
2. En los archivos [properties.js en /Pruebas E2E](../Pruebas%20E2E/Puppeteer-Cucumber/properties.js) y [properties.js en /PruebasRV](../PruebasRV/Puppeteer-Cucumber/properties.js) cambiar los valores de `EMAIL` y `PASSWORD` por los de tu usuario.
3. Configurar `BASE_URL` para apuntar a la versión de Ghost esperada.
   1. [properties.js en /Pruebas E2E](../Pruebas%20E2E/Puppeteer-Cucumber/properties.js) debe apuntar a Ghost v5.96
   2. [properties.js en /PruebasRV](../PruebasRV/Puppeteer-Cucumber/properties.js) debe apuntar a Ghost v4.5
4. Borra todo el contenido previo entrando a Ajustes > Danger Zone > Delete All Content

## Ejecución
Para ejecutar las pruebas ejecute el siguiente comando (debe estar dentro de [ResemblePuppeteer](../ResemblePuppeteer)):
**Mac:**
```bash
node ./fullFlow.js
```
**Windows:**
```bash
node .\fullFlow.js
```

## Resultados
Al finalizar las pruebas, se genará una carpeta `results`. En esta carpeta encontrará las imágenes de todas las comparaciones y un html en el que podrá ver un reporte de los resultados.