'use strict';

import { app } from 'electron';
import MainWindow from './windows/main';
import '../renderer/store';

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\');
}
const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:8080` : `file://${__dirname}/index.html`;

const HotelSystem = {
  init () {
    this._initApp();
  },

  _initApp () {
    app.on('ready', () => {
      MainWindow.launch(winURL);
    });

    app.on('activate', () => {
      if (MainWindow.checkInstance()) {
        !MainWindow.isShown && MainWindow.show();
      } else {
        MainWindow.launch(winURL);
      }
    });

    app.on('window-all-closed', () => {
      app.quit();
    });
  }
};

HotelSystem.init();

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
