import { ipcMain, ipcRenderer, remote } from 'electron';
import is from 'electron-is';

//消息通道
const CHANNELS = {
  MAXIMIZE : 'maximize',
  UNMAXIMIZE : 'unmaximize',
  MINIMIZE : 'minimize',
  CLOSE : 'close',
  RESTORE : 'restore',
  WINDOW_STATE_CHANGE : 'window_state_change',
  EXIT_FULLSCREEN : 'exit_fullscreen',
  FULL_SCREEN : 'fullscreen'
};

// window的当前状态
export const WINDOW_STATE = {
  FULLSCREEN : 'full-screen',
  MAXIMIZED : 'maximized',
  MINIMIZED : 'minimized',
  NORMAL : 'normal',
};

/**
 * 注册主进程事件
 */
export function registerMainProcessEvent (window) {
  // 窗口最小化
  ipcMain.on(CHANNELS.MINIMIZE, () => {
    window.minimize();
  });

  // 窗口最大化
  ipcMain.on(CHANNELS.MAXIMIZE, () => {
    window.maximize();
  });

  // 窗口取消最大化
  ipcMain.on(CHANNELS.UNMAXIMIZE, () => {
    window.unmaximize();
  });

  // 窗口关闭
  ipcMain.on(CHANNELS.CLOSE, () => {
    window.close();
  });

  // 窗口关闭
  ipcMain.on(CHANNELS.RESTORE, () => {
    window.restore();
  });
  
  // 全屏
  ipcMain.on(CHANNELS.FULL_SCREEN, () => {
    window.setFullScreen(true);
  });
  
  // 退出全屏
  ipcMain.on(CHANNELS.EXIT_FULLSCREEN, () => {
    window.setFullScreen(false);
  });
}

/**
 * 注册BrowserWindow响应事件，并通知renderer Process
 */
export function registerWindowStateChangedEvents (window) {
  window.on('enter-full-screen', () => sendWindowStateEvent(window, WINDOW_STATE.FULLSCREEN));
  window.on('leave-full-screen', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
  window.on('maximize', () => sendWindowStateEvent(window, WINDOW_STATE.MAXIMIZED));
  window.on('unmaximize', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
  window.on('minimize', () => sendWindowStateEvent(window, WINDOW_STATE.MINIMIZED));
  window.on('restore', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
}

/**
 * 发送一个 window-state-changed 消息到 renderer 进程
 */
function sendWindowStateEvent (window, state) {
  window.webContents.send(CHANNELS.WINDOW_STATE_CHANGE, state);
}

/**
 * 窗口操作异步方法
 */
export const windowActionAsync = {
  maximize : handleMaximizeWindow,
  unmaximize : generatePromisedWindowStateFunc(CHANNELS.unmaximize),
  minimize : generatePromisedWindowStateFunc(CHANNELS.minimize),
  close : generatePromisedWindowStateFunc(CHANNELS.close),
};

/**
 * 最大化窗口的方法，因为windows和macOS之间的差异，单独写成一个函数
 */
function handleMaximizeWindow () {
  if (is.windows()) {
    remote.getCurrentWindow().maximize();
    return Promise.resolve(WINDOW_STATE.MAXIMIZED);
  }

  return new Promise((resolve) => {
    ipcRenderer.send(CHANNELS.MAXIMIZE);
    ipcRenderer.once(CHANNELS.WINDOW_STATE_CHANGE, (event, args) => {
      resolve(args);
    });
  });
}

/**
 *  生成带有promise的操作窗口的函数，可以进一步处理事件结束后的逻辑
 */
function generatePromisedWindowStateFunc (channel) {
  return () => {
    return new Promise((resolve) => {
      ipcRenderer.send(channel);
      ipcRenderer.once(CHANNELS.WINDOW_STATE_CHANGE, (event, args) => {
        resolve(args);
      });
    });
  };
}

/**
 * 窗口操作同步方法
 */
export const windowActionSync = {
  maximize : generateWindowStateFunc(CHANNELS.MAXIMIZE),
  unmaximize : generateWindowStateFunc(CHANNELS.UNMAXIMIZE),
  minimize : generateWindowStateFunc(CHANNELS.MINIMIZE),
  close : generateWindowStateFunc(CHANNELS.CLOSE),
  restore : generateWindowStateFunc(CHANNELS.RESTORE),
  fullscreen : generateWindowStateFunc(CHANNELS.FULL_SCREEN),
  exitfullscreen : generateWindowStateFunc(CHANNELS.EXIT_FULLSCREEN)
};

/**
 * 生成不带有promise的操作窗口函数，只负责触发事件
 * @param action
 */
function generateWindowStateFunc (action) {
  return () => {
    ipcRenderer.send(action);
  };
}

/**
 * 给窗口改变事件增加监听
 * @param handle
 */
export function listenToWindowStateChange (handle) {
  ipcRenderer.on(CHANNELS.WINDOW_STATE_CHANGE, handle);
  return () => {
    ipcRenderer.removeListener(CHANNELS.WINDOW_STATE_CHANGE, handle);
  };
}

/**
 * 获取window的状态
 * @param window
 */
export function getWindowState (window) {
  if (window.isFullScreen()) {
    return WINDOW_STATE.FULLSCREEN;
  } else if (window.isMaximized()) {
    return WINDOW_STATE.MAXIMIZED;
  } else if (window.isMinimized()) {
    return WINDOW_STATE.MINIMIZED;
  } else if (!window.isVisible()) {
    return WINDOW_STATE.HIDDEN;
  }
  return WINDOW_STATE.NORMAL;
}
