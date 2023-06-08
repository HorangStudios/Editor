const remote = require('electron').remote;
const getWin = () => remote.BrowserWindow.getFocusedWindow();
window.$ = window.jQuery = require('jquery');
const { shell } = require('electron')

const closeWin = () => {
    getWin().close();
}
const minimizeWin = () => {
    getWin().minimize();
}
const maximizeWin = () => {
    const win = getWin();
    document.getElementById('maximize').style.display = "none";
    document.getElementById('restore').style.display = "block";
    win.maximize();
}
const restorewin = () => {
    const win = getWin();
    document.getElementById('maximize').style.display = "block";
    document.getElementById('restore').style.display = "none";
    win.unmaximize()
}
const zeanmenkominfo = true