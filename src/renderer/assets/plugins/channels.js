import { windowActionSync } from '../../../common/channels';

export default {
  install : (Vue) => {
    Vue.prototype.$win = actions;
  }
};

const actions = {
  close () {
    windowActionSync.close();
  },
  minimize () {
    windowActionSync.minimize();
  },
  maximize () {
    windowActionSync.maximize();
  },
  unmaximize () {
    windowActionSync.unmaximize();
  },
  fullscreen () {
    windowActionSync.fullscreen();
  },
  exitfullscreen () {
    windowActionSync.exitfullscreen();
  },
  restore () {
    windowActionSync.restore();
  }
};
