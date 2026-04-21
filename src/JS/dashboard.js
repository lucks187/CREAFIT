const { ipcRenderer } = require('electron');

// Escuchamos los datos que envía el proceso principal
ipcRenderer.on('datos-usuario', (event, info) => {
    // 1. Guardamos en la memoria local para siempre
    localStorage.setItem('nombreUsuario', info.nombre);
    localStorage.setItem('rolUsuario', info.rol);

    // 2. Los ponemos en la pantalla actual
    actualizarBarraLateral();
});
// Creamos una función que se pueda llamar en cualquier momento
function actualizarBarraLateral() {
    const nombre = localStorage.getItem('nombreUsuario');
    const rol = localStorage.getItem('rolUsuario');

    if (nombre && rol) {
        document.getElementById('nombre-trabajador').innerText = nombre;
        document.getElementById('puesto-trabajador').innerText = rol;
    }
}

// 3. ¡ESTA ES LA CLAVE! 
// Ejecutamos la función apenas cargue CUALQUIER pestaña que tenga este script
actualizarBarraLateral();

//// falta la funcion para borrar lo que hay en el boton de cerrar sesion
const btnSalir = document.getElementById('btn-exit');

if (btnSalir) {
    btnSalir.addEventListener('click', () => {
        // 1. Borramos los datos del usuario para que nadie más los vea
        localStorage.clear();

        // 2. Avisamos al proceso principal (index.js) que queremos volver al login
        ipcRenderer.send('logout');
    });
}