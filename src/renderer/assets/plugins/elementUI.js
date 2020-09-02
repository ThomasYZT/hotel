// 自定义element-ui主题
import {
  Checkbox
} from 'element-ui';
import '../../assets/styles/theme/elementTheme/index.scss';

export default {
  install : (Vue) => {
    Vue.use(Checkbox);
  }
};
