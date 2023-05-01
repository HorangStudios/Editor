const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { autoUpdater } = require("electron-updater");

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {

  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    transparent: true,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  const splash = new BrowserWindow({
    width: 528,
    height: 322,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    show: true
  });

  splash.loadFile('./html/splash.html');

  win.loadFile('./html/index.html');

  win.once('ready-to-show', () => {
    if (!autoUpdater.downloadProgress) {
      splash.hide();
      win.show();
    }
  });

  autoUpdater.checkForUpdates();
  console.log(`Checking for updates. Current version ${app.getVersion()}`);

  autoUpdater.on("update-available", (info) => {
    console.log(`Update available. Current version ${app.getVersion()}`);
    splash.webContents.send('update-message', 'An update is available. Downloading now...');
  });

  autoUpdater.on("update-not-available", (info) => {
    console.log(`No update available. Current version ${app.getVersion()}`);
  });

  autoUpdater.on("download-progress", (progressObj) => {
    splash.webContents.send('update-message', `Downloading update... ${progressObj.percent}%`);
  });

  autoUpdater.on("update-downloaded", (info) => {
    console.log(`Update downloaded. Current version ${app.getVersion()}`);
    splash.webContents.send('update-message', 'Update downloaded. Installing now...');
    autoUpdater.quitAndInstall();
  });

}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('get-app-version', (event) => {
  event.returnValue = app.getVersion();
});
