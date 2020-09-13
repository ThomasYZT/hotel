const topName = 'brandManager';

export default {
  menuManager : {
    path : '/brandManager',
    component : () => import('../../pages/brandManager/index.vue'),
    redirect : () => { return { name : 'brandList' }; },
    meta : {
      iconClass : '',
      menuName : '品牌管理',
      activePath : `${topName}`,
    },
    children : {
      //菜单列表
      menuList : {
        path : '/brandManager/list',
        name : 'brandList',
        component : () => import('../../pages/brandManager/child/brandList.vue'),
        meta : {
          isMenu : false
        },
      }
    }
  }
};
