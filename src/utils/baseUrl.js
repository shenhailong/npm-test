/*
 * @Description:
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-05 12:37:19
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-21 15:04:27
 */
// 请求接口的路径判断，根据本身的域名匹配
const baseUrl = (region, auth) => {
  const api = {
    // 北京环境地址
    bj: {
      test: 'http://test.api.yoai.com',
      prev: 'http://prev.api.yoai.com',
      production: 'http://api.yoai.com'
    },
    // 南京环境地址
    nj: {
      test: 'http://30.6.0.2:3000/mock/11/v1',
      prev: 'http://prev.yoaiclinic.yoai.com',
      production: 'http://yoaiclinic.yoai.com'
    }
  }
  let host = window.location.host
  let url = ''

  // 授权方法需要的地址
  if(auth && process.env.API_ENV === 'dev'){
    return 'http://test.api.yoai.com'
  }
  if(process.env.API_ENV === 'dev'){
    return url
  }
  if(host.indexOf('test') > -1){
    url = api[region].test
  }else if(host.indexOf('prev') > -1){
    url = api[region].prev
  }else{
    url = api[region].production
  }
  return url
}

export default baseUrl