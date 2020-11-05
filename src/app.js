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
    switch (data) {
      case 9:
        return keydown('tab');
      case 32:
        return keydown('space');
      case 160:
        return keydown('shift');
      case 162:
        return keydown('ctrl');
      default:
        break;
    }

    const key = String.fromCharCode(data);
    keydown(key);
  });

  ipcRenderer.on('keyup', (event, data) => {
    switch (data) {
      case 9:
        return keyup('tab');
      case 32:
        return keyup('space');
      case 160:
        return keyup('shift');
      case 162:
        return keyup('ctrl');
      default:
        break;
    }

    const key = String.fromCharCode(data);
    keyup(key);
  });

  ipcRenderer.on('mousedown', (event, data) => {
    // 1: lm, 2; rm
    console.log(data);
    switch (data) {
      case 1:
        return keydown('leftmousebutton');
      case 2:
        return keydown('rightmousebutton');
      default:
        break;
    }
  });
  ipcRenderer.on('mouseup', (event, data) => {
    // 1: lm, 2; rm
    switch (data) {
      case 1:
        return keyup('leftmousebutton');
      case 2:
        return keyup('rightmousebutton');
      default:
        break;
    }
  });
}

run();
