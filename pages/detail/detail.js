var app = getApp();
Page({
  data: {
    id: 1,
    loadidngHidden: false,
    bookData: null,
    iscollected: false,
  },
  onLoad(option) {
    console.log('全局用户数据')
    console.log(app.globalData.islogin)
    console.log(app.globalData.userinfo)
    var _this = this
    _this.setData({
      id: option.id,
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `http://wesource.ink:8080/library/books/book=` + _this.data.id,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("拿到了book数据")
        console.log(res.data)
        _this.setData({
          bookData: res.data.content,
          loadidngHidden: true
        })
        _this. checkcollected();
        wx.hideLoading();
      }
    })

  },
  checkcollected:function() {
    var _this = this
    var globalData = app.globalData;
    var thisbookid = this.data.bookData.bookID;
    // console.log("thisbookid")
    // console.log(thisbookid)
    if (globalData.islogin) {
      var uid = globalData.userinfo.userid;
      wx.request({
        url: `http://wesource.ink:8080/library/books/favorite=`+thisbookid,
        method:"GET",
        data: {
          userID: uid,
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          console.log('拿到了是否喜欢')
          console.log(res);
          _this.setData({
            iscollected: res.data.content
          });
        }
      })
    } else {
      console.log("没登录")//不用管默认false！
    }
  },
  // TODO：一个点击事件！！
  onCollectionTap(e) {
    var _this = this
    var globalData = app.globalData;
    var thisbookid = this.data.bookData.bookID;
    console.log("执行到了")
    console.log(thisbookid)
    var iscollectedtemp = this.data.iscollected;
    if (globalData.islogin) {
      var uid = globalData.userinfo.userid;
      // console.log("登录了")
      if (iscollectedtemp) {
        wx.showModal({
          title: '收藏',
          content: '是否取消收藏',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                url: `http://wesource.ink:8080/account/user=`+uid+`/favorite/update`,
                header: {
                  'Content-Type':'application/x-www-form-urlencoded'
                },
                method:"POST",
                data: {
                  bookID: thisbookid,
                  action: "remove",
                },
                success: (res) => {
                  console.log("取消收藏执行成功")
                  console.log(res);
                  _this.setData({
                    iscollected: false
                  });
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        wx.showModal({
          title: '收藏',
          content: '是否收藏',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                url: `http://wesource.ink:8080/account/user=`+uid+`/favorite/update`,
                header: {
                  'Content-Type':'application/x-www-form-urlencoded'
                },
                method:"POST",
                data: {
                  bookID: thisbookid,
                  action: "add"
                },
                success: (res) => {
                  console.log('收藏执行成功')
                  console.log(res)
                  _this.setData({
                    iscollected: true
                  });
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    } else {
      console.log("登录了吗？")
      wx.showModal({
        title: '个人中心',
        content: '请先前往个人中心进行登录',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },
  previewImage(e) {
    wx.previewImage({
      urls: [e.target.dataset.src]
    })
  },

  toAuthorDetailPage(e) {
    const aid = e.currentTarget.dataset.aid; //作者id[data-aid]
    wx.navigateTo({
      url: `../author/author?id=${aid}`
    });
  }
});