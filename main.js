const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { setdbPath, executeQuery, executeMany, executeScript, fetchOne, fetchMany, fetchAll, getQuestion } = require("sqlite-electron");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  });
  mainWindow.loadFile('src/index.html');

}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

ipcMain.handle("potd", async (event, dbPath, isuri) => {
  try {
    return await setdbPath(dbPath, isuri)
  } catch (error) {
    return error
  }
});

ipcMain.handle("databasePath", async (event, dbPath) => {
  return await sqlite.setdbPath(dbPath);
});

ipcMain.handle("executeQuery", async (event, query, value) => {
  try {
    return await executeQuery(query, value);
  } catch (error) {
    return error;
  }
});

ipcMain.handle("fetchone", async (event, query, value) => {
  try {
    return await fetchOne(query, value);
  } catch (error) {
    return error;
  }
});

ipcMain.handle("fetchall", async (event, query, value) => {
  try {
    return await fetchAll(query, value);
  } catch (error) {
    return error;
  }

});