import ajax from '../../assets/api';

const state = {
  orgInfo : null,
};

const getters = {
  orgInfo : state => {
    return state.orgInfo;
  }
};

const mutations = {
  UPDATE_ORGINFO (state, data) {
    state.orgInfo = data;
  }
};

const actions = {
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
