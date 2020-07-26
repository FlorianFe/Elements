const electron = require('electron');
const debounce = require('lodash.debounce')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;

const { floor } = Math;

const Menu = electron.Menu;

const path = require('path');

let window = null;

const WINDOW_START_WIDTH = 800;
const WINDOW_MIN_WIDTH = 400;
const ASPECT_RATIO = (10.0 / 18.0);
const HEAD_SECTION_HEIGHT = 75;

const createWindow = () =>
{
  window = new BrowserWindow(
  {
    minWidth: WINDOW_MIN_WIDTH,
    width: WINDOW_START_WIDTH,
    height: floor(WINDOW_START_WIDTH * ASPECT_RATIO) + HEAD_SECTION_HEIGHT,
    backgroundColor: '#fff',
    webPreferences: 
    {
      nodeIntegration: true
    }
  });
  window.loadURL(path.join('file://', __dirname, 'index.html'));

  window.on('closed', () => 
  {
    window = null;
  });

  const template =
    [
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        role: 'window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click() { require('electron').shell.openExternal('https://github.com/FlorianFe/Elements') }
          }
        ]
      }
    ]

  if (process.platform === 'darwin') 
  {
    template.unshift(
    {
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    })

    // Edit menu
    template[1].submenu.push(
      { type: 'separator' },
      {
        label: 'Speech',
        submenu: [
          { role: 'startspeaking' },
          { role: 'stopspeaking' }
        ]
      }
    )

    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ]
  }

  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}


app.on('ready', () => 
{
  createWindow();
});

app.on('activate', () =>
{
  if (window === null) {
    createWindow()
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
