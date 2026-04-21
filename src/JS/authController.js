const { getConnection } = require('../../database');

async function login(datos, win, event) {
    try {
        const conn = await getConnection();
        const sql = 'SELECT nombre, rol, posicion FROM Usuario WHERE correo = ? AND contraseña = ?';
        const results = await conn.query(sql, [datos.correo, datos.password]);

        if (results.length > 0) {
            const usuario = results[0];
            // Redirección según rol
            if (usuario.rol === 'administrador') win.loadFile('src/HTML/indexmanager.html');
            else if (usuario.rol === 'vendedor') win.loadFile('src/HTML/sales-details.html');
        } else {
            event.reply('login-error', 'Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error("Error en SQL:", error);
    }
}

module.exports = { login };