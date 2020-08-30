import {
  Button
} from 'element-ui';
// 自定义element-ui主题
import '../../assets/styles/theme/elementTheme/index.scss';

export default {
  install : (Vue) => {
    Vue.use(Button);
  }
};
