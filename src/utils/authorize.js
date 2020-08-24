/*
 * @Description: 授权
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-18 15:16:59
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-21 09:50:16
 */
import baseUrl from './baseUrl'
import { appIdTest, appIdProd } from '@/constants/common';

const getAppId = () => {
  let appId = ''
  let host = window.location.host
  if(host.indexOf('test') > -1){
    appId = appIdTest
  }else if(host.indexOf('prev') > -1){
    appId = appIdTest
  }else if(process.env.API_ENV === 'dev'){
    appId = appIdTest
  }else{
    appId = appIdProd
  }
  return appId
}

const authorize = (path) => {
  let redirect_uri = `${baseUrl('bj', true)}/order/wechat_platform/get_code_transform?rdUrl=`
  let href = [
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${getAppId()}`,
    `redirect_uri=${encodeURIComponent(redirect_uri)}${encodeURIComponent(encodeURIComponent(window.location.origin + `/#/auth?path=${path}`))}`,
    'response_type=code',
    'scope=snsapi_base'
  ].join('&')
  window.location.href = href;
}

export { authorize, getAppId }