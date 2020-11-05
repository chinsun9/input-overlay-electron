const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const ioHook = require('iohook');
const iohook = require('iohook');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.

  const width = 630;
  const height = 290;
  const margin = 30;

  const {
    width: max_width,
    height: max_height,
  } = screen.getPrimaryDisplay().workAreaSize;

  console.log(max_width);
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      nodeIntegration: true,
    },
    titleBarStyle: 'hidden',
    frame: false,
    transparent: true,
    x: max_width - width - margin,
    y: max_height - height - margin,
  });

  mainWindow.setAlwaysOnTop(true, 'screen');
  mainWindow.setIgnoreMouseEvents(true);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  ioHook.on('keydown', (event) => {
    // console.info(event);
    mainWindow.webContents.send('keydown', event.rawcode);
  });

  ioHook.on('keyup', (event) => {
    // console.info(event);
    mainWindow.webContents.send('keyup', event.rawcode);
  });

  ioHook.on('mousedown', (event) => {
    mainWindow.webContents.send('mousedown', event.button);
  });

  ioHook.on('mouseup', (event) => {
    mainWindow.webContents.send('mouseup', event.button);
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
