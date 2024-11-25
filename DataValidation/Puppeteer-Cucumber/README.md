# E2E Puppeteer - Cucumber
## ‼️Disclaimer‼️
Dado que encontramos algunos casos donde el resultado esperado no concordaba con el actual, **estas pruebas deberían fallar**. En la siguiente lista se mencionan estos escenarios con la justificación de por qué fallaron:

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

>‼️Disclaimer 2‼️
>
> Para mayor información remitirse a [wiki - Caso pseudo-aleatorio dinámico](https://github.com/DavidMS73/ghost-consolidated-MISW4103/wiki/Descripci%C3%B3n-estrategias-Semana-7#caso-pseudo-aleatorio-din%C3%A1mico)
>
> Mockaroo presenta un límite de 200 llamados a la API en su forma gratuita, al dejarlo en el Before por los 120 escenarios se estaría llamando 480 veces Mockaroo generando que no se obtenga la información y por lo tanto, evitando que se pueda probar todos los tests satisfactoriamente. Para esto, habilitamos 2 opciones en el `properties.js`. La primera de ellas es `USE_API`, ponerla en `false` indicaría que no se llame Mockaroo sino que se cargue la información de un archivo llamado `pseudo_aleatorio.json` que tiene información descargada de una de las peticiones a Mockaroo (es muy claro en el equipo que tomarlo de este archivo sería a-priori sin embargo intentamos brindar el mayor número de herramientas posibles para que todos los escenarios se ejecuten). La segunda es `LOAD_PSEUDO_RANDOM_BEFORE_ALL`, el cual ponerla en `true` ejecuta la carga de datos desde Mockaroo una única vez al inicio de la ejecución de los test (`BeforeAll`), y no en el `Before` (antes de cada test), esto para que únicamente se hagan 4 llamados a la API cada vez que se corran todos los tests.

## Ejecución
Para entender el funcionamiento remitirse a [wiki - aclaración del funcionamiento](https://github.com/DavidMS73/ghost-consolidated-MISW4103/wiki/Descripci%C3%B3n-estrategias-Semana-7#aclaraci%C3%B3n-del-funcionamiento)

Para ejecutar las pruebas ejecute el siguiente comando (debe estar dentro de [DataValidation/Puppeteer-Cucumber](https://github.com/DavidMS73/ghost-consolidated-MISW4103/tree/main/DataValidation/Puppeteer-Cucumber)):
```bash
npx cucumber-js
```

Tenemos diferentes features creadas, las cuales corresponden a:

1. posts 
2. pages 
3. edit-users 
4. posts-views 
5. tags 
6. members

Cada una de estas features es posible correrlas de forma independiente con los siguientes comandos:
1. posts -> `npx cucumber-js --tags=@posts`
2. pages -> `npx cucumber-js --tags=@pages`
3. edit-users -> `npx cucumber-js --tags=@edit-users`
4. posts-views -> `npx cucumber-js  --tags=@posts-views`
5. tags -> `npx cucumber-js --tags=@tags`
6. members-> `npx cucumber-js --tags=@members`

## Resultados
Al finalizar las pruebas, los resultados se guardarán en la carpeta `output`. Aquí podrá ver las capturas hechas durante las pruebas
