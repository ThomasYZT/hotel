import axios from 'axios';
import apiList from './apiList';
import qs from 'querystring';
import defautsDeep from 'lodash/defaultsdeep';
import store from '../../store';

const domain = 'http://139.155.42.50:8080';
//创建自定义axios实例
let instance = axios.create({
  baseURL : '',
  timeout : 240000, // 设置4分钟超时时间
  validateStatus : function (status) {
    return status < 500;
  },
  headers : {
    //设置发送内容格式
    'content-type' : 'application/x-www-form-urlencoded;charset=utf-8',
    //设置接受内容格式
    'Accept' : 'application/json',
  },
});

//响应拦截器
instance.interceptors.response.use((res) => {
  //处理响应数据
  return res.data;
}, function (err) {
  return Promise.reject(err);
});

export default {
  //post请求
  post (apiKey, params, config = null, withRequiredParams = true, loading = true) {
    loading && store.dispatch('loading');

    let myConfig = {
      params : {}
    };

    //自定义http配置
    if (config) {
      Object.assign(myConfig, config);
    }

    if (withRequiredParams) {
      if (params) {
        params = defautsDeep(params, store.state.commonParams);
      } else {
        params = store.state.commonParams;
      }
    }

    let needStringify = !(myConfig.headers &&
            (myConfig.headers['content-type'].includes('application/json') ||
                myConfig.headers['content-type'].includes('multipart/form-data')));

    return instance.post(`${domain}${apiList[apiKey]}`, needStringify ? qs.stringify(params) : params, myConfig).then(res => {
      if (res.code === 1) {
        return res;
      } else {
        return Promise.reject(res);
      }
    }).catch(err => {
      return Promise.reject(err);
    }).finally(() => {
      loading && store.dispatch('unloading');
    });
  },
  //get请求
  get (apiKey, params, config = null, withRequiredParams = true, loading = true) {
    loading && store.dispatch('loading');
    let myConfig = {
      params : {}
    };

    if (withRequiredParams) {
      if (params) {
        myConfig = defautsDeep({ params : defautsDeep(params, store.state.commonParams) }, myConfig);
      } else {
        myConfig = defautsDeep({ params : store.state.commonParams }, myConfig);
      }
    } else {
      myConfig = defautsDeep({ params : params }, myConfig);
    }

    //自定义http配置
    if (config) {
      Object.assign(myConfig, config);
    }

    return instance.get(`${domain}${apiList[apiKey]}`, myConfig).then(res => {
      if (res.code === 1) {
        return res;
      } else {
        return Promise.reject(res);
      }
    }).catch(err => {
      return Promise.reject(err);
    }).finally(() => {
      loading && store.dispatch('unloading');
    });
  },
};
