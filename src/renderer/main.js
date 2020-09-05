import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import channels from './assets/plugins/channels';
import globalUtils from './assets/plugins/globalUtils';
import { listenToWindowStateChange } from '../common/channels';
import './assets/styles/font/iconfont.css';
import 'normalize.css/normalize.css'; // 全局默认样式
import elementUI from './assets/plugins/elementUI';
import viewUI from './assets/plugins/viewUI';
import './assets/styles/scss/_common.scss'; // 全局自定义样式

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

Vue.use(globalUtils);
Vue.use(elementUI);
Vue.use(viewUI);
Vue.use(channels);

/* eslint-disable no-new */
new Vue({
  el : '#app',
  router,
  store,
  render : h => h(App)
});

listenToWindowStateChange((event, state) => {
  store.dispatch('setWindowState', state);
});
