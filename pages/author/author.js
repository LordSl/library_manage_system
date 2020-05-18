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
    wx.showLoading({
      title: '加载中',
    });

    api.requestAuthorDetail(
      this.data.id,
      {
        fields:'image,name,country,intro,totalBook,books'
      }
    ).then((data) => {
      this.setData({
        loadingHidden: true,
        authorData:data
      });
      wx.hideLoading();
    }).catch(_ => {
      this.setData({
        loadingHidden: true,
      });
      wx.hideLoading();
      wx.navigateBack();
    });
  },
  previewImage(e){
    wx.previewImage({
      urls: [e.target.dataset.src]
    })
  }
})