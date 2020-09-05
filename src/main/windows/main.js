import { BrowserWindow } from 'electron';
import { registerMainProcessEvent, registerWindowStateChangedEvents } from '../../common/channels';
export default {
  name : 'MainWindow',
  window : null,
  isShown : false,

  launch (url) {
    this._createWindow();
    this._loadUrl(url);
    this._initIPC();
  },

  _createWindow () {
    this.window = new BrowserWindow({
      height : 563,
      width : 1000,
      minimizable : true,
      center : true,
      frame : false,
      show : false,
      autoHideMenuBar : false,
      titleBarStyle : 'customButtonsOnHover'
    });
  },

  _loadUrl (url) {
    this.window.loadURL(url);
  },

  _initIPC () {
    registerMainProcessEvent(this.window);
    registerWindowStateChangedEvents(this.window);
    
    this.window.on('closed', () => {
      this.window = null;
    });

    this.window.on('ready-to-show', function () {
      this.show();
    });
  },

  show () {
    this.window.show();
    this.window.focus();
    this.isShown = true;
  },

  hide () {
    this.window.hide();
    this.isShown = false;
  },

  checkInstance () {
    return !!this.window;
  }
};
