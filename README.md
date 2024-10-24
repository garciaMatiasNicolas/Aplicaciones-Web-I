# Proyecto Aplicaciones WEB I

Este documento detalla cómo levantar el proyecto en un servidor local para la correcta visualización de la fake database fetcheada en el archivo `db.json`.

## Formas de levantar nuestro proyecto

1. [Usar extensiones de VS Code: Live Server](#usar-extensiones-de-vs-code-live-server)
2. [Usar un servidor HTTP sencillo con Python](#usar-un-servidor-http-sencillo-con-python)
3. [Usar live-server (Node.js)](#usar-live-server-nodejs)

---

## Usar extensiones de VS Code: Live Server

Si tenes instalado Visual Studio Code, puedes usar la extensión "Live Server" para correr un servidor local directamente desde el editor.

### Pasos:

1. Abre el proyecto en [Visual Studio Code](https://code.visualstudio.com/).
2. Instala la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) desde el Marketplace de VS Code.
3. Haz clic derecho en el archivo `index.html` y selecciona **"Open with Live Server"**.
4. El proyecto se abrirá automáticamente en el navegador y se recargará cada vez que realices cambios.

---

## Usar un servidor HTTP sencillo con Python

Si tenes Python instalado, se puede usar el servidor HTTP integrado para servir archivos estáticos en tu directorio de proyecto.

### Pasos:

1. Abre una terminal o línea de comandos en la carpeta raíz de tu proyecto.
2. Ejecuta el siguiente comando:

   - **Para Python 3.x**:
     ```bash
     python -m http.server 8000
     ```
   
   - **Para Python 2.x**:
     ```bash
     python -m SimpleHTTPServer 8000
     ```

3. El servidor estará disponible en `http://localhost:8000`, donde podrás ver el proyecto en el navegador.

---

## Usar live-server (Node.js)

`live-server` es una herramienta ligera basada en Node.js que no solo sirve archivos HTML, sino que también proporciona recarga automática del navegador cuando detecta cambios en los archivos.

### Pasos:

1. Instala [Node.js](https://nodejs.org/).
2. Abre una terminal y ejecuta el siguiente comando para instalar `live-server` globalmente:
   ```bash
   npm install -g live-server
   ````
3. Navega a la carpeta de tu proyecto y ejecuta:
    ```bash
    live-server
    ````

Esto abrirá tu proyecto automáticamente en el navegador y recargará la página cada vez que realices cambios.
