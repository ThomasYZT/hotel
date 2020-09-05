import store from '../store';

export const nvllRouterAuth = (to) => {
  if (store.getters.userInfo && store.getters.routeInfo) {
    return {
      name : store.getters.routeInfo[0].name
    };
  } else {
    return {
      name : 'login'
    };
  }
};

export const permissionInfoParse = (permissionInfo) => {
  let _routes = [];
  // while () {
  //
  // }
};
