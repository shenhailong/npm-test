/*
 * @Author: gaojiudong
 * @Date: 2020-05-11 19:05:24
 * @LastEditTime: 2020-05-11 19:26:22
 * @LastEditors: gaojiudong
 * @Description:
 * @FilePath: /medical/src/components/Modal.js
 * @jt
 */
import React from 'react';
import { connect } from 'dva';
import classes from './Modal.css'

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <div className={classes.container} onClick={props.onClose}>
      <img className={classes.img} src={props.source} alt="" />
    </div>
  );
};

export default connect()(Modal);
