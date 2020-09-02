//http环境变量
const HTTP_ENV = process.env.HTTP_ENV;

//设置baseURL、commonURL
let baseURL;

switch (HTTP_ENV) {
  //测试环境
  case 'test':
    baseURL = 'https://videotest.yishihui.com/';
    break;
    //预发布环境
  case 'pre':
    baseURL = 'https://videopre.piaoquantv.com/';
    break;
    //正式环境
  case 'prod':
    baseURL = 'https://longvideoapi.piaoquantv.com/';
    break;
}

export default {
  baseURL
};
