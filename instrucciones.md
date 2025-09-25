### Reorganización del proyecto

** Todos los archivos estáticos CSS, Javascript, imágenes, y html se encuentran en la carpeta 'public'


server.js --> se encuentra como archivo principal

package.json --> dependencias del proyecto

node_modules --> dependencias instaladas

### Configuración inicial

** Creación del package.json

** Instalación de dependencias --> npm install

** Creación del servidor express en server.js

# Instalación: 
   npm init -y
   npm install express cors
   npm install -D nodemon

# Ejecución:
   npm start
   # o para desarrollo
   npm run dev


# Carpetas que puse en el git ignore para evitar tantos cambios en git
node_modules/
   Contiene todas las dependencias instaladas
   Es muy pesada (puede tener miles de archivos)
   Se puede regenerar con npm install
.env - Variables de entorno
   Contiene información sensible (contraseñas, API keys)
*.log - Archivos de logs
   Se generan automáticamente
   Pueden ser muy grandes
   No aportan valor al código
.vscode/ y .idea/
   Configuraciones del editor
