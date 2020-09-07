import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import { nvllRouterAuth } from './routeUtils';

Vue.use(Router);

const createRouter = () => new Router({
  routes : [
    {
      path : '/',
      name : 'root',
      redirect : nvllRouterAuth
    },
    {
      path : '/login',
      name : 'login',
      meta : {
        needPermission : false,
        noFrame : true
      },
      component : () => import('../pages/login/index')
    },
    {
      path : '/noPermission',
      name : 'noPermission',
      meta : {
        needPermission : false
      },
      component : () => import('../pages/noPermission/index')
    },
    {
      path : '/noService',
      name : 'noService',
      meta : {
        needPermission : false
      },
      component : () => import('../pages/noService/index')
    },
    {
      path : '*',
      component : () => import('../pages/404/index')
    },
  ]
});

let router = createRouter();

export const resetRouter = (routes) => {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
  router.addRoutes(routes);
};

router.beforeEach((to, from, next) => {
  if (to.meta.needPermission) {
    let userInfo = store.getters.userInfo;
    if (userInfo) {
      next();
    } else {
      next({
        name : 'login'
      });
    }
  } else {
    next();
  }
});

export default router;
