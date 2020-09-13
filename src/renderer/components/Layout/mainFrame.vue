<template>
  <div class="main-frame">
    <!-- header -->
    <frameHeader v-if="header"></frameHeader>

    <div class="frame-content">
      <!-- aside -->
      <frameAside v-if="aside"></frameAside>

      <div class="router-com" v-if="routerCom">
        <!-- main -->
        <frameMain>
          <slot name="router"></slot>
          <transition name="fade"> <Loading v-if="loading" /> </transition>
        </frameMain>
      </div>

      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import frameHeader from './frameHeader';
import frameMain from './frameMain';
import frameAside from './frameAside';
import Loading from '../Loading';
import { mapGetters } from 'vuex';

export default {
  props : {
    header : {
      type : Boolean,
      default : true
    },
    aside : {
      type : Boolean,
      default : true
    },
    routerCom : {
      type : Boolean,
      default : true
    }
  },
  components : {
    frameHeader,
    frameMain,
    frameAside,
    Loading
  },
  computed : {
    ...mapGetters([
      'loading'
    ])
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/scss/base";
.main-frame {
  position: relative;
  height: 100%;
  width: 100%;
  .frame-content {
    @include flex_layout(row, center, center);
    position: relative;
    height: calc(100% - 38px);
    width: 100%;

    >>> .frame-aside {
      height: calc(100% - 38px);
      flex: 1 0;
    }

    .router-com {
      position: relative;
      flex: 1 0;
      height: 100%;
      width: 100%;
      overflow: scroll;
    }
  }

}
</style>
