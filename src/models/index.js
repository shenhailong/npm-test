/*
 * @Author: gaojiudong
 * @Date: 2020-04-07 14:17:09
 * @LastEditTime: 2020-04-07 14:17:24
 * @LastEditors: gaojiudong
 * @Description:
 * @FilePath: /dva-quickstart/src/models/index.js
 * @jt
 */
const context = require.context('./', false, /\.js$/);

export default context
  .keys()
  .filter((item) => item !== './index.js')
  .map((k) => context(k));
