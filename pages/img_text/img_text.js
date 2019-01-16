// pages/test2/test2.js
var Bmob = require('../../utils/bmob.js')
Page({

  data: {
    art: {
      img: "",
      texts: "",
    }
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      img: options.id,
      texts: options.text,
    });
    console.log(that.data.texts)
  },
})