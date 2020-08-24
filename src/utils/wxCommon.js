/*
 * @Author: Dragon
 * @Date: 2020-04-13 16:44:04
 * @LastEditTime: 2020-08-21 15:05:28
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /medical/src/utils/wxCommon.js
 * @jt
 */
/*<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>*/

const wx = window.wx || {};

/**
 * 初始化配置
 */

function initConfig(data, successCallback, errorCallback) {
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: data.appId, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.nonceStr, // 必填，生成签名的随机串
    signature: data.signature, // 必填，签名
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareQZone',
      'scanQRCode',
      'chooseImage'
    ], // 必填，需要使用的JS接口列表
  });

  wx.ready(function () {
    successCallback();
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  });
  wx.error(function (res) {
    errorCallback();
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
}

/**
 * 判断当前接口是否支持
 */
function checkJsApi(data, callback) {
  let arr = [];
  if (typeof data === 'string') {
    arr.push(data);
  } else {
    arr.push(data);
  }
  wx.checkJsApi({
    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function (res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    },
  });
}

export function chooseImage() {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      console.log(res, '9999999');
      // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
    },
  });
}

// var count = 0;
// let [configId, openAllChannel] = [null, null];
// function initWeiXinConfig(data) {
//   window.shareParamMap = JSON.parse(data.paramMap);
//   if (window["share_targetUrl"]) {
//     data.url = window.share_targetUrl;
//   }

//   //微信分享设置
//   wx.config({
//     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//     appId: data.appId, // 必填，公众号的唯一标识
//     timestamp: data.timestamp, // 必填，生成签名的时间戳
//     nonceStr: data.nonceStr, // 必填，生成签名的随机串
//     signature: data.signature, // 必填，签名，见附录1
//     jsApiList: [
//       "onMenuShareTimeline",
//       "onMenuShareAppMessage",
//       "onMenuShareQQ",
//       "onMenuShareQZone",
//       "scanQRCode",
//     ],
//   });
//   wx.ready(() => {
//     var id = configId instanceof Array ? configId[0] : configId;
//     reconfigShare.call(this, id, shareAjaxSuccess);
//   });
//   wx.error(function (res) {
//     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug
//     // 模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
//     if (count < 3) {
//       doWeiXinConfig.call(this);
//     }
//     count = count + 1;
//   });
// }

// function configShare(data) {
//   wx.onMenuShareTimeline({
//     title: data.title, // 分享标题
//     link: data.url, // 分享链接
//     imgUrl: data.urlPic, // 分享图标
//     success: () => {
//       shareSuccess.call(this, data.url, data.urlLandingPage, data.shareKey);
//     },
//     cancel: () => {},
//   });
//   wx.onMenuShareAppMessage({
//     title: data.title, // 分享标题
//     desc: data.description, // 分享描述
//     link: data.url, // 分享链接
//     imgUrl: data.urlPic, // 分享图标
//     type: data.type, // 分享类型,music、video或link，不填默认为link
//     dataUrl: data.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
//     success: () => {
//       shareSuccess.call(this, data.url, data.urlLandingPage, data.shareKey);
//     },
//     cancel: () => {},
//   });
//   wx.onMenuShareQQ({
//     title: data.title, // 分享标题
//     desc: data.description, // 分享描述
//     link: data.url, // 分享链接
//     imgUrl: data.urlPic, // 分享图标
//     success: () => {
//       shareSuccess.call(this, data.url, data.urlLandingPage, data.shareKey);
//     },
//     cancel: () => {},
//   });
//   wx.onMenuShareQZone({
//     title: data.title, // 分享标题
//     desc: data.description, // 分享描述
//     link: data.url, // 分享链接
//     imgUrl: data.urlPic, // 分享图标
//     success: () => {
//       shareSuccess.call(this, data.url, data.urlLandingPage, data.shareKey);
//     },
//     cancel: () => {},
//   });
// }

// function reconfigShare(id, callback) {
//   if (window.shareParamMap) {
//     window.shareConfigId = id;
//     shareAjaxSuccess = callback;
//     var data = window.shareParamMap[id];
//     if (window["share_targetUrl"]) {
//       data.url = window.share_targetUrl;
//     }
//     configShare.call(this, data);
//   }
// }

// function weixinConfig(id, channel) {
//   if (id) {
//     configId = id;
//     openAllChannel = channel;
//   }
//   var ua = navigator.userAgent.toLowerCase();
//   if (ua.match(/MicroMessenger/i) == "micromessenger") {
//     doWeiXinConfig.call(this, configId, openAllChannel);
//   } else {
//     if (openAllChannel) {
//       $("#share").addClass("-mob-share-open");
//     } else {
//       $("#share").addClass("-mob-share-weixin");
//     }
//   }
// }

// function doWeiXinConfig(configId) {
//   this.$http
//     .post(this.$common.BASE_URL + "/manage/share/get_config", {
//       configId: configId,
//       url: encodeURIComponent(location.href.split("#")[0]),
//     })
//     .then((res) => {
//       if (res.data.code == 0) {
//         initWeiXinConfig.call(this, res.data.data);
//       }
//     })
//     .catch((res) => {
//       // this.$toast("向服务器请求微信参数配置失败，请刷新页面再分享！");
//     });
// }
// function autoRefreshPage() {
//   if (window.localStorage) {
//     var localPath = location.pathname.replace(/\//g, "_");
//     var countName = "count_" + localPath;
//     var lastRefreshTimeName = "lastRefreshTime_" + localPath;
//     if (!localStorage[countName]) {
//       localStorage[countName] = 1;
//     } else {
//       localStorage[countName]++;
//     }
//     //60秒内再刷视为连续刷，否则无效。目前每个页面都有分享，所以得分别做防刷。
//     var nowTime = new Date().getTime();

//     if (localStorage[lastRefreshTimeName]) {
//       var inteval = nowTime - localStorage[lastRefreshTimeName];
//       if (inteval > 60 * 1000) {
//         localStorage.autoRefreshCount = 0;
//       }
//     }
//     localStorage[lastRefreshTimeName] = nowTime;
//     if (localStorage[countName] > 3) {
//       return false;
//     }
//     location.reload();
//     return true;
//   } else {
//     return false;
//   }
// }
// function shareSuccess(url, landing_page, shareKey) {
//   this.$http
//     .post(this.$common.BASE_URL + "/manage/share/normal_page_success", {
//       shareConfigId: window.shareConfigId,
//       targetUrl: encodeURIComponent(url),
//       sourceUrl: encodeURIComponent(window.location.href) || "",
//       shareKey: shareKey || "",
//     })
//     .then((res) => {
//       if (res.data.code == 0) {
//         if (window.orderListSwitch) {
//           shareAjaxSuccess.call(this, landing_page, bnSwitch);
//         } else {
//           shareAjaxSuccess.call(this, landing_page);
//         }
//       }
//     })
//     .catch((res) => {
//       // this.$toast("向服务器请求微信参数配置失败，请刷新页面再分享！");
//     });
// }
// function shareAjaxSuccess(landingPage, callback) {
//   if (callback) {
//     callback.call(this, landingPage);
//   } else {
//     if (landingPage) {
//       location.href = landingPage;
//     }
//   }
// }

// module.exports = {
//   weixinConfig,
//   wx,
// };
