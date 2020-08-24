/*
 * @Author: gaojiudong
 * @Date: 2020-04-13 16:18:32
 * @LastEditTime: 2020-08-21 14:49:18
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /medical/.webpackrc.js
 * @jt
 */
const path = require("path");
const pxtorem = require("postcss-pxtorem");
const pxtorem2 = _interopRequireDefault(pxtorem).default;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
export default {
  entry: "./src/index.js",
  // devtool: "eval-source-map",
  hash: true,
  html: {
    template: "./src/index.ejs",
  },
  define: {
    'process.env.API_ENV': process.env.API_ENV,
  },
  theme: "./src/theme-config.js",
  env: {
    development: {
      extraBabelPlugins: [
        [
          "import",
          { style: "css", libraryName: "antd-mobile", libraryDirectory: "lib" },
        ],
      ],
      publicPath: "/",
      extraPostCSSPlugins: [pxtorem2({ rootValue: 32, propWhiteList: [] })],
      proxy: {
        "/member": {
          target: "http://test.api.yoai.com/",
          changeOrigin: true,
        },
        "/enquiry": {
          target: "http://test.api.yoai.com/",
          changeOrigin: true,
        },
        "/prescription": {
          target: "http://test.api.yoai.com/",
          changeOrigin: true,
        },
        "/consultation": {
          target: "http://test.api.yoai.com/",
          changeOrigin: true,
        },
        "/order": {
          target: "http://test.api.yoai.com/",
          changeOrigin: true,
        },
        "/App": {
          target: "http://test.yoaiclinic.yoai.com/",
          changeOrigin: true,
        },
        "/v1": {
          target: "http://test.mtmn.simceredx.com:9005/",
          changeOrigin: true
        },
        "/consultation": {
          target: "http://test.api.yoai.com/",
          changeOrigin: true
        }
      },
      alias: {
        "@": path.resolve("src"),
      },
    },
    production: {
      extraBabelPlugins: [
        [
          "import",
          { style: "css", libraryName: "antd-mobile", libraryDirectory: "lib" },
        ],
      ],
      alias: {
        "@": path.resolve("src"),
      },
      publicPath:  '',
      extraPostCSSPlugins: [pxtorem2({ rootValue: 32, propWhiteList: [] })],
    },
  },
};
