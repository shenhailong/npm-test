/*
 * @Author: Dragon
 * @Date: 2020-4-22
 * @LastEditTime: 2020-08-24 15:05:15
 * @LastEditors: Dragon
 * @Description: 
 * @FilePath: /src/models/user.js
 * @jt
 */
import * as service from '../services/user'
export default {
  namespace: 'user',
  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    // 我的问诊列表
    *getConsultations({ payload }, { call, put }) {
      const data = yield call(service.getConsultations, payload)
      return data
    },
    // 临床诊断模糊查询
    *getDiagnosisList({ payload }, { call, put }) {
      const data = yield call(service.getDiagnosisList, payload)
      return data
    },
    // 创建咨询人
    *createPeopleGL({ payload }, { call, put }){
      const data = yield call(service.createPeopleGL, payload)
      return data
    },
    *getPeopleGL({ payload }, { call, put }){
      const data = yield call(service.getPeopleGL, payload)
      return data
    },
    // 获取医院ID
    *getHospitalId({ payload }, { call, put }){
      const data = yield call(service.getHospitalId, payload)
      return data
    }
  },

  reducers: {
    save(state, action) {
      console.log(state, 'ddd')
      return state
    }
  }
};
