const files = require.context('.', false, /\.js$/);
let modules = [];

files.keys().forEach(key => {
  if (key === './index.js') return;
  modules = modules.concat(map2Arr(files(key).default));
});

function map2Arr (map) {
  let arr = [];
  Object.keys(map).forEach(key => {
    if (map[key].children) {
      map[key].children = [...map2Arr(map[key].children)];
    }
    arr.push(map[key]);
  });
  return arr;
};

export default modules;
