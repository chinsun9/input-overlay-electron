const { app, BrowserWindow } = require('electron');
const path = require('path');
const ioHook = require('iohook');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
    frame: false,
    transparent: true,
  });

  mainWindow.setAlwaysOnTop(true, 'screen');
  mainWindow.setIgnoreMouseEvents(true);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  ioHook.on('keydown', (event) => {
    // console.info(event.keycode);
    mainWindow.webContents.send('keydown', event.rawcode);
  });

  ioHook.on('keyup', (event) => {
    // console.info(event.keycode);
    mainWindow.webContents.send('keyup', event.rawcode);
  });

  ioHook.start();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
