# E2E Puppeteer - Cucumber
## Prerequisitos
- Tener instalados las herramientas de Android
- Tener instalado appium
- Tener Node instalado

**Para las pruebas se recomienda usar Node v22.11.2 dado que esta versión fue la utilizada en el desarrollo.**

## Instalar Dependencias
Antes de correr las pruebas, se deben instalar las dependencias. Para esto, utilizar el siguiente comando (debe estar dentro de [PruebasE2E/Puppeteer-Cucumber](../../Pruebas%20E2E/Puppeteer-Cucumber/)):
```bash
npm install
```

## Preparación del Ambiente
Sigue estas instrucciones antes de correr las pruebas para asegurar que se ejecuten de la manera correcta.
1. Crear un usuario admin en Ghost
2. En el archivo [properties.js](./properties.js) cambiar los valores de `EMAIL` y `PASSWORD` por los de tu usario.
3. Borra todo el contenido previo entrando a Ajustes > Danger Zone > Delete All Content
4. Borra todos los usuarios que tengas creados para evitar problemas en ejecución entrando a Members > seleccionar el miembro > dar en la rueda de configuración al lado del botón Save > Delete member

## Ejecución
Para ejecutar las pruebas ejecute el siguiente comando (debe estar dentro de [PruebasE2E/Puppeteer-Cucumber](../../Pruebas%20E2E/Puppeteer-Cucumber/)):
```bash
npx cucumber-js
```

## Resultados
Al finalizar las pruebas, los resultados se guardarán en la carpeta `output`. Aquí podrá ver las capturas hechas durante las pruebas
