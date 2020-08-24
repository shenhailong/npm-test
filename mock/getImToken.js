/*
 * @Author: gaojiudong
 * @Date: 2020-04-07 13:57:49
 * @LastEditTime: 2020-05-08 10:15:44
 * @LastEditors: gaojiudong
 * @Description:
 * @FilePath: /medical/mock/getImToken.js
 * @jt
 */

module.exports = {
  "GET /member/get_med_im_token": (req, res) => {
    res.send({
      code: 200,
      userId: "1000288",
      token:
        "uaY3GHNyjZ/KHjtzaZgFamTPrzSI17RuM8p8H16frv0ojvaTihzFGmXT1dXzAHSsejdF417+msyyKdz1GsUikw==",
    });
  },
};
