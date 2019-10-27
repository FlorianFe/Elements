const electron = require('electron');
const debounce = require('lodash.debounce')

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const globalShortcut = electron.globalShortcut;
const ipcMain = electron.ipcMain;

const Menu = electron.Menu;

const path = require('path');

let window = null;

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 545,
    backgroundColor: '#fff'
  });
  window.loadURL(path.join('file://', __dirname, 'index.html'));

  function forceRedraw() {
    window.webContents.executeJavaScript(
      `document.getElementById('periodic-table').style.display = 'none';`);

    setTimeout(() => {
      window.webContents.executeJavaScript(
        `document.getElementById('periodic-table').style.display = '';
        document.getElementsByTagName('body')[0].style.filter = '';`);
    }, 20);
  }

  let isRedrawApplied = true;
  const debouncedRedraw = debounce(() => {
    isRedrawApplied = true;
    forceRedraw();
  }, 200);

  window.on('maximize', () => {
    isRedrawApplied = false;
  });

  window.on('move', () => {
    if (!window.isMaximized() && !isRedrawApplied) {
      window.webContents.executeJavaScript(
        `document.getElementsByTagName('body')[0].style.filter = 'blur(5px)';`);
      debouncedRedraw();
    }
  });

  window.on('closed', () => {
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

  if (process.platform === 'darwin') {
    template.unshift({
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


app.on('ready', () => {
  createWindow();
});

app.on('activate', function () {
  if (window === null) {
    createWindow()
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
