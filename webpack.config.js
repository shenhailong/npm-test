/*
 * @Author: gaojiudong
 * @Date: 2020-04-17 16:17:17
 * @LastEditTime: 2020-08-21 14:55:49
 * @LastEditors: Dragon
 * @Description: 
 * @FilePath: /medical/webpack.config.js
 * @jt
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (webpackConfig, env) => {
  // 别名配置
  // webpackConfig.resolve.alias = {
  //   "@": `${__dirname}/src`,
  // };
  if (process.env.API_ENV === 'analyz') {
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }
  return webpackConfig;
};
