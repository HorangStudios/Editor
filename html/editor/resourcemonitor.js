const process = require('process');
const app = require('electron')

function updateResourceMonitor() {
    document.getElementById('cpumeter').innerText = "CPU Usage: " + Math.floor(process.getCPUUsage().percentCPUUsage) + "%";

    const memoryUsage = process.memoryUsage();
    const usedMemory = memoryUsage.heapUsed;
    document.getElementById('rammeter').innerText = `Ram Usage:  ${Math.round(usedMemory / 1024 / 1024)} MB`;

    document.getElementById('cursormeter').innerText = app.remote.screen.getCursorScreenPoint().x + ", " + app.remote.screen.getCursorScreenPoint().y;
}   