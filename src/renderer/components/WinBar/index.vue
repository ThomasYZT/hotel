<template>
  <div class="win-bar">
    <div v-for="(item, index) in toolsList"
         :key="index"
         class="tool-item"
         @click="toolClick($event, item.name)">
      <i class="iconfont" :class="{ [item.icon] : true }"></i>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      toolsList : [
        {
          name : 'minimize',
          icon : 'icon-minimize'
        },
        {
          name : 'maximize',
          icon : 'icon-maximize'
        },
        {
          name : 'close',
          icon : 'icon-close'
        }
      ]
    };
  },
  methods : {
    toolClick (e, name) {
      switch (name) {
        case 'minimize':
          return this.minimize();
        case 'maximize':
          return this.maximize();
        case 'close':
          return this.close();
      }
    },
    minimize () {
      console.log('minimize')
      this.$win.minimize();
    },
    maximize () {
      console.log('maximize')
      this.$win.maximize();
    },
    close () {
      console.log('close')
      this.$win.close();
    },
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
    border: 1px solid gray;
    border-top: none;
    cursor: pointer;

    i {
      font-size: 16px;
    }

    &:first-child {
      border-bottom-left-radius: 10px;
    }

    &:last-child {
      border-bottom-right-radius: 10px;
    }
  }
}
</style>
