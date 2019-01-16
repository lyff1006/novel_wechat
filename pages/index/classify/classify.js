// pages/index/classify/classify.js
var Bmob = require('../../../utils/bmob.js')
var sum=100
Page({
  onLoad: function (options) {
    this.setData({
      classify: options.class
    });
    wx.setNavigationBarTitle({
      title: ""//this.data.classify,
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.getinfo(options.class)
  },
  getinfo: function (classify) {
    var info = Bmob.Object.extend("novel")
    var query = new Bmob.Query(info).limit(500)
    query.equalTo("class", classify);
    var that = this;
    query.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        for (var i = 0; i < results_info.length; i++) {
          var object = results_info[i];
          //console.log(object.id + ' - ' + object.get('novel_num'));
        }
        that.setData({
          results_info: results_info
        });
        wx.hideLoading()
      },
      error:function(){
w
        wx.hideLoading()
      },
      error:function(){
        wx.hideLoading()
        wx.showToast({
          title: '加载失败！',
          icon:'loading'
        })
      }
    })
  },
  //上拉加载（重新setData，消耗资源较多）
  /*onReachBottom: function (classify) {
    var info = Bmob.Object.extend("novel")
    sum = sum + 50
    //查询sum条
    var query = new Bmob.Query(info).limit(sum)
    query.equalTo("class", classify);
    var that = this;
    query.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        that.setData({
          results_info: results_info
        });
      }
    })
  },*/
})