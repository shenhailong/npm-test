import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';

import { routerRedux } from 'dva/router';
import classes from './index.less';
import SELECT from '@/assets/resources/peoplegl/select.png';

const EditPeople = (props) => {
  const { dispatch } = props;

  const [info, setInfo] = useState({})//用户信息
  const [diagnosis, setDiagnosis] = useState([])//临床诊断

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
        let jsonArray = JSON.parse(res.data.data.diagnosisList)
        setDiagnosis(jsonArray)
        setInfo(res.data.data)
      }else{
        dispatch(
          routerRedux.push({
            pathname: '/user'
          })
        )
      }
    })
  }, []);

  //根据身份证号获取出生日期
  const getBirthday = (idCard) => {
    var birthday = '';  
    if(idCard != null && idCard !== ''){  
      if(idCard.length === 15){  
        birthday = '19' + idCard.substr(6, 6);  
      } else if(idCard.length === 18){  
        birthday = idCard.substr(6, 8);  
      }
      birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
    }
    return birthday;
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>查看咨询人</title>
      </Helmet>
      <div className={classes.page}>
        <div className={classes.itemTop}>
          <div className={classes.item}>
            <div className={classes.itemLeft}>姓名</div>
            <div className={classes.itemRight}>
              {info.patientName}
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.itemLeft}>身份证号码</div>
            <div className={classes.itemRight}>
              {info.idCardNo}
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.itemLeft}>性别</div>
            <div className={classes.itemRight}>
              <div className={classes.radioGroup}>
                <div className={classes.radioBox}>
                  <div className={classes.radio} style={{ border: info.gender === 1 ? '0' : '' }}>
                    { info.gender === 1 ? (<img alt='select' className={classes.select} src={SELECT}></img>) : '' }
                  </div>
                  <div className={classes.radioText} style={{ color: info.gender === 1 ? '' : '#D3D3D3' }}>男</div>
                </div>
                <div className={classes.radioBox}>
                  <div className={classes.radio} style={{ border: info.gender === 2 ? '0' : '' }}>
                    { info.gender === 2 ? (<img alt='select' className={classes.select} src={SELECT}></img>) : '' }
                  </div>
                  <div className={classes.radioText} style={{ color: info.gender === 2 ? '' : '#D3D3D3' }}>女</div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.itemLeft}>出生日期</div>
            <div className={classes.itemRight}>
              {getBirthday(info.idCardNo)}
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes.itemLeft}>联系电话</div>
            <div className={classes.itemRight}>
              {info.phone}
            </div>
          </div>
          <div className={classes.item} style={{alignItems: 'flex-start'}}>
            <div className={classes.itemLeft}>临床诊断</div>
            <div className={classes.itemRightS}>
              {
                diagnosis.map((v, i)=>{
                  return (
                    <div key={i}>{ i === diagnosis.length - 1 ? v.name : v.name + '、' }</div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect()(EditPeople);