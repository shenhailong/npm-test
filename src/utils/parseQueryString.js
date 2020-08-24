/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-05 12:37:19
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-20 15:57:23
 */
// 解析查询参数
function parseQueryString(queryString) {
  var params = {}
  if(queryString){
    queryString = queryString.replace(/\?/i, '')
  }
  var parts = queryString && queryString.split('&') || window.location.search.substr(1).split('\x26')
  for (var i = 0; i < parts.length; i++) {
    var keyValuePair = parts[i].split('=')
    var key = decodeURIComponent(keyValuePair[0])
    var value = keyValuePair[1] ? decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')) : keyValuePair[1]

    switch (typeof (params[key])) {
    case 'undefined':
      params[key] = value
      break
      // first
    case 'array':
      params[key].push(value)
      break
      // third or more
    default:
      params[key] = [params[key], value] // second
    }
  }
  return params
}

export default parseQueryString
