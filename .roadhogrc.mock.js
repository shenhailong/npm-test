/*
 * @Author: gaojiudong
 * @Date: 2020-04-13 14:57:19
 * @LastEditTime: 2020-04-13 14:57:32
 * @LastEditors: gaojiudong
 * @Description: 
 * @FilePath: /medical/.roadhogrc.mock.js
 * @jt
 */
import fs from "fs";
import path from "path";

const mock = {};

fs.readdirSync(path.join(__dirname + "/mock")).forEach((file) => {
  if (file.match(/\.js$/)) {
    Object.assign(mock, require("./mock/" + file));
  }
});

export default mock;
