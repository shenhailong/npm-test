/*
 * @Author: Dragon
 * @Date: 2020-04-30
 * @LastEditTime: 2020-08-05 12:56:12
 * @LastEditors: Dragon
 * @Description: 通用
 * @FilePath: /src/services/common.js
 * @jt
 */
import request from '../utils/request';

// 下拉列表数据
export function getDropDownList() {
  return request.get('/enquiry/get_drop_down_list');
}
