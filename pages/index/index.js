//index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js')
var sum = 50
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr1:[],
    imgs: [
      'http://p.store.itangyuan.com/p/book/cover/et-sEtbWeA/EgfWEgEUetbSE_bUEB-SEGuO56e65ubqKf.jpg',
      'http://dl.bbs.9game.cn/attachments/forum/201612/28/163647y2927jz79pbdajjb.png',
      'http://dl.bbs.9game.cn/attachments/forum/201612/28/163654bb6ggma3pumpsm34.jpg',
      'http://dl.bbs.9game.cn/attachments/forum/201612/28/163644ix3qd9tp33hxfphk.jpg'
    ],
    texts: [
      '加载失败，请重新加载！',
      '加载失败，请重新加载！',
      '加载失败，请重新加载！',
      '加载失败，请重新加载！',
    ],
    classify:[
      '经典',
      '爱情',
      '虐心',
      '搞笑',
      '感人',
      '恐怖',
    ],
    title: "正在加载数据...",
    currentSwiper:0,
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  //点击图片触发事件
  swiper_click: function (e) {
    wx.navigateTo({
      url: '../img_text/img_text?id=' + this.data.imgs[this.data.currentSwiper] +
      "&text=" + this.data.texts[this.data.currentSwiper],
    })
    console.log(this.data.currentSwiper)
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  //获取json数据(bmob后端云)
  onLoad: function () {
    var info = Bmob.Object.extend("novel")
    var query = new Bmob.Query(info).limit(sum).ascending("text")
    var info1 = Bmob.Object.extend("img")
    var query1 = new Bmob.Query(info1)
    var that = this;
    wx.showLoading({
      title: '加载中',
    }),
    query1.find({
      success: function (results_info) {
        //console.log(results_info)
       
        for(var x in results_info){
          //console.log(x)
          //console.log(results_info[x].attributes.text)
          var text_test = 'texts[' + x + ']'
          that.setData({
            [text_test]: results_info[x].attributes.text
          });
        }
        //console.log(that.data.texts)
      },
      error: function () {
        console.log("query1")
      }
    })
    query.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        wx.hideLoading();
        that.setData({
          results_info: results_info
        });
        console.log(that.data.results_info)
      },
      error:function(){
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: 'loading',
          duration:3500
        })
      }
    })
  },
  //上拉加载（重新setData，消耗资源较多）
  onReachBottom: function () {
    var that=this
    var info = Bmob.Object.extend("novel")
    sum = sum + 50
    //查询sum条
    var query = new Bmob.Query(info).limit(sum).ascending("text")
    var that = this;
    let arr12 = [];
    wx.showLoading({
      title: '加载中',
    })
    query.find({
      success: function (results_info) {
        wx.hideLoading();
        console.log("查询到" + results_info.length + "条记录")
        arr12 = that.data.arr1.concat(results_info)
        that.setData({
          //results_info: results_info
          results_info:arr12
        });
      },
      error: function () {
        wx.hideLoading()
        wx.showToast({
          title: '加载失败',
          icon: 'loading',
          duration: 3500
        })
      }
    })
    //console.log(that.data.arr1)

    /*//模糊查询
    var query = new Bmob.Query(info).limit(sum).ascending("text")
    let arr2 = [];
    query.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        arr2 = that.data.arr1.concat(results_info)
        var test_num=0
        for (var i = 0; i <= results_info.length-1; i++) {
          if (results_info[i].attributes.text.indexOf("太辛苦")>=1){
            test_num=test_num+1
            console.log(results_info[i].attributes.text)
          }
        }
        //console.log("abc1" + arr12)
        that.setData({
          //results_info: results_info
          arr1: arr2
        });
        
        //console.log("abs" + arr1)
      }
    })*/
    
  },
  onShareAppMessage:function(){
    return{
      desc: '速看微小说——最好用的微小说小程序!',
    }
  }
  
})