/**
* @description : 手机号检测。
* @mobile : 待验证的参数。
* @return -> true表示合格。
*/
export function mobileValid(mobile) {
  try {
    return /^1[3|4|5|6|7|8]\d{9}$/.test(mobile)
  } catch (e) {
    return false
  }
}