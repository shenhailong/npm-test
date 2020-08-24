/*
 * @Author: gaojiudong
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2020-08-21 15:02:40
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /medical/src/router.js
 * @jt
 */
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'; // 异步加载路由
import { TOKEN, BACK_URL } from '@/constants/key';
import { authorize } from '@/utils/authorize'

function RouterConfig({ history, app }) {
  const LoginPage = dynamic({
    app,
    component: () => import('./routes/Login/LoginPage'),
  });
  // 授权页面
  const AuthPage = dynamic({
    app,
    component: () => import('./routes/Auth/Index'),
  });
  // 登陆页面--注册协议
  const RegistrationAgreementPage = dynamic({
    app,
    component: () => import('./routes/Article/RegistrationAgreementPage'),
  });
  // 登陆页面--隐私政策
  const PrivacyPolicyPage = dynamic({
    app,
    component: () => import('./routes/Article/PrivacyPolicyPage'),
  });
  const NotFund = dynamic({
    app,
    component: () => import('./routes/404Page'),
  });
  // 个人中心
  const User = dynamic({
    app,
    component: () => import('./routes/User/Index/index'),
  });
  // 联系我们
  const About = dynamic({
    app,
    component: () => import('./routes/User/About/index'),
  });
  // 常问药师
  const AskYs = dynamic({
    app,
    component: () => import('./routes/User/AskYs/index'),
  });
  // 咨询人管理
  const PeopleGL = dynamic({
    app,
    component: () => import('./routes/User/PeopleGL/index/index'),
  });
  // 新增咨询人
  const CreatePeople = dynamic({
    app,
    component: () => import('./routes/User/PeopleGL/create/index'),
  });
  // 修改或查看咨询人
  const EditPeople = dynamic({
    app,
    component: () => import('./routes/User/PeopleGL/edit/index')
  })
  // 跳转南京页面的中转页面
  const RedirectPage = dynamic({
    app,
    component: () => import('./routes/Auth/Redirect'),
  });
  //路由拦截，如果没有token，就返回登录页面
  const routes = [
    {
      path: '/',
      noAuth: true,
      component: User,
    },
    {
      path: '/user',
      noAuth: true,
      component: User
    },
    {
      path: '/about',
      noAuth: true,
      component: About
    },
    {
      path: '/askys',
      noAuth: true,
      component: AskYs
    },
    {
      path: '/peoplegl',
      noAuth: true,
      component: PeopleGL
    },
    {
      path: '/create/people',
      noAuth: true,
      component: CreatePeople
    },
    {
      path: '/edit/people',
      noAuth: true,
      component: EditPeople
    },
    {
      path: '/redirect',
      noAuth: true,
      component: RedirectPage
    }
  ];
  const Routers = routes.map((item, index) => {
    return (
      <Route
        key={index}
        path={item.path}
        exact
        render={(props) => {
          const token = localStorage.getItem(TOKEN) || null;
          if (token) {
            return <item.component {...props} />;
          } else {
            let obj = {
              path: item.path,
              url: window.location.href
            }
            localStorage.setItem(BACK_URL, JSON.stringify(obj))
            authorize(item.path)
            return ''
            // return <AuthPage {...props} back={`${item.path === '/' || item.path === '/auth' ? 'auth' : 'other'}`} path={item.path} />;
          }
        }}
      />
    );
  });
  return (
    <Router history={history}>
      <Switch>
        {Routers}
        <Route path={'/login'} component={LoginPage} />
        <Route path={'/auth'} component={AuthPage} back="auth" />
        <Route path={'/registrationAgreement'} component={RegistrationAgreementPage} />
        <Route path={'/privacyPolicy'} component={PrivacyPolicyPage} />
        <Route component={NotFund} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
