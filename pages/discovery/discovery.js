var Bmob = require('../../utils/bmob.js')
var sum=300

Page({

  data: {
    list_data: [],
    title: "正在加载数据...",
    results_info:"",
    arr:[],
    arr1: [],
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
    })
    var info1 = Bmob.Object.extend("novel")
    //查询sum条
    var query1 = new Bmob.Query(info1).limit(sum)
    var that = this;
    query1.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        that.setData({
          arr: results_info
        });
        wx.hideLoading()
      },
      error:function(){
        wx.hideLoading();
        wx.showToast({
          title: '加载失败！',
          icon:'loading',
        })
      }
    })
    var arr1 = this.data.arr
    console.log(arr1)
  },
  /*onReachBottom: function () {
    var info = Bmob.Object.extend("novel")
    sum = sum + 10
    //查询sum条
    var query = new Bmob.Query(info).limit(sum)
    var that = this;
    query.find({
      success: function (results_info) {
        var test=results_info
        //sconsole.log(test)
        console.log("查询到" + results_info.length + "条记录")
        that.setData({
          arr: results_info
        });
      }
    })
  },
  /*
   * 破解模糊搜索
   */
  /*onReachBottom: function () {
    var that = this
    var info = Bmob.Object.extend("novel")
    sum = sum + 50
    var query = new Bmob.Query(info).limit(sum).ascending("text")
    let arr2 = [];
    query.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        arr2 = that.data.arr1.concat(results_info)
        for (var i = 0; i <= results_info.length - 1; i++) {
          if (results_info[i].attributes.novel_num.indexOf("2") >= 1) {
            console.log(results_info[i].attributes.novel_num)
          }
        }
        that.setData({
          arr1: arr2
        });
      }
    })
  },*/
  search:function(e){
    var search_input=e.detail.value
    console.log("input:"+search_input)
    var that = this
    var info = Bmob.Object.extend("novel")
    sum = 300
    var query = new Bmob.Query(info).limit(sum).ascending("text")
    let arr2 = [];
    let arr3 = [];
    query.find({
      success: function (results_info) {
        console.log("查询到" + results_info.length + "条记录")
        arr2 = that.data.arr1.concat(results_info)
        var arr3_num=-1
        for (var i = 0; i <= results_info.length - 1; i++) {
          if (results_info[i].attributes.text.indexOf(search_input) >= 0) {
            console.log(results_info[i].attributes.text.indexOf(search_input))
            arr3_num=arr3_num+1
            arr3[arr3_num] = results_info[i]
            //console.log(results_info[i].attributes.novel_num)
            console.log(arr3[arr3_num].attributes.text)
            
          }
        }
        that.setData({
          arr: arr3,
          search_input_true: e.detail.value
        });
        console.log(search_input)
      }
    })
  },


  onShareAppMessage: function () {
    return {
      desc: '速看微小说——最好用的微小说小程序!',
    }
  }
  
})