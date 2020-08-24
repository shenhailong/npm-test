/*
 * @Author: Dragon
 * @Date: 2020-04-20 16:10:27
 * @LastEditTime: 2020-08-21 15:05:45
 * @LastEditors: Dragon
 * @Description:
 * @FilePath: /medical/src/utils/methods.js
 * @jt
 */
import { Modal } from 'antd-mobile';
import config from '../../package.json'
import request from './request';
/**
 * //通过生日获取年龄
 * @param {Date} bir
 */
export function getAge(bir) {
  const birYear = bir.getFullYear();
  const birMonth = bir.getMonth() + 1;
  const birDay = bir.getDate();

  let d = new Date();
  let nowYear = d.getFullYear();
  let nowMonth = d.getMonth() + 1; //记得加1
  let nowDay = d.getDate();
  let returnAge;
  d = new Date(birYear, birMonth - 1, birDay);
  if (
    d.getFullYear() === birYear &&
    d.getMonth() + 1 === birMonth &&
    d.getDate() === birDay
  ) {
    if (nowYear === birYear) {
      returnAge = 0;
    } else {
      let ageDiff = nowYear - birYear;
      if (ageDiff > 0) {
        if (nowMonth === birMonth) {
          let dayDiff = nowDay - birDay;
          if (dayDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        } else {
          let monthDiff = nowMonth - birMonth; //
          if (monthDiff < 0) {
            returnAge = ageDiff - 1;
          } else {
            returnAge = ageDiff;
          }
        }
      } else {
        return '出生日期晚于今天，数据有误'; //返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge;
  } else {
    return '输入的日期格式错误！';
  }
}

/**
@param time 时间戳
@param strConnection 时间链连接字符串
@param type 时间格式类型
*/
export function timeFormat(time, strConnection, type) {
  if (!time) return 0;
  if (!strConnection) strConnection = '-';
  if (typeof time === 'string') return time;
  const date = new Date(time);
  let [year, month, day, hours, minutes, seconds] = [];
  year = date.getFullYear();
  //月
  month = date.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  //天
  day = date.getDate();
  day = day < 10 ? '0' + day : day;
  //时
  hours = date.getHours();
  hours = hours < 10 ? '0' + hours : hours;
  //分
  minutes = date.getMinutes();
  minutes = minutes < 10 ? '0' + minutes : minutes;
  //秒
  seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds : seconds;

  //如果是当天就显示时分秒
  const now = new Date();
  let [nowY, nowM, nowD] = [];
  nowY = now.getFullYear();
  nowM = now.getMonth() + 1;
  nowM = nowM < 10 ? '0' + nowM : nowM;
  nowD = now.getDate();
  nowD = nowD < 10 ? '0' + nowD : nowD;
  if (type === 'H:M:S') {
    if (nowY === year && nowM === month && nowD === day) {
      return hours + ':' + minutes + ':' + seconds;
    }
  }
  //如果是日期
  if (type === 'Y-M-D') {
    return year + strConnection + month + strConnection + day;
  }
  if (type === 'Y-M') {
    return year + strConnection + month;
  }
  //如果是时间
  if (type === 'Y-M-D H:M') {
    return (
      year +
      strConnection +
      month +
      strConnection +
      day +
      ' ' +
      hours +
      ':' +
      minutes
    );
  }
  //默认是日期时间
  return (
    year +
    strConnection +
    month +
    strConnection +
    day +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds
  );
}
/**
 *
 * @param {*} file 文件
 * @param {*} callback  url地址
 */
export function getFileToBase64(file, callback) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    console.log(e, 'eee');
    const square = 240;
    let imageObj = new Image();
    imageObj.src = e.target.result;
    // imageObj.οnlοad = function () {
    const canvas = document.createElement('canvas');
    canvas.width = square;
    canvas.height = square;
    const context = canvas.getContext('2d');
    context.drawImage(imageObj, 0, 0, 240, 240);
    let data = canvas.toDataURL('image/jpeg', 0.9);
    console.log(data, 'data');
    callback && callback(data);
    // };
  };
}
/**
 * dataURL 转成 blob
 * @param dataURL
 * @return blob
 */
function dataURL2blob(dataURL) {
  let binaryString = atob(dataURL.split(',')[1]);
  let arrayBuffer = new ArrayBuffer(binaryString.length);
  let intArray = new Uint8Array(arrayBuffer);
  let mime = dataURL.split(',')[0].match(/:(.*?);/)[1];
  for (let i = 0, j = binaryString.length; i < j; i++) {
    intArray[i] = binaryString.charCodeAt(i);
  }
  let data = [intArray];
  let result;
  try {
    result = new Blob(data, { type: mime });
  } catch (error) {
    console.log(error);
  }
  return result;
}
/**
 * 压缩图片
 * @param {*} re //base64
 * @param {*} obj //option
 * @param {*} callback
 */
function canvasDataURL(re, obj, callback) {
  const img = new Image();
  // img.width = 240;
  // img.height = 240;
  img.onload = function () {
    let that = this;
    let w = that.width / 4,
      h = that.height / 4,
      scale = w / h;
    // w = obj.width || w;
    w = 240;
    h = obj.height || w / scale;
    let quality = 0.1;
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    const anw = document.createAttribute('width');
    anw.nodeValue = w;
    const anh = document.createAttribute('height');
    anh.nodeValue = h;
    canvas.setAttributeNode(anw);
    canvas.setAttributeNode(anh);
    // canvas.clearRect(0, 0, w, h)
    ctx.drawImage(that, 0, 0, w, h);
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality;
    }

    // quality值越小，所绘制出的图像越模糊
    const base64 = canvas.toDataURL('image/jpeg', quality);
    getImgSize(base64.split(',')[1]);
    // 回调函数返回base64的值
    if (base64.split(',')[1]) {
      callback(base64.split(',')[1], 'big', base64);
    } else {
      callback(base64, 'big');
    }
  };
  img.onerror = (err) => {
    Modal.alert('图片太大，请重新上传');
    console.log(err);
  };
  img.src = re;
}

/**
 * base64转Blob
 * @param {*} urlData
 */
function convertBase64UrlToBlob(urlData) {
  Modal.alert(urlData);
  let arr = urlData.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 获取base64大小
 * @param {*} base64url
 */
function getImgSize(base64url) {
  //获取base64图片大小，返回KB数字
  let str = base64url.replace('data:image/jpeg;base64,', ''); //这里根据自己上传图片的格式进行相应修改

  let strLength = str.length;
  let fileLength = parseInt(strLength - (strLength / 8) * 2);

  // 由字节转换为KB
  let size = '';
  size = (fileLength / 1024).toFixed(2);

  return parseInt(size);
}

/**
 * 图片转base64
 * @param {*} file
 * @param {*} obj
 * @param {*} callback
 */
export function photoCompress(file, obj, callback) {
  const ready = new FileReader();
  ready.readAsDataURL(file);
  ready.onload = function () {
    const re = this.result;
    if (getImgSize(re) / 1024 > 4) {
      Modal.alert('', '上传图片不超过4M', [{
        text: '确定',
        style: {
          color: '#868894',
        }
      }]);
      callback(null);
      return null;
    }
    canvasDataURL(re, obj, callback);
    // if (getImgSize(re) > 100) {
    //   canvasDataURL(re, obj, callback);
    // } else {
    //   if (re.split(",")[1]) {
    //     callback(re.split(",")[1]);
    //   } else {
    //     callback(re);
    //   }
    // }
  };
}

let xhr;
/**
 * 上传图片
 * @param {*} file
 * @param {*} url
 * @param {*} callback
 */
export function ImgUpladFile(file, uploadUrl, callback) {
  let url = '/order/file/upload_file' || uploadUrl;
  let form = new FormData();
  xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
  let ot, oloaded;
 
  photoCompress(
    file,
    { quality: 0.3, width: 120 },
    (base64Codes, type, base64) => {
      // console.log(base64Codes, "base64Codesbase64Codes");
      if (!base64Codes) {
        callback(null);
        return false;
      }
      // if (type) {
      //   // let bl = convertBase64UrlToBlob(base64);
      //   // form.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg"); // 文件对象
      // } else {
      //   //小于等于1M 原图上传
      //   // form.append("file", file); // 文件对象
      // }
      form.append('file', file); // 文件对象
      request.post(url, form, true).then(res=>{
        if(res.data.code === 0){
          callback(base64Codes, res.data.data.uri);
        }else{
          callback(null);
        }
      })
      // xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
      // xhr.onload = function (evt) {
      //   let data = JSON.parse(evt.target.responseText);
      //   if (data.code === 0) {
      //     callback(base64Codes, data.data.uri);
      //   }
      // }; //请求完成
      // xhr.onerror = function () {
      //   console.log("上传失败");
      // }; //请求失败

      // xhr.upload.onprogress = function (evt) {
      //   console.log(evt);
      // }; //【上传进度调用方法实现】
      // xhr.upload.onloadstart = function () {
      //   //上传开始执行方法
      //   ot = new Date().getTime(); //设置上传开始时间
      //   oloaded = 0; //设置上传开始时，以上传的文件大小为0
      // };
      // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      // xhr.send(form); //开始上传，发送form数据
    }
  );
}

/**
 * 获取星期几
 * @param {*} date 时间
 */

export function getWeek(value){
  let weeks = [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
  let date = new Date(value)
  return weeks[date.getDay()]
}