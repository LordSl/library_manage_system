const api = require('../../utils/api.js');
const utils = require('../../utils/util.js');

Page({
  data: {
    id: 1,
    loadidngHidden: false,
    bookData: null
  },
  onLoad(option) {
    var _this=this
    _this.setData({
      id: option.id,
    });
  },
  onReady() {
    //const i=this.id
    var _this=this
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: `http://wesource.ink:8080/book/`+_this.data.id+`/detail`, 
      data: {
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {
        console.log("GET SUCCEESS!")
        console.log(res.data)
        _this.setData({
          bookData:res.data.content
        })
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
  
  previewImage(e) {
    wx.previewImage({
      urls: [e.target.dataset.src]
    })
  },
  
  toAuthorDetailPage(e){
    const aid = e.currentTarget.dataset.aid;//作者id[data-aid]
    wx.navigateTo({
      url: `../author/author?id=${aid}`
    });
  }
});
