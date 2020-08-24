/*
 * @Description: 
 * @Version: 1.0.0
 * @Author: Dragon
 * @Date: 2020-08-05 12:37:19
 * @LastEditors: Dragon
 * @LastEditTime: 2020-08-05 12:55:12
 */
/**
* @Author : Dragon
* @Date : 2020-06-1 18:01:08
* @LastEditTime : 2020-06-10 18:20:48
* @LastEditors : Dragon
* @Description : RadioGroup
* @FilePath : /medical/src/components/RadioGroup.js
* @jt
*/

import React from 'react';
import { connect } from 'dva';
import classes from './Radio.less';

const RadioGroup = (props) => {
  const { children, active, onChange} = props;

  const handleActiveChange = value => {
    onChange(value)
  }
  return (
    <div className={classes.radio_group}>
      {
        React.Children.map(children, child => {
          let isActive = active === child.props.value   
          return React.cloneElement(child, {
            label: child.props.children,
            value: child.props.value,
            active: isActive,
            onClick: handleActiveChange
          })
        })
      }
    </div>
  );
};

export default connect()(RadioGroup);
