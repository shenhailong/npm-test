import React, { useState, useImperativeHandle } from 'react'
import { connect } from 'dva';

import classes from '../create/index.less';
import SELECT from '@/assets/resources/peoplegl/select.png';

const RadioGroup = (props) => {
  const { zref, group } = props;
  const [GROUP] = useState(group)//组内容
  const [select, setSelect] = useState(null)//选中项

  //暴露方法和属性
  useImperativeHandle(zref, ()=>({
    select,
    setGender: (val) => {
      setSelect(val)
    }
  }))

  return (
    <div className={classes.radioGroup}>
      {
        GROUP.map((e, i) => {
          return (
            <div key={i} className={classes.radioBox} onClick={() => {
              setSelect(i)
            }}>
              <div className={classes.radio} style={{ border: e.value === select ? '0' : '' }}>
                {e.value === select ? (<img alt='select' className={classes.select} src={SELECT}></img>) : ''}
              </div>
              <div className={classes.radioText} style={{ color: e.value === select ? '' : '#D3D3D3' }}>{e.label}</div>
            </div>
          )
        })
      }
    </div>
  );
};

export default connect()(RadioGroup);