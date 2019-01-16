// pages/my/my.js
var Bmob = require('../../utils/bmob.js')
Page({

  
})
wx.login({
  success: function (res) {
    if (res.code) {
      Bmob.User.requestOpenId(res.code, {//获取userData(根据个人的需要，如果需要获取userData的需要在应用密钥中配置你的微信小程序AppId和AppSecret，且在你的项目中要填写你的appId)
        success: function (userData) {
          wx.getUserInfo({
            success: function (result) {
              var userInfo = result.userInfo
              var nickName = userInfo.nickName

              var user = new Bmob.User();//开始注册用户
              user.set("username", nickName);
              user.set("password", userData.openid);//因为密码必须提供，但是微信直接登录小程序是没有密码的，所以用openId作为唯一密码
              user.set("userData", userData);
              user.signUp(null, {
                success: function (res) {
                  //console.log("用户："+nickName)
                  console.log("注册成功!");
                },
                error: function (userData, error) {
                  console.log(error)
                }
              });
            }
          })
        },
        error: function (error) {
          // Show the error message somewhere
          console.log("Error: " + error.code + " " + error.message);
        }
      });

    } else {
      console.log('获取用户登录态失败！' + res.errMsg)
    }
  }
});