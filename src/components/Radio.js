/**
* @Author : Dragon
* @Date : 2020-06-1 18:01:08
* @LastEditTime : 2020-06-10 18:20:48
* @LastEditors : Dragon
* @Description : 有爱诊所
* @FilePath : /medical/src/components/Radio.js
* @jt
*/

import React from 'react';
import { connect } from 'dva';
import classes from './Radio.less';

const Radio = (props) => {
  const { onClick, value, label, active } = props;
  return (
    <div className={classes.radio_wrap} onClick={() => { onClick(value) }}>
      <div className={`${classes.radio_not_select} ${active === true ? classes.radio_select : ''} `}></div>
      <div className={classes.radio_label}>{label}</div>
    </div>
  );
};

export default connect()(Radio);
