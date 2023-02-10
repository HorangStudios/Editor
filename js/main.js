const electron = require('electron')
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const fs = require('fs');
const path = require('path');

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
    frame: false
  });

  splash.loadFile('./html/splash.html');
  splash.center();

  setTimeout(function () {
    splash.close();
    win.show();
  }, 10000);
}

app.whenReady().then(createWindow)

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
