

const { ipcRenderer } = require('electron');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  // envio de datos
  ipcRenderer.send('login-attempt', { correo, password });
});

// error 
ipcRenderer.on('login-error', (event, message) => {
  errorMessage.style.display = 'flex';
});