const state = {
  permissionInfo : null,
  routeInfo : null,
};

const getters = {
  permissionInfo : state => {
    return state.permissionInfo;
  },
  routeInfo : state => {
    return state.routeInfo;
  }
};

const mutations = {
  UPDATE_PERMISSIONINFO (state, data) {
    state.permissionInfo = data;
  },
  UPDATE_ROUTEINFO (state, data) {
    state.routeInfo = data;
  }
};

const actions = {
  updatePermisionInfo ({ commit }, permissionInfo) {
    commit('UPDATE_PERMISSIONINFO', permissionInfo);
  },
  updateRouteInfo ({ commit }, routeInfo) {
    commit('UPDATE_ROUTEINFO', routeInfo);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
