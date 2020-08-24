import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';

import classes from './index.less';
import ICON from '@/assets/resources/askys/icon.png';

const AskYsPage = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>常问药师</title>
      </Helmet>
      <div className={classes.page}>
        <div className={classes.default}>
          <img alt='icon' className={classes.icon} src={ICON}></img>
          <div className={classes.text}>暂无药师数据</div>
        </div>
      </div>
    </div>
  )
}

export default connect()(AskYsPage);