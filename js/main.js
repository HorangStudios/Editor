const electron = require('electron')
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const fs = require('fs');
const path = require('path');
const { autoUpdater, AppUpdater } = require("electron-updater");

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
  })

  win.loadFile('./html/index.html')

  var splash = new BrowserWindow({
    width: 528,
    height: 322,
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  splash.loadFile('./html/splash.html');
  splash.center();

  setTimeout(function () {
    splash.close();
    win.show();
  }, 10000);

  autoUpdater.on("download-progress", (progressObj) => {
    splash.webContents.send('download-progress', progressObj);
  });
}

app.whenReady().then(() => {
  createWindow()

  autoUpdater.checkForUpdates();
  console.log(`Checking for updates. Current version ${app.getVersion()}`);
})

autoUpdater.on("update-available", (info) => {
  console.log(`Update available. Current version ${app.getVersion()}`);
});

autoUpdater.on("update-not-available", (info) => {
  console.log(`No update available. Current version ${app.getVersion()}`);
});

autoUpdater.on("update-downloaded", (info) => {
  console.log(`Update downloaded. Current version ${app.getVersion()}`);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})