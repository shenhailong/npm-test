/*
 * @Author: gaojiudong
 * @Date: 2020-04-15 10:46:26
 * @LastEditTime: 2020-08-05 12:56:02
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /medical/src/routes/404Page.js
 * @jt
 */
import { connect } from 'dva';
const NoFund = () => {
  return <div>404</div>;
};
export default connect()(NoFund);
