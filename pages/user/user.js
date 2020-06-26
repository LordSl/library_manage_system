// pages/user/user.js
const api = require('../../utils/api.js');
const utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin: false,
    userinfo: {
      nickname: "weikaixuan",
      account: '13333217870',
      password: '123456',
      studentnumb: '181250151'
    },
    // ......下面是复用一下作者的
    id: 2,
    authorData: null,
    modify: false,
  },
  //复用一下作者的
  toDetailPage(e){
    const bid = e.currentTarget.dataset.id; //??id [data-id]
    wx.navigateTo({
      url: `../detail/detail?id=${bid}`
    });
  },
  modifystart() {
    var tempresult=this.data.modify;
    tempresult=!tempresult;
    this.setData({
      modify: tempresult,
    })
  },
  modifySubmit(e){
    var _this = this
    wx.request({
      url: `http://wesource.ink:8080/user/modify`,
      data: {
        account:  _this.data.userinfo.account,
        password: e.detail.value.password,
        studentnumb:e.detail.value.studentnumb,
        nickname:e.detail.value.nickname
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("GET AUTHOR SUCCESS!")
        console.log(res.data)
        app.globalData.userinfo = res.data.content;
        _this.setData({
          userinfo: res.data.content,
          modify: false,
        })
        wx.hideLoading();
      },
      fail: function () {
        console.log("GET AUTHOR FAIL!")
      }
    });
  },
  onReady() {
    var _this = this
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `http://wesource.ink:8080/author/` + _this.data.id + `/info`,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("GET 数据 SUCCESS!")
        console.log(res.data)
        _this.setData({
          authorData: res.data.content,
          loadingHidden: true
        })
        wx.hideLoading();
      },
      fail: function () {
        console.log("GET AUTHOR FAIL!")
      }
    });
  },
  //----------------------------------------------------------
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

  //登录模块
  loginSubmit(e) {
    console.log('form发生了登陆事件，携带数据为：', e.detail.value)
    var _this = this
    wx.request({
      url: `http://wesource.ink:8080/account/login`,
      data: {
        email: e.detail.value.account,
        password: e.detail.value.password
      },
      method:"POST",
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('登录数据')
        console.log(res)
        if(res.data.message!="用户名或密码错误。"){
        app.globalData.islogin = true;

        var list={}
        list.nickname=res.data.content.username;
        list.account=res.data.content.email;
        list.studentnumb=res.data.content.stuNumber;
        list.password=res.data.content.password;

        app.globalData.userinfo = res.data.content;
        _this.setData({
          userinfo: list,
          islogin: true
        })
        console.log(_this.data.userinfo)
        console.log(app.globalData.islogin+"登录？")
      }
        else{wx.showModal({
            title: '登录失败',
            content: '用户名或密码错误。',
            success: function(res) {
              if (res.confirm) {} 
              else if (res.cancel) {}  
            }})
        }
      }
    })
  },

  //注册
  registerSubmit(e) {
    console.log('form发生了注册事件，携带数据为：', e.detail.value)
    var _this = this
    wx.request({
      url: `http://wesource.ink:8080/account/register`,
      method: "POST",
      data: {
        email: e.detail.value.account,
        password: e.detail.value.password,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log('注册数据')
        console.log(res)
       if(res.errMsg=="request:ok"){
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        })
       }else{
        wx.showToast({
          title: '注册失败',
          icon: 'none',
          duration: 2000
        })
       }
      }
    })
  },
  
  toDetailPage(e) {
    const bid = e.currentTarget.dataset.id; //图书id [data-id]
    wx.navigateTo({
      url: `../detail/detail?id=${bid}`
    });
  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

})