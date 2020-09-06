import ajax from '../../assets/api';
import router, { resetRouter } from '../../router';
import { generateRoutes } from '../../router/routeUtils';

const state = {
  orgInfo : null,
  routeInfo : null,
};

const getters = {
  orgInfo : state => {
    return state.orgInfo;
  },
  routeInfo : state => {
    return state.routeInfo;
  }
};

const mutations = {
  UPDATE_ORGINFO (state, data) {
    state.orgInfo = data;
  },
  UPDATE_ROUTEINFO (state, data) {
    state.routeInfo = data;
  }
};

const actions = {
  updateRouteInfo ({ commit }, routeInfo) {
    commit('UPDATE_ROUTEINFO', routeInfo);
  },
  generateRouteInfo ({ commit }, orgInfo) {
    return new Promise((resolve, reject) => {
      let _routes = generateRoutes(orgInfo);
      resetRouter(_routes);
    });
  },
  getOrgInfo ({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      ajax.post('getOrgInfo', params).then(res => {
        if (res.code === 200) {
          let orgInfo = res.data;
          commit('UPDATE_ORGINFO', orgInfo);
          resolve(dispatch('generateRouteInfo', orgInfo));
        } else {
          dispatch('showMessage', { type : 'error', msg : '获取组织架构信息失败' });
          reject('getOrgInfoError');
        }
      }).catch(err => {
        reject(err);
      });
    }).then(orgInfo => {
      return dispatch('generateRouteInfo', orgInfo);
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
