/*
 * @Author: Dragon
 * @Date: 2020-04-22
 * @LastEditTime: 2020-08-05 12:32:21
 * @LastEditors: Dragon
 * @Description: 个人中心接口服务
 * @FilePath: /src/services/user.js
 * @jt
 */
import request from '../utils/request';

// 我的问诊列表
export function getConsultations(data) {
  return request.get('/consultation/get_consultation_bill_list', data);
}

//临床诊断模糊查询
export function getDiagnosisList(data) {
  return request.njGet('v1/clinical/diagnosis/list/' + data.condition, 'line');
}

// 创建咨询人
export function createPeopleGL(data){
  return request.post('consultation/patient/insert', data);
}

// 根据memberId查询咨询人
export function getPeopleGL(data){
  return request.get('consultation/patient/get_patient_by_memberId', data);
}

// 获取医院id
export function getHospitalId() {
  return request.get('consultation/patient/get_last_hospital_third_id');
}
