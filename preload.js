const { contextBridge, ipcRenderer } = require("electron")

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('api', {
  path: async () => {
    try {
      const res = await ipcRenderer.invoke('potd', "./src/db/sqlite.db", true);
    } catch (error) {
      console.log(error);
    }
  },
  equery: async () => {
    try {
      const res = await ipcRenderer.invoke('executeQuery', "SELECT * FROM (?)", "Users");
      document.getElementById('pout').innerText = 'Output: ' + res;
    } catch (error) {
      document.getElementById('pout').innerText = 'Output: ' + error;
    }
  },
  fetchall: async () => {
    try {
      const res = await ipcRenderer.invoke('fetchall', "SELECT * FROM (?)", ["Users"]);
      document.getElementById('pout').innerText = 'Output: ' + JSON.stringify(res);
    } catch (error) {
      document.getElementById('pout').innerText = 'Output: ' + error;
    }
  },
  fetchone: async (query, arr) => {
    try {
      const res = await ipcRenderer.invoke('fetchone', query, arr);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
})
