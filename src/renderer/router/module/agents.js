const topName = 'agentManager';

export default {
  menuManager : {
    path : '/agentManager',
    component : () => import('../../pages/agentManager/index.vue'),
    redirect : () => { return { name : 'agentList' }; },
    meta : {
      iconClass : '',
      menuName : '代理商管理',
      activePath : `${topName}`,
    },
    children : {
      //菜单列表
      menuList : {
        path : '/agentManager/list',
        name : 'agentList',
        component : () => import('../../pages/agentManager/child/agentList.vue'),
        meta : {
          isMenu : false
        },
      }
    }
  }
};
