/*
 * @Author: Dragon
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2020-08-21 15:03:19
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /chronic/src/index.js
 * @jt
 */
import dva from 'dva';
import createLoading from 'dva-loading';
//import vconsole from 'vconsole'
import './styles/reset.css';
import './styles/components.css';
import './styles/transition.css';
import './styles/common.less';
import './styles/button.less';
// import { createBrowserHistory as createHistory } from "history";
import './utils/rem'//rem适配
import './index.css';
// import {wx} from "./utils/wxCommon"
// 1. Initialize
// new vconsole();
const app = dva({
  // history: createHistory()
});

// 2. Plugins
// app.use({});
app.use(createLoading());
// 3. Model
// app.model(require('./models/example').default);
require('./models').default.forEach(item => app.model(item.default));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
