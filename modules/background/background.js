import app from 'app';
import BrowserWindow from 'browser-window';
import ipc from 'ipc';
import path from 'path';
import Promise from 'bluebird';
let fs = Promise.promisifyAll(require('fs'));

let mainWindow;

let background = (() => {

    // Create the browser window.
  app.on('ready', () => {
    var confPath = path.join(process.cwd(), 'client/config/window_configuration.min.json');
    console.log(confPath);
    fs.readFileAsync(confPath, 'utf8')
    .then((data) => JSON.parse(data))
    .then((data) => {
      mainWindow = new BrowserWindow((data && data.window_bounds) ? data.window_bounds : {width: 800, height: 600});
      // and load the index.html of the app.
      mainWindow.loadUrl('file://' + process.cwd() + '/client/app/index/index.html');

      // Open the DevTools.
      mainWindow.openDevTools();

      // Emitted when the window is closed.
      mainWindow.on('close', function() {
        data.window_bounds = {
          height: mainWindow.getBounds().height,
          width: mainWindow.getBounds().width
        };
        fs.writeFileAsync(confPath, JSON.stringify(data));
      });
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        eApp.quit();
      }
    });
  });
});

ipc.on('goto-folders', (e, query) => {
  console.log(e.sender);
  mainWindow.loadUrl('file://' + process.cwd() + '/client/app/folders/folders.html');

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('render-folders', 'HEJ!!!!');
  })

  mainWindow.openDevTools();
});

module.exports = background;