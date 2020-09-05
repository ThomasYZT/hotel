<template>
  <div class="win-bar">
    <div v-for="(item, index) in toolsList"
         :key="index"
         class="tool-item"
         :class="{ 'disable' : windowState === WINDOW_STATE.FULLSCREEN && index === 0 }"
         @click="toolClick($event, item.name)">
      <i class="iconfont" :class="{ [item.class] : true }"></i>
    </div>
  </div>
</template>

<script>
import { WINDOW_STATE } from '../../../common/channels';
import { mapGetters } from 'vuex';
export default {
  computed : {
    ...mapGetters([
      'windowState'
    ]),
    toolsList () {
      const _config = [
        {
          name : 'minimize',
          class : 'icon-minimize'
        },
        {
          name : 'fullscreen',
          class : 'icon-maximize'
        },
        {
          name : 'close',
          class : 'icon-close'
        }
      ];

      if (this.windowState === WINDOW_STATE.FULLSCREEN) {
        _config.splice(1, 1, {
          name : 'exitFullscreen',
          class : 'icon-restore'
        });
      } else {
        _config.splice(1, 1, {
          name : 'fullscreen',
          class : 'icon-maximize'
        });
      }
      return _config;
    }
  },
  data () {
    return {
      WINDOW_STATE
    };
  },
  methods : {
    toolClick (e, name) {
      switch (name) {
        case 'minimize':
          return this.minimize();
        case 'fullscreen':
          return this.fullscreen();
        case 'exitFullscreen':
          return this.exitFullscreen();
        case 'close':
          return this.close();
      }
    },
    minimize () {
      this.$win.minimize();
    },
    fullscreen () {
      this.$win.fullscreen();
    },
    close () {
      this.$win.close();
    },
    exitFullscreen () {
      this.$win.exitfullscreen();
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/scss/base";
.win-bar {
  @include flex_layout(row, center, center);
  height: 20px;
  border-radius: 0 10px 10px 0;
  .tool-item {
    @include flex_layout(column, center, center);
    padding: 0 5px;
    height: 100%;
    flex: 1 0 auto;
    border-right: 1px solid gray;
    border-bottom: 1px solid gray;
    border-top: none;
    cursor: pointer;
    box-shadow: 0 0 3px #747474;

    &.disable {
      cursor: not-allowed;
      color: #999999;
      box-shadow: 0 0 3px #999999;
      &:hover {
        box-shadow: 0 0 3px #999999;
      }
    }

    &:hover {
      transition: all .3s;
      box-shadow: 0 0 8px #757575;
    }

    i {
      font-size: 16px;
    }

    &:first-child {
      border-left: 1px solid #747474;
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
