/**
* @Author : Dragon
* @Date : 2020-06-1 18:01:08
* @LastEditTime : 2020-06-8 18:20:48
* @LastEditors : Dragon
* @Description : 个人中心
* @FilePath : /medical/src/routes/User/Index.js
* @jt
*/

import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Helmet } from 'react-helmet';
import { consultationPage, visitPage } from '@/utils/njPageUrl';
import { ResponseSuccess } from '@/constants/response';
import { Toast } from 'antd-mobile'

import classes from './index.less';
import HeaderTopImg from '@/assets/resources/user/bg_top.png';
import AvatarMan from '@/assets/resources/user/active_man.png';
import AvatarWoMan from '@/assets/resources/user/active_woman.png';
import MALE from '@/assets/resources/peoplegl/male.png';
import WOMAN from '@/assets/resources/peoplegl/woman.png';
import rightBtn from '@/assets/resources/user/rightBtn.png';
import addIcon from '@/assets/resources/user/add_icon.png';
import MyWy from '@/assets/resources/user/my_wy.png';
import MySf from '@/assets/resources/user/my_sf.png';
import ICON2 from '@/assets/resources/user/icon2.png';
import ICON3 from '@/assets/resources/user/icon3.png';
import RIGHT from '@/assets/resources/user/right.png';
const UserPage = (props) => {
  const { dispatch } = props;

  const [hasPeople, setHasPeople] = useState(false)//是否有咨询人
  const [info, setInfo] = useState({})// 用户信息
  const [consultationUrl, setConsultationUrl] = useState() // 用药咨询页面
  const [visitUrl, setVisitUrl] = useState() // 随访记录页面

  //查询是否已添加咨询人
  useEffect(() => {
    dispatch({
      type: 'user/getPeopleGL',
      payload: {
        memberId: localStorage.getItem('memberId')
      }
    }).then(res=>{
      console.log('根据memberId查询咨询人', res)
      if(res.data.hasOwnProperty('data')){
        setHasPeople(true)
        setInfo(res.data.data)
      }
    })

    dispatch({
      type: 'user/getHospitalId'
    }).then(res=>{
      if(res.data.code === ResponseSuccess){
        setConsultationUrl(`${consultationPage}${res.data.data}`)
        setVisitUrl(`${visitPage}${res.data.data}`)
      }
    })
  }, []);

  //根据身份证获取年龄
  const getAge = (idCard) => {
    idCard = idCard + ''
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
    if (idCard.substring(10, 12) < month || idCard.substring(10, 12) === month && idCard.substring(12, 14) <= day) {
      age++;
    }
    return age
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>个人中心</title>
      </Helmet>
      <div className={classes.page}>
        <div className={classes.header}>
          <img alt='headertopimg' className={classes.headerbg} src={HeaderTopImg}></img>
          { hasPeople ? (
            <Link to='/edit/people'>
              <div className={classes.infoBox}>
                { info.gender === 1 ? (<img alt='avatarman' className={classes.avatar} src={AvatarMan}></img>) : ''}
                { info.gender === 2 ? (<img alt='avatarwoman' className={classes.avatar} src={AvatarWoMan}></img>) : ''}
                <div className={classes.infoBoxRight}>
                  <div className={classes.nickname}>{info.patientName}</div>
                  <div className={classes.box}>
                    <div className={classes.age}>{getAge(info.idCardNo)}岁</div>
                    { info.gender === 1 ? (
                      <div className={classes.genderMan}>
                        <img alt='male' className={classes.genderImg} src={MALE}></img>
                        <div className={classes.genderText}>男</div>
                      </div>
                    ) : ''}
                    { info.gender === 2 ? (
                      <div className={classes.genderWoman}>
                        <img alt='woman' className={classes.genderImg} src={WOMAN}></img>
                        <div className={classes.genderText}>女</div>
                      </div>
                    ) : ''}
                  </div>
                </div>
                <img alt='rightben' className={classes.rightBtn} src={rightBtn}></img>
              </div>
            </Link>
          ) : (
            <Link to='/create/people'>
              <div className={classes.addBox}>
                <div className={classes.card}>
                  <img alt='addicon' className={classes.addIcon} src={addIcon}></img>
                  <div className={classes.addText}>添加咨询人</div>
                </div>
              </div>
            </Link>
          ) }
          <div className={classes.btnBox}>
            <div className={classes.btnItem} onClick={()=>{
              if(hasPeople){
                window.location.href = consultationUrl
              }else{
                Toast.fail('请先创建咨询人', 1)
              }
            }}>
              <img alt='mywy' className={classes.btnIcon} src={MyWy}></img>
              <div className={classes.btnText}>我的问药</div>
            </div>
            <div className={classes.btnItem} onClick={()=>{
              if(hasPeople){
                window.location.href = visitUrl
              }else{
                Toast.fail('请先创建咨询人', 1)
              }
            }}>
              <img alt='mysf' className={classes.btnIcon} src={MySf}></img>
              <div className={classes.btnText}>我的随访</div>
            </div>
          </div>
        </div>
        <div className={classes.listBox}>
          <Link to='/askys'>
            <div className={classes.listItem}>
              <div className={classes.itemLeft}>
                <img alt='icon2' className={classes.icon} src={ICON2}></img>
                <div className={classes.text}>常问药师</div>
              </div>
              <img alt='right' className={classes.itemRight} src={RIGHT}></img>
            </div>
          </Link>
          <Link to='/about'>
            <div className={classes.listItem}>
              <div className={classes.itemLeft}>
                <img alt='icon3' className={classes.icon} src={ICON3}></img>
                <div className={classes.text}>联系我们</div>
              </div>
              <img alt='right' className={classes.itemRight} src={RIGHT}></img>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default connect()(UserPage);
