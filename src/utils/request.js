/*
 * @Author: Dragon
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2020-08-21 15:05:18
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /medical/src/utils/request.js
 * @jt
 */
import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import { ResponseSuccess, TokenExpired } from '@/constants/response';
import { TOKEN, BACK_URL } from '@/constants/key';
import parseQueryString from '@/utils/parseQueryString';
import config from '../../package.json'
import baseUrl from './baseUrl'
import { authorize } from '@/utils/authorize'

// 不需要显示错误提示的code列表，暂时先写到这里，之后如果code有很多就需要单独写一个文件提出
// 0 成功
const codeList = [0, 150012];

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  Toast.info(error.response.statusText, 2);
  throw error;
}

const parseQuery = (obj) => {
  let str = '';
  for (let key in obj) {
    const value =
      typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
    str += '&' + key + '=' + value;
  }
  return str.substr(1);
};
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

const request = (url, method = 'get', data, isFormData, region) => {

  const token = localStorage.getItem(TOKEN);
  let urlToken = null
  const hash = window.location.hash
  const index = hash.indexOf('?')
  const result = hash.substring(index + 1, index + hash.length)
  const params = parseQueryString(result) || null;
  if(params && params.token){
    urlToken = params.token
  }
  let options = {
    method: method,
    headers: {
      'Content-Type': isFormData
        ? 'multipart/form-data;charset=UTF-8'
        : 'application/json;charset=UTF-8',
      // "referer": "no-referrer-when-downgrade",
      [TOKEN]: token || urlToken,
      key: config.key, // 每个app要传的一个固定MD5字符串
      version: config.version, // 版本号
      appType: config.appType, // 1 患者端，2 医生端，3 销售端
      client: config.client, // 客户端  1 android, 2 ios, 3 web, 4 wx, 5 xcx
      channel: config.channel // 来源渠道，前端根据实际情况传即可
      // dataType: "ajax",
    },
    credentials: 'include', // 是否携带cookie，默认为omit,不携带; same-origi,同源携带; include,同源跨域都携带
  };
  if (isFormData) {
    options = {
      method: method,
    };
  }
  if (method === 'get') {
    if(data === 'line'){
      url += ''
    }else{
      url += '?' + parseQuery(data);
    }
  }else {
    if (isFormData) {
      options.body = data;
    } else {
      options.body = JSON.stringify(data);
    }
  }
  return fetch(baseUrl(region) + url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      // 这个是由于后端是不同项目，返回的数据结构不一样造成的
      if(data.code !== undefined){
        // 北京
        if (data.code !== ResponseSuccess && !codeList.includes(data.code) && data.code !== TokenExpired) {
          Toast.info(data.reason, 2);
        }
        if (data.code === TokenExpired) {
          // 此处的path 是写死的一个,更合理发方式是拿到当前path
          let obj = {
            path: 'TokenExpired',
            url: window.location.href
          }
          localStorage.setItem(BACK_URL, JSON.stringify(obj))
          authorize('TokenExpired')
        }
      }else{
        // 南京
        if(data.ret === 400){
          Toast.info(data.msg, 2);
        } else {
          if (data.data.code !== ResponseSuccess && !codeList.includes(data.data.code) && data.data.code !== TokenExpired) {
            Toast.info(data.data.msg, 2);
          }
          if (data.data.code === TokenExpired) {
            // 此处的path 是写死的一个,更合理发方式是拿到当前path
            let obj = {
              path: 'TokenExpired',
              url: window.location.href
            }
            localStorage.setItem(BACK_URL, JSON.stringify(obj))
            authorize('TokenExpired')
          }
        }
      }

      return {
        data: data.code !== undefined ? data : data.data
      };
    })
    .catch((err) => ({ err }));
};
export default {
  get(url, data) {
    return request(url, 'get', data, false, 'bj');
  },
  post(url, data, isFormData = false) {
    return request(url, 'post', data, isFormData, 'bj');
  },
  // 南京get接口方式
  njGet(url, data) {
    return request(url, 'get', data, false, 'nj');
  },
  // 南京post接口方式
  njPost(url, data, isFormData = false) {
    return request(url, 'post', data, isFormData, 'nj');
  },
};
