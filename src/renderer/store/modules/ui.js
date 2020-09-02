const state = {
  loading : false
};

const getters = {
  loading : state => {
    return state.loading;
  }
};

const mutations = {
  UPDATE_LOADING (state, status) {
    state.loading = status;
  },
};

const actions = {
  loading ({ commit }) {
    commit('UPDATE_LOADING', true);
  },
  unloading ({ commit }) {
    commit('UPDATE_LOADING', false);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
