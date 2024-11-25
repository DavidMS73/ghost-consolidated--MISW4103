# E2E Puppeteer - Cucumber
## ‼️Disclaimer‼️
Dado que encontramos algunos casos donde el resultado esperado no concordaba con el actual, **estas pruebas deberían fallar**. En la siguiente lista se mencionan estos escenarios con la justificación de porqué fallaron:

**Escenarios Fallidos:**
- **EU10 y EU11:** El máximo del campo de slug es 191 caracteres, sin embargo, al guardar los cambios sólo se guardan 185. Este valor debería ser 191 ya que para el campo de nombre no sucede esto.
- **EU18:** Se espera que en este campo se ponga algo similar a una ciudad o país, por lo que los caracteres especiales no deberían aparecer. Adicionalmente, debería sólo permitir lugares que existen.

## Prerequisitos
- Tener Node instalado

**Para las pruebas se recomienda usar Node v22.11.0 dado que esta versión fue la utilizada en el desarrollo.**

## Instalar Dependencias
Antes de correr las pruebas, se deben instalar las dependencias. Para esto, utilizar el siguiente comando (debe estar dentro de [DataValidation/Puppeteer-Cucumber](https://github.com/DavidMS73/ghost-consolidated-MISW4103/tree/main/DataValidation/Puppeteer-Cucumber)):
```bash
npm install
```

## Preparación del Ambiente
Sigue estas instrucciones antes de correr las pruebas para asegurar que se ejecuten de la manera correcta.
1. Crear un usuario admin en Ghost
2. En el archivo [properties.js](./properties.js) cambiar el valor de `BASE_URL` por la URL donde tienes ejecutando el proyecto.
3. En el archivo [properties.js](./properties.js) cambiar los valores de `EMAIL` y `PASSWORD` por los de tu usuario.
4. Borra todo el contenido previo entrando a Ajustes > Danger Zone > Delete All Content
5. Borra todos los usuarios que tengas creados para evitar problemas en ejecución entrando a Members > seleccionar el miembro > dar en la rueda de configuración al lado del botón Save > Delete member.

## Ejecución
Para ejecutar las pruebas ejecute el siguiente comando (debe estar dentro de [DataValidation/Puppeteer-Cucumber](https://github.com/DavidMS73/ghost-consolidated-MISW4103/tree/main/DataValidation/Puppeteer-Cucumber)):
```bash
npx cucumber-js
```

## Resultados
Al finalizar las pruebas, los resultados se guardarán en la carpeta `output`. Aquí podrá ver las capturas hechas durante las pruebas
