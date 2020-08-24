/*
 * @Author: Dragon
 * @Date: 2020-04-16
 * @LastEditTime: 2020-08-21 15:06:17
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /chronic/src/services/login.js
 * @jt
 */
import request from '../utils/request';

// 获取二维码
export function getCode(data) {
  return request.get('/member/get_verify_code', data);
}

// 提交
export function submit(data) {
  return request.get('/member/login', data);
}

// 获取openId
export function getOpenId(data) {
  return request.get('/order/wechat_platform/get_open_id', data);
}