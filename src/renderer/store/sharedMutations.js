import { ipcMain, ipcRenderer } from 'electron';

const IPC_EVENT_CONNECT = 'vuex-mutations-connect';
const IPC_EVENT_NOTIFY_MAIN = 'vuex-mutations-notify-main';
const IPC_EVENT_NOTIFY_RENDERERS = 'vuex-mutations-notify-renderers';

class SharedMutations {
  constructor (options, store) {
    this.options = options;
    this.store = store;
  }

  loadOptions () {
    if (!this.options.type) this.options.type = process.type === 'renderer' ? 'renderer' : 'main';
    if (!this.options.ipcMain) this.options.ipcMain = ipcMain;
    if (!this.options.ipcRenderer) this.options.ipcRenderer = ipcRenderer;
  }

  connect (payload) {
    this.options.ipcRenderer.send(IPC_EVENT_CONNECT, payload);
  }

  onConnect (handler) {
    this.options.ipcMain.on(IPC_EVENT_CONNECT, handler);
  }

  notifyMain (payload) {
    this.options.ipcRenderer.send(IPC_EVENT_NOTIFY_MAIN, payload);
  }

  onNotifyMain (handler) {
    this.options.ipcMain.on(IPC_EVENT_NOTIFY_MAIN, handler);
  }

  rendererProcessLogic () {
    // Connect renderer to main process
    this.connect();

    // Save original Vuex methods
    this.store.originalCommit = this.store.commit;

    // Don't use commit in renderer outside of actions
    this.store.commit = (type, payload) => {
      this.store.originalCommit(type, payload);
      this.notifyMain({ type, payload });
    };
  }

  mainProcessLogic () {
    const connections = {};

    // Save new connection
    this.onConnect((event) => {
      const win = event.sender;
      const winId = win.id;

      connections[winId] = win;

      // Remove connection when window is closed
      win.on('destroyed', () => {
        delete connections[winId];
      });
    });

    // Subscribe on changes from renderer processes
    this.onNotifyMain((event, { type, payload }) => {
      this.store.commit(type, payload);
    });
  }

  activatePlugin () {
    switch (this.options.type) {
      case 'renderer':
        this.rendererProcessLogic();
        break;
      case 'main':
        this.mainProcessLogic();
        break;
      default:
        throw new Error(`[Vuex Electron] Type should be "renderer" or "main".`);
    }
  }
}

export default (options = {}) => (store) => {
  const sharedMutations = new SharedMutations(options, store);

  sharedMutations.loadOptions();
  sharedMutations.activatePlugin();
};
