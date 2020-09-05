<template>
  <div class="frame-header">
    <div class="title-bar">
      <img class="logo" src="../../assets/img/logo.png" alt="">
      <span class="title">uu智慧酒店管理系统（××酒店）</span>
    </div>
    <div class="tool-bar">
      <win-bar></win-bar>
    </div>
  </div>
</template>

<script>
import WinBar from '../WinBar';
import { mapGetters } from 'vuex';
export default {
  components : {
    WinBar
  },
  computed : {
    ...mapGetters([
      'windowState'
    ])
  },
  mounted () {

  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/scss/base";
.frame-header {
  @include flex_layout(row, space-between, center);
  padding: 0 10px 0 20px;
  height: 38px;
  background-color: $lightGreen;
  -webkit-app-region: drag;

  .title-bar {
    @include flex_layout(row, flex-start, center);
    height: 100%;
    .logo {
      width: 23px;
      height: 23px;
    }

    .title {
      margin-left: 5px;
      color: $color_000;
      font-size: $font-size-mormal;
      font-weight: bold;
    }
  }
  .tool-bar {
    height: 100%;
  }
}
</style>
