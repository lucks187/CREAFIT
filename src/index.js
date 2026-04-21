const { app, BrowserWindow, ipcMain } = require('electron');
const { getConnection } = require('./database');
const path = require('path');

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    // Corregido: sin el ../
    icon: path.join(__dirname, 'images/CF.png'), 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('src/HTML/index.html');
}

// QUITAMOS EL REQUIRE DE CONTROLLERS QUE DABA ERROR

ipcMain.on('login-attempt', async (event, datos) => {
  try {
    const conn = await getConnection();
    const sql = 'SELECT nombre, rol FROM Usuario WHERE correo = ? AND contraseña = ?';
    const results = await conn.query(sql, [datos.correo, datos.password]);

    if (results.length > 0) {
      const usuarioEncontrado = results[0];
      const rol = results[0].rol;
      // Corregido: rutas directas desde la raíz del proyecto
      if (rol === 'administrador') {
          win.loadFile('src/HTML/indexmanager.html');
      } else if (rol === 'vendedor') {
          win.loadFile('src/HTML/sales-details.html');
      } else if (rol === 'almacenista') {
          win.loadFile('src/HTML/consultate-product.html');
      }
      win.webContents.once('did-finish-load', () => {
        win.webContents.send('datos-usuario', {
          nombre: usuarioEncontrado.nombre,
          rol: usuarioEncontrado.rol
        });
      });
    } else {
      // Este es el mensaje que recibe tu render.js para mostrar el alert
      event.reply('login-error', 'Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.log("Error en la consulta:", error);
  }
  // aqui van otras cosas
  
});

ipcMain.on('logout', () => {
    // Regresamos a la pantalla de login
    win.loadFile('src/HTML/index.html');
    
    // Opcional: Redimensionar la ventana si el login es más pequeño
    win.setSize(800, 600);
    win.center();
});

app.whenReady().then(() => {
  createWindow();
});

/*

//Escuchar el evento de login desde la vista
ipcMain.on('login-attempt', async (event, datos) => {
  try {
    const conn = await getConnection();
    const sql = 'SELECT rol FROM Usuario WHERE correo = ? AND contraseña = ?';
    const results = await conn.query(sql, [datos.correo, datos.password]);

    if (results.length > 0) {
      const rol = results[0].rol;
      // Aquí decides a dónde mandarlo
      if (rol === 'administrador') win.loadFile('src/HTML/indexmanager.html');
      else if (rol === 'vendedor') win.loadFile('src/HTML/sales-details.html');
      else if (rol === 'almacenista') win.loadFile('src/HTML/consultate-product.html');
    } else {
      // Si no existe, avisamos a la vista para mostrar el error
      event.reply('login-error', 'Usuario no encontrado');
    }
  } catch (error) {
    console.log(error);
  }
});
*/