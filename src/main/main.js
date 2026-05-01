const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');

// Ensure Homebrew binaries (yt-dlp, ffmpeg) are findable on macOS
function getSpawnEnv() {
  const env = { ...process.env };
  if (process.platform === 'darwin') {
    const homebrewBin = process.arch === 'arm64' ? '/opt/homebrew/bin' : '/usr/local/bin';
    env.PATH = `${homebrewBin}:${env.PATH || '/usr/bin:/bin'}`;
  }
  return env;
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 620,
    minWidth: 700,
    minHeight: 520,
    frame: false,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 18, y: 18 },
    backgroundColor: '#0a0a0a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Get yt-dlp binary path
function getYtDlpPath() {
  const binaryName = process.platform === 'win32' ? 'yt-dlp.exe' : 'yt-dlp';
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'bin', binaryName);
  }
  return binaryName;
}

// Get video info
ipcMain.handle('get-video-info', async (_event, url) => {
  return new Promise((resolve, reject) => {
    const ytdlp = getYtDlpPath();
    const args = ['--dump-json', '--no-playlist', url];
    const proc = spawn(ytdlp, args, { env: getSpawnEnv() });
    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', d => stdout += d);
    proc.stderr.on('data', d => stderr += d);

    proc.on('close', code => {
      if (code === 0) {
        try {
          const info = JSON.parse(stdout);
          resolve({
            title: info.title,
            channel: info.uploader || info.channel,
            duration: info.duration_string || formatDuration(info.duration),
            thumbnail: info.thumbnail,
            id: info.id
          });
        } catch {
          reject('Failed to parse video info');
        }
      } else {
        reject(stderr.trim() || 'Could not fetch video info. Check the URL.');
      }
    });

    proc.on('error', () => reject('yt-dlp not found. Please install it first.'));
  });
});

function formatDuration(seconds) {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Choose download folder
ipcMain.handle('choose-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    defaultPath: path.join(os.homedir(), 'Downloads')
  });
  return result.canceled ? null : result.filePaths[0];
});

// Return the default downloads directory (used to initialise the UI)
ipcMain.handle('get-downloads-dir', () => path.join(os.homedir(), 'Downloads'));

// Download video
ipcMain.handle('download-video', async (event, { url, format, outputDir, isAudio, audioFormat }) => {
  return new Promise((resolve, reject) => {
    const ytdlp = getYtDlpPath();
    let args;

    if (isAudio) {
      args = [
        '--newline',
        '-x',
        '--audio-format', audioFormat,
        '--audio-quality', '0',
        '-o', path.join(outputDir, '%(title)s.%(ext)s'),
        url
      ];
    } else {
      args = [
        '--newline',
        '-f', format,
        '--merge-output-format', 'mp4',
        '-o', path.join(outputDir, '%(title)s.%(ext)s'),
        url
      ];
    }

    const proc = spawn(ytdlp, args, { env: getSpawnEnv() });
    let lastProgress = -1;
    let stderr = '';

    const handleOutput = (text) => {
      const progressMatch = text.match(/(\d+\.?\d*)%/);
      if (progressMatch) {
        const progress = parseFloat(progressMatch[1]);
        if (Math.floor(progress) !== lastProgress) {
          lastProgress = Math.floor(progress);
          event.sender.send('download-progress', { progress: lastProgress, text: text.trim() });
        }
      }
    };

    proc.stdout.on('data', data => handleOutput(data.toString()));
    proc.stderr.on('data', data => {
      const text = data.toString();
      stderr += text;
      handleOutput(text);
    });

    proc.on('close', code => {
      if (code === 0) {
        resolve({ success: true, outputDir });
      } else {
        const msg = stderr.trim() || 'Download failed. Check the URL or your internet connection.';
        reject(msg);
      }
    });

    proc.on('error', () => reject('yt-dlp not found. Please install it: https://github.com/yt-dlp/yt-dlp'));
  });
});

// Open folder in Finder / Explorer
ipcMain.handle('open-folder', async (_event, folderPath) => {
  shell.openPath(folderPath);
});

// Window controls
ipcMain.on('minimize-window', () => mainWindow.minimize());
ipcMain.on('maximize-window', () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.on('close-window', () => mainWindow.close());
