/*
 * @Author: Dragon
 * @Date: 2020-4-16
 * @LastEditTime: 2020-08-19 17:54:43
 * @LastEditors: Dragon
 * @Description: 
 * @FilePath: /src/models/login.js
 * @jt
 */
import * as service from '../services/login'
export default {
  namespace: 'login',
  state: {

  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    // 获取验证码
    *getCode({ payload }, { call, put }) {
      yield call(service.getCode, payload)
    },

    // 提交
    *submit({ payload }, { call, put }) {
      const data = yield call(service.submit, payload)
      return data
    },

    // 获取openId
    *getOpenId({ payload }, { call, put }) {
      const data = yield call(service.getOpenId, payload)
      return data
    },

  },

  reducers: {
    save(state, action) {
      console.log(state, 'ddd')
      return state
    }
  }
};
