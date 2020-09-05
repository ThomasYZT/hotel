<template>
  <div class="frame-header">
    <template v-if="$is.windows()">
      <div class="title">title</div>
      <div  class="bar-wrapper">
        <win-bar></win-bar>
      </div>
    </template>
    <template v-else>

    </template>
  </div>
</template>

<script>
import WinBar from '../WinBar';
export default {
  components : {
    WinBar
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/scss/base";
.frame-header {
  -webkit-app-region: drag;
  @include flex_layout(row, space-between, center);
  height: 38px;
  background-color: $lightGreen;
  .title {
    height: 100%;
  }
  .bar-wrapper {
    height: 100%;
    margin-right: 20px;
  }
}
</style>
