function createClientWindow() {
    const childWindow = new remote.BrowserWindow({
        show: false, // hide the window initially
        width: 640,
        height: 400,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false, // disable nodeIntegration
            contextIsolation: true, // enable contextIsolation
            worldSafeExecuteJavaScript: true, // enable worldSafeExecuteJavaScript
        }
    })

    childWindow.loadURL('https://horanghill.web.app/html/player/engine.html?online=false')

    childWindow.webContents.once('did-finish-load', () => {
        // pass a reference to createScene to the child window
        childWindow.webContents.executeJavaScript(`loadMap(${JSON.stringify(scene)})`)
        childWindow.show()
    })
}
