import axios from 'axios';
import { EiInfo } from '@/utils/eiinfo.js';

let host = window.location.host;
let reg = /^localhost:4000+/;

const baseURL = reg.test(host)
  ? '/xdata-succeed-mill/service'
  : '/service';

const requestAxios = axios.create({
  baseURL,
  timeout: 100000, // 超时时间
});

/**
 * http request 拦截器
 */
requestAxios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*",
      "Access-Control-Allow-Methods":"POST, GET, PUT, OPTIONS, DELETE"
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
requestAxios.interceptors.response.use(
  (response) => {
    if (response.data.status === 2) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
  }
);

const request = {
  send: function(url, info) {
    return new Promise((resolve, reject) => {
      requestAxios
          .post(url, info)
          .then(res => {
          resolve(EiInfo.parseJSONObject(res.data));
        })
          .catch(
            err =>{
              reject(err);
            }
        )
      },
    );
  },
};

export default request