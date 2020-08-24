import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';

import classes from './index.less';
import ICON1 from '@/assets/resources/about/icon1.png';
import ICON2 from '@/assets/resources/about/icon2.png';

const AboutPage = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>联系我们</title>
      </Helmet>
      <div className={classes.page}>
        <div className={classes.listBox}>
          <div className={classes.listItem}>
            <div className={classes.itemLeft}>
              <img alt='icon' className={classes.icon} src={ICON1}></img>
            </div>
            <div className={classes.itemRight}>
              <div className={classes.title}>客服热线</div>
              <a href='tel:400-919-2020' className={classes.subTitle}>400-919-2020</a>
            </div>
          </div>
          <div className={classes.listItem}>
            <div className={classes.itemLeft}>
              <img alt='icon' className={classes.icon} src={ICON2}></img>
            </div>
            <div className={classes.itemRight}>
              <div className={classes.title}>服务时间</div>
              <div className={classes.time}>8:00-22:00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect()(AboutPage);