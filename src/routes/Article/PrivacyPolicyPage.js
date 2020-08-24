/*
 * @Author: Dragon
 * @Date: 2020-05-06 15:52:10
 * @LastEditTime: 2020-08-10 11:03:12
 * @LastEditors: Dragon
 * @Description: 法律声明及隐私权政策
 * @FilePath: /medical/src/routes/Article/PrivacyPolicyPage.js
 * @jt
 */
import React from 'react';
import { connect } from 'dva';
import { PRIVACY_POLICY } from '@/constants/article'

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

const PrivacyPolicyPage = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>法律声明及隐私权政策</h2>
      <section style={styles.article}>
        <div>
          {
            PRIVACY_POLICY.map((items, index) => {
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

export default connect()(PrivacyPolicyPage);
