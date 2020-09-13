<template>

  <iMenuItem v-if="!menuData.children || menuData.children.length === 0"
             :to="menuData.path"
             :name="menuData.activePath">{{menuData.menuName}}</iMenuItem>
  <Submenu v-else
           :name="menuData.activePath">
    <menu-com :menu-data="menuData.children"></menu-com>
  </Submenu>
</template>

<script>
export default {
  name : 'menuCom',
  props : {
    menuData : {
      type : Object,
      default () {
        return {};
      }
    }
  },
  mounted () {

  }
};
</script>

<style scoped>

</style>
