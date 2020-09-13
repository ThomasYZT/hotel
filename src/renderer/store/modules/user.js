import { userInfo } from '../persistence';
import ajax from '../../assets/api';
import router, { resetRouter } from '../../router';
import { generateRoutes } from '../../router/routeUtils';

const state = {
  userInfo : userInfo.get(),
  permissionInfo : null,
  routeInfo : null,
};

const getters = {
  userInfo : state => {
    return state.userInfo;
  },
  permissionInfo : state => {
    return state.permissionInfo;
  },
  routeInfo : state => {
    return state.routeInfo;
  }
};

const mutations = {
  UPDATE_USERINFO (state, data) {
    state.userInfo = data;
    userInfo.set(data);
  },
  UPDATE_PERMISSIONINFO (state, data) {
    state.permissionInfo = data;
  },
  UPDATE_ROUTEINFO (state, data) {
    state.routeInfo = data;
  }
};

const actions = {
  setUserInfo ({ commit }, data) {
    commit('UPDATE_USERINFO', data);
  },
  validUserInfo ({ commit }, data) {
    // ajax.get()
  },
  generateRouteInfo ({ commit }, orgInfo) {
    return new Promise((resolve, reject) => {
      try {
        let _routes = generateRoutes(orgInfo);
        resetRouter(_routes);
        commit('UPDATE_ROUTEINFO', _routes);
        resolve(_routes[0]);
      } catch (err) {
        reject({ type : 'routeError', err });
      }
    });
  },
  getPermissionInfo ({ commit, dispatch }, { tip, userInfo }) {
    return new Promise((resolve, reject) => {
      ajax.get('userMenuList', {
        hotelUserId : userInfo.id
      }).then(res => {
        commit('UPDATE_PERMISSIONINFO', res.data);
        resolve(dispatch('generateRouteInfo', res.data));
      }).catch(err => {
        tip && dispatch('showMessage', { type : 'error', msg : '获取权限失败' });
        reject({ type : 'permissionError', err });
      });
    });
  },
  login ({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      const loginParams = {
        userName : params.userName,
        password : params.password,
      };
      //登陆
      ajax.get('userLogin', loginParams, null, true, false).then(res => {
        dispatch('setUserInfo', res.data);
        params.tip && dispatch('showMessage', { type : 'success', msg : '登录成功' });
        //获取权限
        resolve(dispatch('getPermissionInfo', { tip : !!params.tip, userInfo : res.data }));
      }).catch(err => {
        params.tip && dispatch('showMessage', { type : 'error', msg : `登录失败：${err.msg || err.toString()}` });
        reject({ type : 'loginError', err });
      });
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
