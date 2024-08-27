import axios from 'axios';
import { EiInfo } from '@/utils/eiinfo.js';

let host = window.location.host;
let reg = /^localhost:4000+/;

const baseURL = reg.test(host)
  ? '.././xdata-succeed-mill'
  : '.././';

//专门接受blob形式的二进制文件。
const interfaceRequestAxios = axios.create({
  baseURL,
  responseType: 'blob'
});

/**
 * http request 拦截器
 */
interfaceRequestAxios.interceptors.request.use(
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
interfaceRequestAxios.interceptors.response.use(
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


const interfaceRequest = {
  send: function(url, info) {
    return new Promise((resolve, reject) => {
      interfaceRequestAxios
          .post(url, info)
          .then(res => {
            resolve(res.data);
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

export default interfaceRequest