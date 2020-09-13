const files = require.context('./module', false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  if (key === './index.js') return;
  let apiModule = files(key).default;
  Object.keys(apiModule).forEach(key => {
    if (key === 'module') return;
    let _key = key.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
    modules[`${apiModule.module}${_key}`] = apiModule[key];
  });
});

export default modules;
