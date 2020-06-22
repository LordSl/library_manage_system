// pages/user/user.js
const api = require('../../utils/api.js');
const utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    userinfo:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var globalData = app.globalData;
    console.log('xianshi')
    this.setData({
     islogin: globalData.hasLogin
    });
  },
  loginSubmit(e) {
    console.log('form发生了登陆事件，携带数据为：', e.detail.value)
    var _this = this
    wx.request({
      url: `http://wesource.ink:8080/user/login`,
      data: {
        username: e.detail.value.username,
        password: e.detail.value.password
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        // 切记目前所有的返回数据绑定都是有问题的。。因为不知道咋绑定。。
        app.globalData.islogin = true;
        app.globalData.userinfo= res.data.content;
        _this.setData({
          userinfo: res.data.content,
          islogin:true
        })
      }
    })
  },
  registerSubmit(e){
    console.log('form发生了注册事件，携带数据为：', e.detail.value)
    var _this = this
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})