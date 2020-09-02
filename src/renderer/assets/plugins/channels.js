import { ipcRenderer } from 'electron';

export default {
  install : (Vue) => {
    Vue.prototype.$win = channels;
  }
};

const channels = {
  close () {
    ipcRenderer.send('close');
  },
  minimize () {
    ipcRenderer.send('minimize');
  },
  maximize () {
    ipcRenderer.send('maximize');
  }
};
