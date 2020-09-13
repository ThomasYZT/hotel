<template>
  <div class="frame-aside">
    <div class="menu-list">
      <menuTree></menuTree>
    </div>
  </div>
</template>

<script>
import menuTree from '../../components/menuTree';
export default {
  components : {
    menuTree
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/scss/base";
.frame-aside {
  position: relative;
  height: 100%;
  width: 196px;
  background-color: $normalGreen;
  overflow: hidden;
  .menu-list {
    height: 100%;
    width: 196px;
    overflow-y: auto;
  }
}
</style>
