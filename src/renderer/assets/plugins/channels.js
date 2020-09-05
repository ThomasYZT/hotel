import { windowActionSync } from '../../../main/winOpt';

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
  }
};
