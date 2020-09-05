const state = {
  loading : false,
  windowState : 'normal'
};

const getters = {
  loading : state => {
    return state.loading;
  },
  windowState : state => {
    return state.windowState;
  }
};

const mutations = {
  UPDATE_LOADING (state, status) {
    state.loading = status;
  },
  UPDATE_WINDOW_STATE (state, val) {
    state.windowState = val;
  }
};

const actions = {
  loading ({ commit }) {
    commit('UPDATE_LOADING', true);
  },
  unloading ({ commit }) {
    commit('UPDATE_LOADING', false);
  },
  updateLoadingStatus ({ commit }, status) {
    commit('UPDATE_LOADING', status);
  },
  setWindowState ({ commit }, val) {
    commit('UPDATE_WINDOW_STATE', val);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
