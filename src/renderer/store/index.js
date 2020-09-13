import Vue from 'vue';
import Vuex from 'vuex';

import { createPersistedState } from 'vuex-electron';
import createSharedMutations from './sharedMutations';

import modules from './modules';

Vue.use(Vuex);
export default new Vuex.Store({
  modules,
  plugins : [
    createPersistedState(),
    createSharedMutations({
      type : process.type === 'renderer' ? 'renderer' : 'main'
    })
  ],
  strict : process.env.NODE_ENV !== 'production'
});
