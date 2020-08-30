import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'normalize.css/normalize.css'; // 全局默认样式
import elementUI from './assets/plugins/elementUI';
import './assets/styles/scss/_common.scss'; // 全局自定义样式
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(elementUI);
/* eslint-disable no-new */
new Vue({
  el : '#app',
  router,
  store,
  render : h => h(App)
});
