// pages/home/home.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classifications:[],//存储类别数据
    currentBookNum:null,//或许有其他全局参数，先摆个样子
  },

  进入具体类别: function(event) {
    var arr = this.data.classifications;
    var i = parseInt(event.currentTarget.id)
    console.log(i);
    var s = arr[i].name
    console.log("用户点击了！"+s);
    //热度相关
    //not necessary
    //wx.navigateTo({
    //  url: '../index/index',//+向下一页面传递的参数
    //})
     wx.navigateTo({
       url: `../category/category?id=`+i+`&name=`+s
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
 onLoad: function (options) {
    var tmp1 = [{name:'文学',url:'../../images/book.png',motto:'腹有诗书气自华',auther:'曹雪芹 托尔斯泰 ...'},
    {name:'科幻',url:'../../images/book.png',motto:'想象力是人类进步的阶梯',auther:'刘慈欣 克拉克 ...'},
    {name:'青春',url:'../../images/book.png',motto:'懵懂时光最易伤',auther:'郭敬明 韩寒 ...'},
    {name:'武侠',url:'../../images/book.png',motto:'有人的地方就有江湖',auther:'金庸 梁羽生 ...'},
    {name:'悬疑',url:'../../images/book.png',motto:'智力和观察力的对决',auther:'岛田庄司 阿加莎·克里斯蒂娜...'}]
    var tmp2 = 2333
    this.setData({
      classifications:tmp1,
      currentBookNum:tmp2
    })
  },

// //使用本地springboot后端
//  onLoad: function (options) {
//     var that = this
//     wx.request({
//     url: 'http://localhost:8080/home/allCategory',
//     method:"GET",
//     data: {
//     },
//     header: {
//       'content-type': 'application/json' //默认值
//     },
//     dataType:JSON,
//     success: function(res){
//       console.log("GET SUCCEESS!")
//       var JSdata = JSON.parse(res.data).content
//       console.log(JSdata)
//       var tmp = new Array()
//       var num = 0
//       for(var i=0;i<JSdata.length;i++){
//         num+= JSdata[i].booknums
//         var s = ""
//         for(var j=0;j<JSdata[i].famous_authers.length;j++){
//           s += JSdata[i].famous_authers[j]
//           if(j!=JSdata[i].famous_authers.length-1) s+=" "
//           else s+="..."
//         }
//         tmp.push({
//           name:JSdata[i].categoryName,
//           // url:JSdata[i].url,
//           id:JSdata[i].id,
//           url:'../../images/book.png',
//           motto:JSdata[i].motto,
//           auther:s,
//           heat:JSdata[i].heat,
//         })
//       }
//       that.setData({
//         classifications:tmp,
//         currentBookNum:num
//       })
//     }
//   })
// },

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