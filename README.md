# Guía de despliegue: Base de datos, Backend y Frontend
Esta guía proporciona instrucciones paso a paso sobre cómo desplegar la base de datos, el backend y el frontend de la aplicación SGClinica. Asegúrese de tener instalados los siguientes requisitos previos antes de comenzar:

- MySQL
- Visual Studio Code (VS Code)
- Extension Pack for Java (extensión de VS Code)
- Java JDK
- Node.js
- React
## Paso 1: Configuración de la base de datos
1. Descargue el archivo del backend y la base de datos desde el siguiente enlace: https://github.com/Yimar22/backend-SGClinica.
2. Abra MySQL, ya sea utilizando XAMPP o instalando la versión más reciente de MySQL Community Edition.
3. Configure una conexión en MySQL Workbench utilizando las siguientes credenciales:
- Usuario: development
- Contraseña: development
4. Cree un nuevo esquema llamado "emt".
5. Dentro del esquema "emt", cree un archivo de script SQL y coloque el siguiente comando en la primera línea: USE emt.
6. A continuación, copie el contenido de los scripts de la carpeta "emt-core-database" en el archivo de script SQL recién creado.
7. Ejecute el script SQL para crear las tablas y poblar la base de datos.
## Paso 2: Configuración del backend
1. Abra el proyecto del backend en Visual Studio Code.
2. Asegúrese de tener instalada la extensión "Extension Pack for Java".
3. Navegue hasta el archivo "EmtApplication.java".
4. Ejecute el método correspondiente al inicio de la aplicación (puede hacerlo haciendo clic en el icono "Run" en el margen izquierdo del método).
Con estos pasos, el backend de la aplicación debería estar en funcionamiento.

## Paso 3: Configuración del frontend
1. Descargue el archivo del frontend desde el siguiente enlace: https://github.com/Yimar22/frontend-SGClinica.

2. Abra el proyecto del frontend en una nueva ventana de Visual Studio Code.

3. Abra una terminal en VS Code.

4. Ejecute el siguiente comando en la terminal para instalar las dependencias del proyecto:
```
npm install
```

5. Después de que se completen las instalaciones, ejecute el script correspondiente según sus necesidades:

- Para ejecutar los tests:
```
npm run test
```
- Para ejecutar la aplicación de modo estándar:
```
npm start
```

Con esto, el frontend de la aplicación debería estar en funcionamiento y podrá acceder a ella a través de su navegador web en la dirección proporcionada por el comando npm start.

¡Enhorabuena! Ha desplegado correctamente la base de datos, el backend y el frontend de la aplicación SGClinica.
