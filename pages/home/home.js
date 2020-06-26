// pages/home/home.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classifications:[],//存储类别数据
    currentBookNum:0,//或许有其他全局参数，先摆个样子
    searchKey:"",
  },
  
  输入书名:function(event){
    this.setData({
      searchKey:event.detail.value,
    })
  },
  按书名搜索:function(event){
    //获取搜索结果列表
    var list=[]
    request(this.data.searchKey).then(res=>{
     list=res.content
     console.log(list)
   })
    if(this.data.searchKey==null){
      console.log("null")
    }
    else{
      console.log("跳转到搜索结果页")
    wx.navigateTo({
      url: '../category/category?list='+JSON.stringify(list)+'&mode=searchResult&searchResult='+this.data.searchKey,
    })}
  },

  进入具体类别: function(event) {
    var arr = this.data.classifications;
    var i = parseInt(event.currentTarget.id)+1
    console.log(i);
    var s = arr[i-1].name
    console.log("用户点击了！"+s);
    wx.navigateTo({
      url: `../category/category?id=`+i+`&name=`+s+`&mode=category`
    })
  },

  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    });
     var that = this
     wx.request({
     url: 'http://wesource.ink:8080/library/home',
     method:"GET",
     data: {
     },
     header: {
       'content-type': 'application/json' //默认值
     },
     dataType:JSON,
     success: function(res){

       console.log("GET SUCCEESS!")
       
       var JSdata = JSON.parse(res.data).content
       console.log(JSdata)
       var tmp = new Array()
       var num = 0
       for(var i=0;i<JSdata.length;i++){
         num+= JSdata[i].booksCount
         var s = ""
         for(var j=0;j<JSdata[i].famousAuthors.length && j<3;j++){
           s += JSdata[i].famousAuthors[j]+" "
         }
         s+="..."
         tmp.push({
           name:JSdata[i].categoryName,
           // url:JSdata[i].url,
           id:JSdata[i].categoryID,
           url:JSdata[i].image,
           motto:JSdata[i].introduction,
           auther:s,
           heat:JSdata[i].heat,
         })
       }
       that.setData({
         classifications:tmp,
         currentBookNum:num
       })
       wx.hideLoading();
     }
   })
 },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})


function request(data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://wesource.ink:8080/library/books/search',
      method: 'GET',
      data: {key:data},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else
          if (res.statusCode === 403) {
          }
          reject();
      },
      fail: function () {
        reject();
      }
    });
  });
}