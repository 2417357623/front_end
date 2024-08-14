import axios from 'axios';
import { EiInfo } from '@/utils/eiinfo.js';

let host = window.location.host;
console.log(window.location.host);
let reg = /^localhost:4000+/;
if (reg.test(host)) {
  axios.defaults.baseURL = '.././' + "xdata-succeed-mill/" + 'service'
} else {
  axios.defaults.baseURL = '.././service'
}

const request = {
  send: function(url, info) {
    return new Promise((resolve, reject) => {
        axios
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