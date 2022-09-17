import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

async function createWindow(): Promise<void> {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload/preload.js'),
    },
  });
  ipcMain.handle('ping', () => 'pong');
  await win.loadFile('renderer/renderer.html');
  win.webContents.openDevTools();
}

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

void app.whenReady().then(() => {
  void createWindow();
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && void createWindow());
});
