# CREAFIT
Sistema gestor de suplementos alimenticios

CreaFit es una aplicación de escritorio desarrollada con Electron.js y Node.js, utilizando MySQL para la gestión de inventarios y ventas en tiendas de suplementos.


index.js: Es el proceso principal (Main Process) de Electron. Se encarga de crear la ventana de la aplicación, gestionar la navegación entre pantallas y procesar la comunicación con la base de datos a través de eventos IPC.

database.js: Módulo de configuración para la conexión con MySQL. Contiene los parámetros del servidor (host, usuario, contraseña) y exporta la función para realizar consultas SQL desde el proceso principal.

package.json: El "archivo de identidad" del proyecto. Aquí se listan las dependencias (como electron y promise-mysql) y los comandos para ejecutar la aplicación.

render.js: Script encargado de la interactividad en la pantalla de Login. Captura los datos del formulario y los envía al proceso principal para su validación.

dashboard.js: Controlador de la interfaz para las pantallas internas. Gestiona la persistencia de datos (como el nombre y rol del usuario) mediante localStorage y maneja eventos globales como el cierre de sesión.

authController.js: (Opcional/Módulo) Archivo diseñado para centralizar la lógica de autenticación y permisos de usuario, separando las consultas de seguridad del archivo principal.

index.html: La puerta de entrada; interfaz del Login.

indexmanager.html: Panel de control principal para el Administrador.

sales-details.html: Interfaz dedicada al registro y visualización de ventas (Vendedor).

consultate-product.html: Módulo para la búsqueda y consulta de stock de productos.

Preturns.html y Treturns.html: Pantallas para la gestión de devoluciones (posiblemente para productos o transacciones específicas).

Cada archivo .css corresponde a una vista específica (ej. indexmanager.css), asegurando que la barra lateral y los formularios de CreaFit tengan un diseño limpio, moderno y responsivo.

images/: Carpeta que contiene los activos visuales, como el logo CF.png. entre otros

node_modules/: Carpeta generada automáticamente que contiene todas las librerías necesarias para que Electron funcione.