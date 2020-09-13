import {
  Tabs,
  TabPane,
  Dropdown,
  DropdownMenu,
  Form,
  FormItem,
  Input,
  Button,
  Checkbox,
  Message,
  Menu,
  MenuItem,
  Submenu
} from 'view-design';
// 自定义element-ui主题
import '../../assets/styles/theme/viewUITheme/index.less';

export default {
  install : (Vue) => {
    Vue.component(Tabs.name, Tabs);
    Vue.component(TabPane.name, TabPane);
    Vue.component(Dropdown.name, Dropdown);
    Vue.component(DropdownMenu.name, DropdownMenu);
    Vue.component(FormItem.name, FormItem);
    Vue.component(Menu.name, Menu);
    Vue.component(Submenu.name, Submenu);

    Vue.component('iForm', Form);
    Vue.component('iInput', Input);
    Vue.component('iButton', Button);
    Vue.component('iCheckbox', Checkbox);
    Vue.component('iMenuItem', MenuItem);
    Vue.component('Message', Message);

    Vue.prototype.$Message = Message;

    Message.config({
      top : 70,
      duration : 2
    });
  }
};
