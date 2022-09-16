import { app, BrowserWindow } from 'electron';

async function createWindow(): Promise<void> {
  const win = new BrowserWindow({ width: 800, height: 600 });
  await win.loadFile('index.html');
}

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());

void app.whenReady().then(() => {
  void createWindow();
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && void createWindow());
});
