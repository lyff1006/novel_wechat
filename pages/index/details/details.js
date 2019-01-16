// pages/index/details/details.js
var Bmob = require('../../../utils/bmob.js')
Page({
  onLoad: function (options) {
    this.setData({
      title: options.novel_num
    });
    console.log("options.novel_num：" + options.novel_num)
    this.getinfo(options.novel_num)

  },
  getinfo: function (novel_num) {
    var info = Bmob.Object.extend("novel")
    var query = new Bmob.Query(info)
    query.equalTo("novel_num", novel_num);
    var that = this;
    query.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        for (var i = 0; i < results_info.length; i++) {
          var object = results_info[i];
          console.log(object.id + ' - ' + object.get('text'));
        }
        that.setData({
          results_info: results_info
        });
      }
    })
  }
})  