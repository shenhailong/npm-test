/*
 * @Author: gaojiudong
 * @Date: 2020-05-25 13:50:37
 * @LastEditTime: 2020-08-05 12:55:02
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /medical/src/components/AlertModal.js
 * @jt
 */

import React from 'react';
import dva, { connect } from 'dva';
import classes from './Modal.css';

// const AlertModal = (props) => {
//   //   if (!props.visible) {
//   //     return null;
//   //   }
//   return (
//     <div className={classes.container} onClick={props.onClose}>
//       <div>
//         <div>您当前有正在进行中的咨询订单，是否前往</div>
//         <div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default connect()(AlertModal);

const AlertModal = function () {
  let modal = document.createElement('div');
  modal.style.position = 'fixed';
  modal.style.left = 0;
  modal.style.right = 0;
  modal.style.top = 0;
  modal.style.bottom = 0;
  modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
  modal.style.height = '100vh';
  
  document.body.appendChild(modal);
};

export default AlertModal;
