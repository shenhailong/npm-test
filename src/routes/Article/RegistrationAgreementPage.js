/*
 * @Author: Dragon
 * @Date: 2020-05-06 15:52:10
 * @LastEditTime: 2020-08-10 11:03:29
 * @LastEditors: Dragon
 * @Description: 用户注册协议
 * @FilePath: /medical/src/routes/Article/InformedConsentPage.js
 * @jt
 */
import React from 'react';
import { connect } from 'dva';
import { REGISTRATION_AGREEMENT } from '@/constants/article'

const styles = {
  container: {
    padding: 20,
    textAlign: 'left',
    overflowY: 'scroll',
    height: '100vh',
  },
  title: {
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 700,
    fontSize: 16,
  },
  pad: {
    padding: 10,
    textAlign: 'right',
  },
  article: {
    marginBottom: 100,
  },
};
const RegistrationAgreementPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>用户注册协议</h2>
      <section style={styles.article}>
        <div>
          {
            REGISTRATION_AGREEMENT.map((items, index) => {
              return (
                <div key={index}>
                  <h3 style={styles.title}>{items.title}</h3>
                  {
                    items.children.map((item, ind) => {
                      return (
                        <p key={ind}>{item}</p>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </section>
    </div>
  );
};

export default connect()(RegistrationAgreementPage);
