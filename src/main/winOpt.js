import { ipcMain, ipcRenderer, remote } from 'electron';
import is from 'electron-is';

// ipc 通信发送的窗口状态改变事件的channel名称
const windowStateChangeChannel = 'window-state-changed';

// window的当前状态
export const WINDOW_STATE = {
  FULLSCREEN : 'full-screen',
  MAXIMIZED : 'maximized',
  MINIMIZED : 'minimized',
  HIDDEN : 'hidden',
  NORMAL : 'normal',
};

// window可执行的操作，通过发送消息触发
const WINDOW_ACTION = {
  MAXIMIZE : 'window-maximize',
  UNMAXIMIZE : 'window-unmaximize',
  MINIMIZE : 'window-minimize',
  CLOSE : 'window-close',
};

/**
 * 获取window的状态
 * @param window
 */
export function getWindowState (window) {
  if (window.isFullScreen()) {
    return WINDOW_STATE.FULLSCREEN;
  } if (window.isMaximized()) {
    return WINDOW_STATE.MAXIMIZED;
  } if (window.isMinimized()) {
    return WINDOW_STATE.MINIMIZED;
  } if (!window.isVisible()) {
    return WINDOW_STATE.HIDDEN;
  }

  return WINDOW_STATE.NORMAL;
}

/**
 * 发送一个 window-state-changed 消息到 renderer 进程
 * @param window
 * @param state
 */
function sendWindowStateEvent (window, state) {
  window.webContents.send(windowStateChangeChannel, state);
}

/**
 * 注册 window 状态变化后事件，它会发送一个消息到 renderer 进程
 * @param window
 */
export function registerWindowStateChangedEvents (window) {
  window.on('enter-full-screen', () => sendWindowStateEvent(window, WINDOW_STATE.FULLSCREEN));
  window.on('leave-full-screen', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
  window.on('maximize', () => sendWindowStateEvent(window, WINDOW_STATE.MAXIMIZED));
  window.on('minimize', () => sendWindowStateEvent(window, WINDOW_STATE.MINIMIZED));
  window.on('unmaximize', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
  window.on('restore', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
  window.on('hide', () => sendWindowStateEvent(window, WINDOW_STATE.HIDDEN));
  window.on('show', () => sendWindowStateEvent(window, WINDOW_STATE.NORMAL));
}

/**
 * 注册 window 状态变化动作，使用 ipc.send 对应的消息触发*
 * @param window
 */
export function registerWindowStateChangeActions (window) {
  // 窗口最小化
  ipcMain.on(WINDOW_ACTION.minimize, () => {
    console.log('onminimize')
    window.minimize();
  });

  // 窗口最大化
  ipcMain.on(WINDOW_ACTION.maximize, () => {
    window.maximize();
  });

  // 窗口取消最大化
  ipcMain.on(WINDOW_ACTION.unmaximize, () => {
    window.unmaximize();
  });

  // 窗口关闭
  ipcMain.on(WINDOW_ACTION.close, () => {
    window.close();
  });
}

/**
 *  生成带有promise的操作窗口的函数，可以进一步处理事件结束后的逻辑
 * @param action
 */
function generatePromisedWindowStateFunc (action) {
  return () => {
    return new Promise((resolve) => {
      ipcRenderer.send(action);
      console.log('111111')
      ipcRenderer.once(windowStateChangeChannel, (event, args) => {
        resolve(args);
      });
    });
  };
}

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
 * 最大化窗口的方法，因为windows和macOS之间的差异，单独写成一个函数
 */
function handleMaximizeWindow () {
  if (is.windows()) {
    remote.getCurrentWindow().maximize();
    return Promise.resolve(WINDOW_STATE.MAXIMIZED);
  }

  return new Promise((resolve) => {
    ipcRenderer.send(WINDOW_ACTION.MAXIMIZE);
    ipcRenderer.once(windowStateChangeChannel, (event, args) => {
      resolve(args);
    });
  });
}

/**
 * 窗口操作异步方法，包括最大化，最小化，关闭
 */
export const windowActionAsync = {
  maximize : handleMaximizeWindow,
  unmaximize : generatePromisedWindowStateFunc(WINDOW_ACTION.unmaximize),
  minimize : generatePromisedWindowStateFunc(WINDOW_ACTION.minimize),
  close : generatePromisedWindowStateFunc(WINDOW_ACTION.close),
};

/**
 * 窗口操作同步方法
 */
export const windowActionSync = {
  maximize : generateWindowStateFunc(WINDOW_ACTION.MAXIMIZE),
  unmaximize : generateWindowStateFunc(WINDOW_ACTION.UNMAXIMIZE),
  minimize : generateWindowStateFunc(WINDOW_ACTION.MINIMIZE),
  close : generateWindowStateFunc(WINDOW_ACTION.CLOSE),
};

/**
 * 给窗口改变事件增加监听
 * @param handle
 */
export function listenToWindowStateChange (handle) {
  ipcRenderer.on(windowStateChangeChannel, handle);
  return () => {
    ipcRenderer.removeListener(windowStateChangeChannel, handle);
  };
}
