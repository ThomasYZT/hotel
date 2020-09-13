const topName = 'hotelManager';

export default {
  menuManager : {
    path : '/hotelManager',
    component : () => import('../../pages/hotelManager/index.vue'),
    redirect : () => { return { name : 'hotelList' }; },
    meta : {
      iconClass : '',
      menuName : '酒店管理',
      activePath : `${topName}`,
    },
    children : {
      //菜单列表
      menuList : {
        path : '/hotelManager/list',
        name : 'hotelList',
        component : () => import('../../pages/hotelManager/child/hotelList.vue'),
        meta : {
          isMenu : false
        },
      }
    }
  }
};
