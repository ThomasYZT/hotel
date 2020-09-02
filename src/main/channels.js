import { ipcMain } from 'electron';

export const channelsInit = (mainWindow) => {
  //close
  ipcMain.on('close', () => {
    mainWindow.close();
  });

  //minimize
  ipcMain.on('minimize', () => {
    mainWindow.minimize();
  });
  
  //maximize
  ipcMain.on('maximize', () => {
    mainWindow.maximize();
  });
};
