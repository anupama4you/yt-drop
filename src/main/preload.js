const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('ytdrop', {
  getVideoInfo: (url) => ipcRenderer.invoke('get-video-info', url),
  chooseFolder: () => ipcRenderer.invoke('choose-folder'),
  getDownloadsDir: () => ipcRenderer.invoke('get-downloads-dir'),
  downloadVideo: (opts) => ipcRenderer.invoke('download-video', opts),
  openFolder: (path) => ipcRenderer.invoke('open-folder', path),
  onDownloadProgress: (cb) => ipcRenderer.on('download-progress', (_, data) => cb(data)),
  removeProgressListener: () => ipcRenderer.removeAllListeners('download-progress'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window'),
});
