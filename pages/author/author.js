const api = require('../../utils/api.js');
const utils = require('../../utils/util.js');

Page({
  data:{
    id: null,
    loadingHidden: false,
    authorData: null
  },
  onLoad(option){
    this.setData({
      id: option.id
    });
  },
  onReady(){
    var _this=this
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `http://wesource.ink:8080/book/`+_this.data.id+`/info`,
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      success: function(res){
        console.log("GET AUTHOR SUCCESS!")
        console.log(res.data)
        _this.setData({
          authorData:res.data.content
        })
      },
      fail: function(){
        console.log("GET AUTHOR FAIL!")
      }
    });
  },
  toDetailPage(e) {
    const bid = e.currentTarget.dataset.id; //??id [data-id]
    wx.navigateTo({
      url: `../detail/detail?id=${bid}`
    });
  },
  previewImage(e){
    wx.previewImage({
      urls: [e.target.dataset.src]
    })
  }
})