/*
 * @Description: 授权页面
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-20 10:29:45
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-21 10:09:07
 */

import React, { useEffect } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Helmet } from 'react-helmet';
import { authorize, getAppId } from '@/utils/authorize'
import parseQueryString from '@/utils/parseQueryString';
import { ResponseSuccess, UnBound } from '@/constants/response';
import { USER_OPEN_ID, OPEN_ID_PLAIN, TOKEN, MEMBER_ID, BACK_URL } from '@/constants/key';

const AuthPage = (props) => {
  const { dispatch} = props;
  useEffect(() => {
    getOpenId()
  }, []);

  const getParams = () => {
    const hash = window.location.hash
    const index = hash.indexOf('?')
    const result = hash.substring(index + 1, index + hash.length)
    const params = parseQueryString(result) || null;
    return params
  }

  const getOpenId = () => {
    dispatch({
      type: 'login/getOpenId',
      payload: {
        code: getParams().code,
        appId: getAppId()
      },
    }).then(res => {
      if(res.data.code === ResponseSuccess){
        if(res.data.data.openIdPlaintext){
          localStorage.setItem(OPEN_ID_PLAIN, res.data.data.openIdPlaintext);
          localStorage.setItem(USER_OPEN_ID, res.data.data.openId);
          login(res.data.data.openId)
        }else{
          let obj = {
            path: 'auth',
            url: `${window.location.origin}/#/auth`
          }
          localStorage.setItem(BACK_URL, JSON.stringify(obj))
          authorize('auth', `${window.location.origin}/#/auth`)
        }
      }else {
        dispatch(
          routerRedux.back()
        );
      }
    })
  }

  const login = (openId) => {
    dispatch({
      type: 'login/submit',
      payload: {
        containerType: 1, //0-未知 1-微信浏览器 2-手机浏览器 3-pc浏览器 4-app 5-微信小程序
        mode: 'wechat_open_id_login',
        bussinessUnit: 2,
        memberType: 8,
        sellChannelId: 18,
        openId
      },
    }).then( res => {
      console.log(res)
      if(res.data.code === ResponseSuccess){
        localStorage.setItem(TOKEN, res.data.data.tokenString);
        localStorage.setItem(MEMBER_ID, res.data.data.memberId);
        let obj = JSON.parse(localStorage.getItem(BACK_URL))
        if(obj.path === 'auth'){
          dispatch(
            routerRedux.push({
              pathname: '/user'
            })
          );
        }else{
          window.history.go(-1)
        }
      }else if(res.data.code === UnBound){
        dispatch(
          routerRedux.push({
            pathname: '/login',
          })
        );
      }
    })
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>有爱医学</title>
      </Helmet>
    </div>
  );
};

export default connect()(AuthPage);
