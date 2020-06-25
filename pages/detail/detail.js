var app = getApp();
Page({
  data: {
    id: 1,
    loadidngHidden: false,
    bookData: null,
    iscollected: false,
  },
  onLoad(option) {
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
        console.log("nadaol")
        console.log(res.data)
        _this.setData({
          bookData: res.data.content,
          loadidngHidden: true
        })
        _this. checkcollected();
        wx.hideLoading();
      }
    })

    /** 
    api.requestBookDetail(
      this.data.id, {
        fields: 'image,summary,publisher,title,rating,pubdate,author,author_intro,catalog'
      }
    ).then((data) => {
      this.setData({
        loadidngHidden: true,
        bookData: data
      });
      wx.hideLoading();
    }).catch(_ => {
      this.setData({
        loadidngHidden: true
      });
      wx.hideLoading();
      wx.navigateBack();
    });
    **/

  },
  checkcollected:function() {
    var _this = this
    var globalData = app.globalData;
    var thisbookid = this.data.bookData.bookid;
    // console.log("zhixingl")
    // console.log(thisbookid)
    if (globalData.hasLogin) {
      var uid = globalData.userid;
      wx.request({
        url: `http://wesource.ink:8080/book/iscollected`,
        data: {
          userid: uid,
          bookid: thisbookid
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          // console.log(res.data);
          _this.setData({
            iscollected: res.data.content.iscollected
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
    var thisbookid = this.data.bookData.bookid;
    console.log("zhixingl")
    console.log(thisbookid)
    var iscollectedtemp = this.data.iscollected;
    if (globalData.hasLogin) {
      var uid = globalData.userid;
      // console.log("登录了")
      if (iscollectedtemp) {
        wx.showModal({
          title: '收藏',
          content: '是否取消收藏',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.request({
                url: `http://wesource.ink:8080/book/deletecollection`,
                data: {
                  userid: uid,
                  bookid: thisbookid
                },
                header: {
                  'content-type': 'application/json'
                },
                success: (res) => {
                  // console.log(res.data);
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
                url: `http://wesource.ink:8080/book/addcollection`,
                data: {
                  userid: uid,
                  bookid: thisbookid
                },
                header: {
                  'content-type': 'application/json'
                },
                success: (res) => {
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