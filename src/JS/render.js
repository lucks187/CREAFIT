

const { ipcRenderer } = require('electron');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  // Enviamos los datos al proceso principal (index.js)
  ipcRenderer.send('login-attempt', { correo, password });
});

// Escuchar si el proceso principal nos dice que hubo un error
ipcRenderer.on('login-error', (event, message) => {
  errorMessage.style.display = 'flex';
});