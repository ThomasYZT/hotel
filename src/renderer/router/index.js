import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import { nvllRouterAuth } from './auth';

Vue.use(Router);

const router = new Router({
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
        noPermission : true,
        noFrame : true
      },
      component : () => import('../pages/login/index')
    },
    {
      path : '*',
      component : () => import('../pages/404/index')
    },

  ]
});

router.beforeEach((to, from, next) => {
  next();
  if (to.meta.noPermission) {
    next();
  } else {
    let userInfo = store.getters.userInfo;
    if (userInfo) {
      next();
    } else {
      next({
        name : 'login'
      });
    }
  }
});

export default router;
