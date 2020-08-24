import React from 'react';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';

import classes from './index.less';
import addIcon from '@/assets/resources/peoplegl/add.png';
import RIGHT from '@/assets/resources/user/right.png';
import MALE from '@/assets/resources/peoplegl/male.png';
import WOMAN from '@/assets/resources/peoplegl/woman.png';

const PeopleGL = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>咨询人管理</title>
      </Helmet>
      <div className={classes.page}>
        <div className={classes.item}>
          <div className={classes.titleBox}>
            <img alt='addicon' className={classes.addIcon} src={addIcon}></img>
            <div className={classes.title}>添加咨询人</div>
          </div>
          <div className={classes.subtitle}>最多可添加5位</div>
        </div>
        <div className={classes.peopleItem}>
          <div className={classes.left}>
            <div className={classes.leftTop}>
              <div className={classes.name}>张起灵</div>
              <div className={classes.tagMan}>
                <img alt='male' className={classes.tagimg} src={MALE}></img>
                <div className={classes.txt}>男</div>
              </div>
            </div>
            <div className={classes.idCard}>13073119******3418</div>
          </div>
          <img alt='right' className={classes.right} src={RIGHT}></img>
        </div>
        <div className={classes.peopleItem}>
          <div className={classes.left}>
            <div className={classes.leftTop}>
              <div className={classes.name}>雪莉杨</div>
              <div className={classes.tagWoMan}>
                <img alt='woman' className={classes.tagimg} src={WOMAN}></img>
                <div className={classes.txt}>女</div>
              </div>
            </div>
            <div className={classes.idCard}>13073119******3418</div>
          </div>
          <img alt='right' className={classes.right} src={RIGHT}></img>
        </div>
      </div>
    </div>
  )
}

export default connect()(PeopleGL);