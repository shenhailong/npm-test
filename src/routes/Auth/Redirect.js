/*
 * @Description: 跳转南京的重定向页面
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-20 18:12:13
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-24 15:16:35
 */

import React, { useEffect } from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import parseQueryString from '@/utils/parseQueryString';
import { consultationPage, visitPage } from '@/utils/njPageUrl';
import { ResponseSuccess } from '@/constants/response';

const LoginPage = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    let path = getParams().path
    let url = ''
    switch (path) {
    case 'consultation':
      url = consultationPage;
      break;
    case 'visit':
      url = visitPage;
      break;
    default:
    }

    dispatch({
      type: 'user/getHospitalId'
    }).then(res=>{
      if(res.data.code === ResponseSuccess){
        window.location.href = `${url}${res.data.data}`
      }
    })
  }, []);

  const getParams = () => {
    const hash = window.location.hash
    const index = hash.indexOf('?')
    const result = hash.substring(index + 1, index + hash.length)
    const params = parseQueryString(result) || null;
    return params
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

export default connect()(LoginPage);
