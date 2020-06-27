// pages/user/user.js

const utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  // 对应关系：
// nickname= username;
//account= email;
// studentnumb= stuNumber;
// password= password;
// userid= userID,
  data: {
    islogin: false,
    userinfo: {
      userid:0,
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
      url: `http://wesource.ink:8080/account/update`,
      data: {
        email:  _this.data.userinfo.account,
        password: e.detail.value.password,
        stuNumber:e.detail.value.studentnumb,
        username:e.detail.value.nickname,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success: function (res) {
        if(res.data.status){
          console.log("修改数据 SUCCESS!")
          _this.getuserinfo();
          _this.setData({
            modify: false,
          })
        }else{
          console.log('修改失败')
        }
        wx.hideLoading();
      },
      fail: function () {
        console.log("GET AUTHOR FAIL!")
      }
    });
  },
  // onReady() {
  //   var _this = this
  //   wx.showLoading({
  //     title: '加载中',
  //   });
   
  // },
  //----------------------------------------------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var globalData = app.globalData;
    this.setData({
      islogin: globalData.islogin
    });
    
  },
getuserfavorite(){
  wx.showLoading({
         title: '加载收藏列表',
  });
  var _this = this
  var globalData = app.globalData;
  var uid = globalData.userinfo.userid;
  wx.request({
    url: `http://wesource.ink:8080/account/user=`+uid+`/favorite`,
    data: {},
    header: {
      'content-type': 'application/json'
    },
    method: 'GET',
    success: function (res) {
      console.log("拿到了用户收藏列表！！")
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
  
  getuserinfo(){
    var _this = this;
    var userid=this.data.userinfo.userid;
    wx.request({
      url: 'http://wesource.ink:8080/account/user='+userid,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('拿到了用户数据')
        console.log(res)
        if (res.data.status) {
          app.globalData.islogin = true;
          var list={}
          list.nickname=res.data.content.username;
          list.account=res.data.content.email;
          list.studentnumb=res.data.content.stuNumber;
          list.password=res.data.content.password;
          list.userid=res.data.content.userID,
          app.globalData.userinfo = list;
          _this.setData({
            userinfo: list,
            islogin: true
        })
        } else{

        }
      },
    });
  },
  //登录模块
  loginSubmit(e) {
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
        if(res.data.message!="用户名或密码错误。"){
        app.globalData.islogin = true;
        var list={}
        list.nickname=res.data.content.username;
        list.account=res.data.content.email;
        list.studentnumb=res.data.content.stuNumber;
        list.password=res.data.content.password;
        list.userid=res.data.content.userID,
// 对应关系：
// nickname= username;
//account= email;
// studentnumb= stuNumber;
// password= password;
// userid= userID,
        app.globalData.userinfo = list;
        _this.setData({
          userinfo: list,
          islogin: true
        })
        _this.getuserfavorite()
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
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('注册数据')
        console.log(res)
       if(res.statusCode==200){
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

  onPullDownRefresh: function () {
    if(islogin){
      console.log('执行了显示')
      this.getuserfavorite();
    }
  },
  onPullDownRefresh () {
    this.getuserfavorite()
  }

})