/*
 * @Description: 跳转南京的页面地址
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-21 10:31:36
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-24 15:12:07
 */
import { OPEN_ID_PLAIN } from '@/constants/key';

// 判断当前网址的环境,返回路径
const environment = () => {
  let host = window.location.host
  let url = ''
  if(process.env.API_ENV === 'dev'){
    return 'test.'
  }
  if(host.indexOf('test') > -1){
    url = 'test.'
  }else if(host.indexOf('prev') > -1){
    url = 'pre.'
  }else{
    url = 'test.'
  }
  return url
}

let openId = localStorage.getItem(OPEN_ID_PLAIN)
// 用药咨询
const consultationPage = `http://m.${environment()}mtmn.simceredx.com/visit/history?param=QDBY&openid=${openId}&organizeId=`

// 随访记录
const visitPage = `http://m.${environment()}mtmn.simceredx.com/visit/history?param=QDBY&openid=${openId}&organizeId=`

export { environment, consultationPage, visitPage }