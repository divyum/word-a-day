const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const ipc = electron.ipcMain

var mainWindow = null;


app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 600
    });

    mainWindow.webContents.openDevTools();

    mainWindow.loadURL(`file://${__dirname}/app/index.html`);

    mainWindow.on('closed', function () {
        mainWindow = null
    });
});

app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('close-main-window', function () {
    app.quit();
});

var settingsWindow = null;

ipc.on('open-settings-window', function () {
    if (settingsWindow) {
        return;
    }

    settingsWindow = new BrowserWindow({
        frame: false,
        height: 200,
        resizable: false,
        width: 200
    });

    settingsWindow.loadURL('file://' + __dirname + '/app/settings.html');

    settingsWindow.on('closed', function () {
        settingsWindow = null;
    });
});


ipc.on('close-settings-window', function () {
    settingsWindow.quit();
});
