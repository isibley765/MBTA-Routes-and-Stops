const { app, BrowserWindow, ipcMain } = require('electron');
const QueryMTBA = require('./QueryMTBAClass.js');

var GetQueriesMTBA = new QueryMTBA();

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.maximize();

  // and load the index.html of the app.
  win.loadFile('src/index.html');

  // Open the DevTools.
  win.webContents.openDevTools();

  ipcMain.on('routes-request', (event, message) => {
      console.log("Getting routes...")
    GetQueriesMTBA.getRoutes((res, err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Routes gotten!");
        }
        win.webContents.send('routes-reply', {'err': err, 'res': res});
    })
  });

  ipcMain.on('stops-request', (event, routeID) => {
      console.log(`Getting ${routeID}'s stops...`)
    GetQueriesMTBA.getRouteStops(routeID, (res, err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Route ${routeID}'s stops gotten!`);
        }
        win.webContents.send('stops-reply', {'err': err, 'res': res});
    })
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.