import { app, BrowserWindow } from 'electron';

function createWindow(): void {
  const win = new BrowserWindow({ width: 800, height: 600 });
  void win.loadFile('index.html');
}

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

void app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
});
