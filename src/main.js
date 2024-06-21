const { app, BrowserWindow, session, Menu } = require('electron');
const path = require('node:path');


if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    resizable: false,
    icon: __dirname + 'assets/icon.ico',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
  });


  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  Menu.setApplicationMenu(null);
};


app.whenReady().then(() => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['*']
      }
    })
  })
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
