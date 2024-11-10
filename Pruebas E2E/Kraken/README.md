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

