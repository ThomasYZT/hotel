import Store from 'electron-store';
const store = new Store();

export const userInfo = {
  get () {
    return store.get('userInfo', null);
  },
  set (userInfo) {
    store.set('userInfo', userInfo);
  }
};
