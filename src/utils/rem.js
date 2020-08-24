/*
 * @Author: Dragon
 * @Date: 2020-04-13 16:17:43
 * @LastEditTime: 2020-08-21 15:05:52
 * @LastEditors: Dragon
 * @Description: 
 * @FilePath: /medical/src/utils/rem.js
 * @jt
 */
// 基准大小
const baseSize = 32
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 1024 宽的缩放比例，可根据自己需要修改。如果设计稿是750，那就改为750
  const scale = document.documentElement.clientWidth / 375
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}