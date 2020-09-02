<template>
  <div id="app">
    <router-view v-if="noFrame"/>
    <mainFrame v-else>
      <transition name="el-fade-in">
        <router-view slot="router"></router-view>
      </transition>
    </mainFrame>
  </div>
</template>

<script>
import mainFrame from './components/Layout/mainFrame';
export default {
  components : {
    mainFrame
  },
  computed : {
    noFrame () {
      return !!this.$route.meta.noFrame;
    }
  },
  data () {
    return {};
  }
};
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
