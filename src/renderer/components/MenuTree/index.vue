<template>
  <div class="menu-tree">
    <Menu active-name="1"
          width="100%"
          :accordion="false">
      <template v-for="(item, index) in treeData">
        <menu-com :menu-data="item" :key="item.name" ></menu-com>
      </template>
    </Menu>
  </div>
</template>

<script>
import menuCom from './menuCom';

export default {
  components : {
    menuCom
  },
  data () {
    return {
      subMenuStatus : { name : '' },
      treeData : [
        {
          path : '/menuManager',
          menuName : '菜单管理',
          iconClass : 'asd',
          activePath : 'menuManager',
        },
        {
          path : '/agentManager',
          menuName : '代理商管理',
          iconClass : 'asd',
          activePath : 'agentManager',
        },
        {
          path : '/brandManager',
          menuName : '品牌管理',
          iconClass : 'asd',
          activePath : 'brandManager',
        },
        {
          path : '/hotelManager',
          menuName : '酒店管理',
          iconClass : 'asd',
          activePath : 'hotelManager',
        }
      ]
    };
  },
  methods : {

  }
};
</script>

<style scoped>

</style>
