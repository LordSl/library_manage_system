Page({
  data: {
    
    scrollHeight: 200, //scroll-view高度
    pageIndex: 0, //页码
    loadingMore: false, //是否正在加载更多
    pageData: [], //图书数据
    categoryName:"推荐",

    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['原顺序','按评分','按作者','按出版日期'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    
  },

  onShow() {
    wx.getSystemInfo({
      success: (res) => {
        //80为顶部搜索框区域高度 rpx转px 屏幕宽度/750
        this.setData({
          scrollHeight: res.windowHeight - (100 * res.windowWidth / 750)
        });
      }
    })
  },
  // 点击下拉显示框
 selectTap(){
  this.setData({
   show: !this.data.show
  });
  },
  // 点击下拉列表
  optionTap(e){
  let Index=e.currentTarget.dataset.index;//获取点击的下拉列表的下标
  this.setData({
   index:Index,
   show:!this.data.show,
   pageData:[],//可能修改过顺序的列表
   
  });
  changeOrder.call(this);
  
  
  //TODO 修改数据的顺序

  },
  onLoad(option) {
    
    
    this.setData({
      loadingMore: true,
      pageData: [
        {"image": "https://img9.doubanio.com/view/subject/l/public/s2611455.jpg", "bookid": "23", "title": "美少女战士","rating":"8.3","authorName":"武内直子","pubdate":"1998"},
        {"image": "https://img9.doubanio.com/view/subject/s/public/s29797995.jpg", "bookid": "25", "title": "我的青春恋爱喜剧果然有问题 02","rating":"8.7","authorName":"渡航","pubdate":"2013-6"},
        {"image": "https://img3.doubanio.com/view/subject/s/public/s27310533.jpg", "bookid": "19", "title": "将来的你，一定会感谢现在拼命的自己","rating":"4.3","authorName":"汤木","pubdate":"2014-6"
        },{"image": "https://img1.doubanio.com/view/subject/s/public/s23632058.jpg", "bookid": "31", "title": "天龙八部","rating":"9.1","authorName":"金庸","pubdate":"1994-5"
        },{"image": "https://img9.doubanio.com/view/subject/s/public/s26018916.jpg", "bookid": "32", "title": "神雕侠侣","rating":"8.9","authorName":"金庸","pubdate":"2014-7"
        },{"image": "https://img9.doubanio.com/view/subject/s/public/s2157336.jpg", "bookid": "33", "title": "射雕英雄传","rating":"9.0","authorName":"金庸","pubdate":"1999-04"
        }
      ]
      
    });
  },
    
/** 
    wx.request({
    
      url: 'http://wesource.ink:8080/book/bookRecommend/'+_this.data.categoryId, 
      data: {
      },
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {
        console.log("GET SUCCEESS!")
        console.log(res)
        _this.setData({
          sourceData:res.data.content,
          pageData:res.data.content,
        })
      }
    })
    **/
    

  

  //下拉请求数据
  scrollLowerEvent(e) {
    !this.data.loadingMore && requestData.call(this);
  },

  //跳转到详细页面
  toDetailPage(e) {
    const bid = e.currentTarget.dataset.bookid; //图书id [data-id]
    wx.navigateTo({
      url: `../detail/detail?id=${bid}`
    });
  },
  
});
