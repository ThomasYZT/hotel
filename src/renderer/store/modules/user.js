import { userInfo } from '../persistence';
import ajax from '../../assets/api';
const state = {
  userInfo : userInfo.get(),
  permissionInfo : null,
};

const getters = {
  userInfo : state => {
    return state.userInfo;
  },
  permissionInfo : state => {
    return state.permissionInfo;
  },
};

const mutations = {
  UPDATE_USERINFO (state, data) {
    state.userInfo = data;
    userInfo.set(data);
  },
  UPDATE_PERMISSIONINFO (state, data) {
    state.permissionInfo = data;
  },
};

const actions = {
  setUserInfo ({ commit }, data) {
    commit('UPDATE_USERINFO', data);
  },
  getPermissionInfo ({ commit, dispatch }, userInfo) {
    return new Promise((resolve, reject) => {
      ajax.post('getPermission', userInfo).then(res => {
        if (res.code === 200) {
          let permissionInfo = res.data;
          commit('UPDATE_PERMISSIONINFO', permissionInfo);
          resolve(permissionInfo);
        } else {
          dispatch('showMessage', { type : 'error', msg : '获取权限失败' });
          reject('getPermissionError');
        }
      }).catch(err => {
        dispatch('showMessage', { type : 'error', msg : '获取权限失败' });
        reject(err);
      });
    });
  },
  validUserInfo ({ commit }, data) {
    // ajax.get()
  },
  login ({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      //登陆
      ajax.post('login', params).then(res => {
        if (res.code === 200) {
          let userInfo = res.data;
          commit('UPDATE_USERINFO', userInfo);
          //获取权限
          resolve(dispatch('getPermissionInfo', userInfo));
        } else {
          dispatch('showMessage', { type : 'error', msg : '登陆失败' });
          reject('loginError');
        }
      }).catch(err => {
        dispatch('showMessage', { type : 'error', msg : '登陆失败' });
        reject(err);
      });
    }).then(() => {
      //获取组织架构
      return dispatch('getOrgInfo');
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
