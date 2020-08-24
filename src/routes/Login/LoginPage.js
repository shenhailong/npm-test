/**
 * @Author : Dragon
 * @Date : 2020-04-13 18:01:08
 * @LastEditTime : 2020-04-13 18:20:48
 * @LastEditors : Dragon
 * @Description : 功能类似于问诊项目的登陆,只不过这里是绑定手机号
 * @FilePath : /medical/src/routes/Login/LoginPage.js
 * @jt
 */
import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Helmet } from 'react-helmet';
import { Toast } from 'antd-mobile';
import { ActivityIndicator } from 'antd-mobile';
import * as validator from '@/utils/validator';
import { ResponseSuccess } from '@/constants/response';
import { TOKEN, USER_OPEN_ID, MEMBER_ID, BACK_URL } from '@/constants/key';
import classes from './LoginPage.css';

const LoginPage = (props) => {
  const { dispatch, loading } = props;
  const [mobile, setMobileValue] = useState('');
  const [code, setCodeValue] = useState('');
  const [leftTime, setTime] = useState(60); // 定时器剩余时间
  const [showTime, setShowTime] = useState(false); // 展示倒计时
  const timer = useRef(null);

  // 卸载清除定时器
  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const setCode = (value) => {
    if(value.length > 4){
      value = value.substring(0, 4)
    }
    setCodeValue(value);
  }

  // 获取验证码
  const getCode = () => {
    if (!validator.mobileValid(mobile)) {
      Toast.fail('请输入正确的手机号', 1);
      return;
    }
    setShowTime(true);
    timer.current = setInterval(() => {
      setTime((prevCount) => {
        if (prevCount === 0) {
          clearInterval(timer.current);
          setShowTime(false);
          return 60;
        }
        return prevCount - 1;
      });
    }, 1000);
    dispatch({
      type: 'login/getCode',
      payload: {
        phone: mobile,
        dataType: 'ajax',
        bussinessUnitId: 2,
      },
    });
  };

  // 提交
  const submitHandler = () => {
    let openId = localStorage.getItem(USER_OPEN_ID)
    if (!validator.mobileValid(mobile)) {
      Toast.fail('请输入正确的手机号', 1);
      return;
    }
    if (code === '') {
      Toast.fail('请输入验证码', 1);
      return;
    }
    dispatch({
      type: 'login/submit',
      payload: {
        phone: mobile,
        verifyCode: code,
        containerType: 1, //0-未知 1-微信浏览器 2-手机浏览器 3-pc浏览器 4-app 5-微信小程序
        mode: 'verifycode_login',
        bussinessUnit: 2,
        memberType: 8,
        sellChannelId: 18,
        openId: openId
      },
    }).then((res) => {
      if (res.data.code === ResponseSuccess) {
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
          window.location.href = obj.url
        }
      }
    });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>登录</title>
      </Helmet>
      <ActivityIndicator toast text="Loading..." animating={loading} />
      <div className={classes.page}>
        <div className={classes.logo}></div>
        <form className={classes.form}>
          <div className={classes.form_item}>
            <div className={classes.label_name}>+86</div>
            <div className={`${classes.arrow} arrow-right`}></div>
            <div className={classes.line}></div>
            <input
              value={mobile}
              onChange={(e) => {
                setMobileValue(e.target.value);
              }}
              className={classes.inp}
              placeholder="请输入手机号"
              // onClick={()=>this.setSelectionRange(0, this.value.length)}
              maxLength="11"
              type="number"
            />
          </div>
          <div className={`${classes.form_item} ${classes.flex_between}`}>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
              className={classes.inp}
              placeholder="请输入验证码"
              maxLength="4"
              type="number"
            />
            <div className={classes.flex_start}>
              <div className={classes.line}></div>
              {!showTime ? (
                <div onClick={getCode} className={classes.btn}>
                  发送验证码
                </div>
              ) : (
                <div className={classes.btn}>{leftTime}</div>
              )}
            </div>
          </div>
          <div
            disabled={loading}
            className={classes.submit}
            onClick={submitHandler}
          >
            提交
          </div>
        </form>
        <p className={classes.tip}>
          若手机号未注册，将会进入注册流程。注册即视为同意
          <Link to="/registrationAgreement" className={classes.agreement}>《有爱用户注册协议》</Link>、
          <Link to="/privacyPolicy" className={classes.agreement}>《有爱用户隐私政策》</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToprops = (states) => {
  const { login } = states;
  return {
    ...login,
    loading: !!states.loading.effects['login/submit'],
  };
};

export default connect(mapStateToprops)(LoginPage);
