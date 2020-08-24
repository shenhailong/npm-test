import React, { useState, useRef } from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import { routerRedux } from 'dva/router';

import classes from './index.less';
import RIGHT from '@/assets/resources/user/right.png';
import tagClose from '@/assets/resources/peoplegl/tagClose.png';
import InputItem from '../components/InputItem'
import RadioGroup from '../components/RadioGroup'
import { DatePicker, Toast } from 'antd-mobile'

const CreatePeople = (props) => {
  const { dispatch } = props;

  const Name = useRef()//姓名
  const IdCard = useRef()//身份证号
  const Gender = useRef()//性别
  const Phone = useRef()//联系电话

  const [isSelectGender, setSelectGender] = useState(null)//性别是否选择
  const [birthday, setBirthdayValue] = useState('')//出生日期
  const [isShowBirthday, setIsShowBirthday] = useState(true)//出生日期提示是否显示
  const [isClick, setIsClick] = useState(false)//底部按钮是否可以点击
  const [isShowTS, setIsShowTS] = useState(false)//临床诊断提示

  const [tagArray, setTagArray] = useState([])//临床诊断
  const [searchList, setSearchList] = useState([])//搜索列表
  const [LCTEXT, setLCTEXT] = useState('')

  //临床诊断输入监听
  const inpTagChange = (e) => {
    e.persist()
    console.log('输入', e.target.value)
    setLCTEXT(e.target.value)
    if(e.target.value !== ''){
      dispatch({
        type: 'user/getDiagnosisList',
        payload: {
          condition: e.target.value
        }
      }).then(res=>{
        console.log('查询返回', res)
        if(res.data.result.length > 0){
          setSearchList(res.data.result)
        }
      })
    }else{
      setSearchList([])
    }
  }

  //选择临床诊断
  const selectLCZD = (index) => {
    if(tagArray.length < 5){
      setIsShowTS(false)
      setLCTEXT('')
      setSearchList([])
      //判断是否已经选择了
      if(tagArray.length === 0){
        //首次
        setTagArray(tagArray.concat(searchList[index]))
      }else{
        let count = tagArray.filter(v=>v.id === searchList[index].id)
        if(count.length <= 0){
          setTagArray(tagArray.concat(searchList[index]))
        }else{
          Toast.fail('不可重复选择', 1)
        }
      }
    }
  }

  //删除标签
  const DelTag = (index) => {
    let arr = JSON.parse(JSON.stringify(tagArray))
    arr.splice(index, 1)
    setTagArray(arr)
  }

  //保存提交
  const saveSubmit = () => {
    //监听
    monitorAll()
    //临床诊断
    let diagnosisList = tagArray.map(v=>{
      return {
        id: v.id,
        name: v.name
      }
    })
    console.log('数据打印检查',
      {
        patientName: Name.current.TEXT, //姓名
        idCardNo: IdCard.current.TEXT, //身份证号码
        idCardType: 1, //证件类型
        gender: Gender.current.select === 0 ? 2 : Gender.current.select, //性别
        timeBirthday: new Date(birthday).getTime(), //出生年月
        phone: Phone.current.TEXT, //手机号
        diagnosisList: tagArray.map(v=>{
          return {
            id: v.id,
            name: v.name
          }
        })//临床诊断
      }
    )
    //提交请求
    dispatch({
      type: 'user/createPeopleGL',
      payload: {
        patientName: Name.current.TEXT, //姓名
        idCardNo: IdCard.current.TEXT, //身份证号码
        idCardType: 1, //证件类型
        gender: Gender.current.select === 0 ? 2 : Gender.current.select, //性别
        timeBirthday: new Date(birthday).getTime(), //出生年月
        phone: Phone.current.TEXT, //手机号
        diagnosisList: JSON.stringify(diagnosisList), //临床诊断
        memberId: localStorage.getItem('memberId')
      }
    }).then(res=>{
      console.log('添加返回', res)
      dispatch(
        routerRedux.push({
          pathname: '/user'
        })
      )
    })
  }

  //监听是否全部填写
  const monitorAll = () => {
    //姓名校验
    if(Name.current.onBlur() === false){
      setIsClick(false)
      return
    }
    //身份证号校验
    if(IdCard.current.idCardValidate() === false){
      setIsClick(false)
      return
    }
    //性别校验
    if(isSelectGender == null){
      setSelectGender(false)
      setIsClick(false)
      return
    }
    //出生日期校验
    if(birthday === ''){
      setIsShowBirthday(false)
      setIsClick(false)
      return
    }
    //手机号校验
    if(Phone.current.onBlur() === false){
      setIsClick(false)
      return
    }
    //临床诊断校验
    if(tagArray.length <= 0){
      setIsShowTS(true)
      setIsClick(false)
      return
    }
    //按钮可以点击
    setIsClick(true)
  }

  //性别，生日自动写入
  const autoWriteIn = (e) => {
    // sex 0未知 1男 2女
    if(e.length === 15){
      let sex = (e.substr(14, 1) % 2) || 2
      if(sex === 1){
        Gender.current.setGender(1)
      }else if(sex === 2){
        Gender.current.setGender(0)
      }
      setSelectGender(true)
      setBirthdayValue(`19${e.substr(6, 2)}-${e.substr(8, 2)}-${e.substr(10, 2)}`)
    }
    if(e.length === 18){
      let sex = (e.substr(16, 1) % 2) || 2
      if(sex === 1){
        Gender.current.setGender(1)
      }else if(sex === 2){
        Gender.current.setGender(0)
      }
      setSelectGender(true)
      setBirthdayValue(`${e.substr(6, 4)}-${e.substr(10, 2)}-${e.substr(12, 2)}`)
    }
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>新增咨询人</title>
      </Helmet>
      <div className={classes.page} onMouseUp={monitorAll}>
        <div className={classes.itemTop}>
          <InputItem zref={Name} title='姓名' validate='required' placeholder='请输入姓名' tips='请输入姓名' type='text' maxlength='10'></InputItem>
          <InputItem zref={IdCard} title='身份证号码' writeIn={autoWriteIn} validate='idcard' placeholder='请输入身份证号码' tips='请输入正确的身份证号' type='text' maxlength='18'></InputItem>
          <div className={classes.item}>
            <div className={classes.itemLeft}>性别</div>
            <div className={classes.itemRight}>
              <RadioGroup zref={Gender} group={[{label: '女', value: 0}, {label: '男', value: 1}]}></RadioGroup>
            </div>
            { isSelectGender === false ? (<div className={classes.tag}>请选择性别</div>) : ''}
          </div>
          <div className={classes.item}>
            <div className={classes.itemLeft}>出生日期</div>
            <DatePicker mode='date' onChange={(date)=>{
              let time = new Date(date)
              let timeValue = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`
              setBirthdayValue(timeValue)
              setIsShowBirthday(true)
            }}>
              <div className={classes.itemRight} style={{width: '100%'}}>
                { birthday === '' ? (<div className={classes.selectBirthday}>请选择</div>) : (<div>{birthday}</div>)}
                <img alt='right' className={classes.selectBirthdayRight} src={RIGHT}></img>
              </div>
            </DatePicker>
            { isShowBirthday === false ? (<div className={classes.tag}>请选择正确的出生日期</div>) : ''}
          </div>
          <InputItem zref={Phone} validate='phone'  title='联系电话' placeholder='请填写方便接听的电话' tips='请填写正确的联系电话' type='number' maxlength='11'></InputItem>
          <div className={classes.item} style={{alignItems: 'flex-start'}}>
            <div className={classes.itemLeft}>临床诊断</div>
            <div className={classes.itemRightS}>
              {
                tagArray.map((v, i)=>{
                  return (
                    <div key={i} className={classes.inpTag}>
                      <div className={classes.tagName}>{v.name}</div>
                      <img alt='close' src={tagClose} className={classes.tagClose} onClick={()=>{DelTag(i)}}></img>
                    </div>
                  )
                })
              }
              { tagArray.length < 5 ? (
                <input className={classes.input} style={{marginBottom: tagArray.length > 0 ? '9px' : ''}} onChange={inpTagChange} value={LCTEXT} placeholder='请输入' type='text'></input>
              ) : ''}
            </div>
            { isShowTS ? (<div className={classes.tag}>请输入临床诊断</div>) : '' }
          </div>
          <div className={classes.searchList}>
            {
              searchList.map((v, i)=>{
                return (<div key={i} className={classes.searchListItem} onClick={()=>{selectLCZD(i)}}>{v.name}</div>)
              })
            }
          </div>
        </div>
        <div className={classes.itemBottom}>
          <div className={classes.buttonBox}>
            { isClick ? (<div className={classes.saveBtn} onClick={saveSubmit}>保存</div>) : (<div className={classes.saveBtnNo}>保存</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect()(CreatePeople);