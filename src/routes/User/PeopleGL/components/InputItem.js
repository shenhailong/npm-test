import React, { useState, useImperativeHandle } from 'react'
import { connect } from 'dva';

import classes from '../create/index.less';
import CLOSE from '@/assets/resources/peoplegl/close.png';

const InputItem = (props) => {
  const { zref, validate, title, placeholder, type, maxlength, tips, writeIn } = props;
  const [isEmpty, setIsEmptyValue] = useState(true)//是否显示提示文案
  const [TEXT, setTextValue] = useState('')//内容

  //身份证号码校验
  /* 
    * 15位和18位身份证号码的正则表达式
    * 身份证15位编码规则：dddddd yymmdd xx p
    * dddddd：6位地区编码
    * yymmdd: 出生年(两位年)月日，如：910215
    * xx: 顺序编码，系统产生，无法确定
    * p: 性别，奇数为男，偶数为女
    * 身份证18位编码规则：dddddd yyyymmdd xxx y
    * dddddd：6位地区编码
    * yyyymmdd: 出生年(四位年)月日，如：19910215
    * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
    * y: 校验码，该位数值可通过前17位计算获得
    * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
    * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
    * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
    * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
    * i为身份证号码1…17 位; Y_P为校验码Y所在校验码数组位置
  */
  const validateIdCard = (IdCard) => {
    let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if(regIdCard.test(IdCard)){
      if(IdCard.length === 18){
        var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]//将前17位加权因子保存在数组里
        var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]//这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
        for(var i = 0;i < 17;i++){
          idCardWiSum += IdCard.substring(i, i + 1) * idCardWi[i];
        }
        var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
        var idCardLast = IdCard.substring(17);//得到最后一位身份证号码
        //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
        if(idCardMod === 2){
          if(idCardLast === 'X' || idCardLast === 'x'){
            //通过验证
            setIsEmptyValue(true)
            return true
          }else{
            setIsEmptyValue(false)
            return false
          }
        }else{
          //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if(idCardLast != idCardY[idCardMod]){
            setIsEmptyValue(false)
            return false
          }else{
            setIsEmptyValue(true)
            return true
          }
        }
      }
    }else{
      setIsEmptyValue(false)
      return false
    }
  }

  //手机号校验
  const validatePhone = (phone) => {
    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
      setIsEmptyValue(false)
      return false
    }else{
      setIsEmptyValue(true)
      return true
    }
  }

  //失去焦点监听
  const onBlur = (e) => {
    let val = e.target.value;
    //验证
    if(validate === 'idcard'){
      //如果校验正确，自动填写
      if(validateIdCard(val)){
        writeIn(val)
      }
      return validateIdCard(val)
    }else if(validate === 'phone'){
      return validatePhone(val)
    }else if(validate === 'required'){
      if(val.length > 0){
        setIsEmptyValue(true)
        return true
      }else{
        setIsEmptyValue(false)
        return false
      }
    }else{
      setIsEmptyValue(true)
      return true
    }
  }

  //输入框内容变动监听
  const onChange = (e) => {
    let val = e.target.value;
    //截取
    setTextValue(val.slice(0, maxlength))
    if (val.length > 0) {
      setIsEmptyValue(true)
    }
  }

  //重置输入
  const resetInput = () => {
    setIsEmptyValue(false)
    setTextValue('')
  }

  //暴露方法和属性
  useImperativeHandle(zref, ()=>({
    onBlur: () => {
      return onBlur({target: {value: TEXT}})
    },
    idCardValidate: () => {
      return validateIdCard(TEXT)
    },
    TEXT
  }))

  return (
    <div className={classes.item}>
      <div className={classes.itemLeft}>{title}</div>
      <div className={classes.itemRight}>
        <input onBlur={onBlur} onChange={onChange} value={TEXT} className={classes.input}
          placeholder={placeholder} type={type}></input>
        {TEXT.length > 0 ? (<img alt='close' className={classes.close} src={CLOSE} onClick={resetInput}></img>) : ''}
      </div>
      {isEmpty === false ? (<div className={classes.tag}>{tips}</div>) : ''}
    </div>
  )
}
export default connect()(InputItem);