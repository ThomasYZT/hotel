import is from 'electron-is';
// 自定义element-ui主题
import '../../assets/styles/theme/viewUITheme/index.less';
import TableCom from '../../components/TableCom';

export default {
  install : (Vue) => {
    Vue.prototype.$is = is;
    Vue.component(TableCom.name, TableCom);
  }
};
