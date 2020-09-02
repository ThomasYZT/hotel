import { userInfo } from '../persistence';
import ajax from '../../assets/api';
const state = {
  userInfo : userInfo.get()
};

const getters = {
  userInfo : state => {
    return state.userInfo;
  }
};

const mutations = {
  UPDATE_USERINFO (state, data) {
    state.userInfo = data;
    userInfo.set(data);
  },
};


const actions = {
  setUserInfo ({ commit }, data) {
    commit('UPDATE_USERINFO', data);
  },
  validUserInfo ({ commit }, data) {
    // ajax.get()
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
