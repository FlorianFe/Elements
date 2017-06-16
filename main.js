const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;

const path = require('path');
const url = require('url');

app.on('ready', function()
{
  let browserWindow = new BrowserWindow(
  {
    width: 500,
    height: 450,
    backgroundColor: '#fff'
  });

  browserWindow.loadURL(path.join('file://', __dirname, 'index.html'));
  browserWindow.toggleDevTools();
});
