function keydown(key) {
  const keycap = document.querySelector(`#key-${key}`);
  keycap.className = 'keydown';
}

function keyup(key) {
  const keycap = document.querySelector(`#key-${key}`);
  keycap.className = '';
}

// electron

function run() {
  const electron = require('electron');
  const ipcRenderer = electron.ipcRenderer;

  ipcRenderer.on('keydown', (event, data) => {
    const key = String.fromCharCode(data).toLowerCase();
    keydown(key);
  });

  ipcRenderer.on('keyup', (event, data) => {
    const key = String.fromCharCode(data).toLowerCase();
    keyup(key);
  });
}

run();
