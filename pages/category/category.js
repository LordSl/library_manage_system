
const api = require('../../utils/api.js');

Page({
  data: {
    mode:"category",//"category"正常模式 "searchResult"显示搜索结果
    searchResult:"",
    scrollHeight: 200, //scroll-view高度
    pageIndex: 0, //页码
    //totalRecord: 1, //图书总数
    //isInit: true, //是否第一次进入应用
    loadingMore: false, //是否正在加载更多
    pageData: [], //图书数据
    categoryId: 1,
    categoryName:"二次元",

    show:false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData:['原顺序','按评分','按作者','按出版日期'],//下拉列表的数据
    index:0,//选择的下拉列表下标
    sourceData:[],
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
    var mode = option.mode
    this.setData({mode:mode})
    if(this.data.mode=="category"){
    //var thisBlock=this;
    var _this=this
    this.setData({
      categoryId: option.id,
      categoryName:option.name,
      //pageData:[],
      loadingMore: true,
      // pageData: [{"image": "http://p0.itc.cn/images01/20200520/a174fae3cb224d9abb25583597ef9cfa.jpeg", "id": "1", "title": "关于我不是人这一回事","rating":{"average":9.5},"author":{"1":"川原砾","2":"镰池和马"},"pubdate":"2000.5"},{"image": "http://img.mp.itc.cn/upload/20170715/c0019320eb544331b53c136c80ea24c1_th.jpg", "id": "2", "title": "关于你不是人这一回事","rating":{"average":0.0},"author":{"1":"川原乐","2":"镰也和马"},"pubdate":"2020.4"}]
    });

    wx.request({
    
      url: 'http://wesource.ink:8080/book/bookCategory/'+_this.data.categoryId, 
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
    }
    if(this.data.mode=="searchResult"){
      var list = JSON.parse(option.list)
      var searchResult = "\""+option.searchResult+"\"的搜索结果"
      this.setData({
      pageData:list,
      sourceData:list,
      searchResult:searchResult
    })
    }

  },

  //下拉请求数据
  scrollLowerEvent(e) {
    !this.data.loadingMore && requestData.call(this);
  },

  //跳转到详细页面
  toDetailPage(e) {
    const bid = e.currentTarget.dataset.id; //图书id [data-id]
    wx.navigateTo({
      url: `../detail/detail?id=${bid}`
    });
  },
  
  输入书名:function(event){
    this.setData({
      searchKey:event.detail.value
    })
    console.log(this.searchKey)
  },

  按书名搜索:function(event){
    //获取搜索结果列表
    // wx.request({
    //   url: '',
    //   method:"GET",
    //   data: {
    //   },
    //   header: {
    //     'content-type': 'application/json' //默认值
    //   },
    //   dataType:JSON,
    //   success: function(res){
    //   }
    // })
    var list = [
      {authorName: "唐家三少",author_id: 2,bookid: 2,image: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",pubdate: "2020-5-17",rating: 6,title: "斗罗大陆"},
      {authorName: "唐家三少",author_id: 2,bookid: 3,image: "https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png",rating: 6.6,title: "斗罗大陆2"},
    ]
   
    if(this.data.searchKey==null){
      console.log("null")
    }
    else{
      console.log("跳转到搜索结果页")
    wx.navigateTo({
      url: '../category/category?list='+JSON.stringify(list)+'&mode=searchResult&searchResult='+this.data.searchKey,
    })}
  },  
});
function changeOrder(){
  var _this=this
  var i=this.data.index
  switch(i){
    case 0:{//原顺序
      this.setData({
        pageData:this.data.sourceData
      })
      break;
    }
    case 1:{//按评分
      var temp=[];
      let len=this.data.sourceData.length;
      console.log(len)
      for(let i=0;i<len;i++){
        temp.push(this.data.sourceData[i])
      }
      temp.sort(sortByKey('rating'))
      this.setData({
        pageData:temp
      })
      break;
    }
    case 2:{//按作者
      var temp=[];
      let len=this.data.sourceData.length;
      console.log(len)
      for(let i=0;i<len;i++){
        temp.push(this.data.sourceData[i])
      }
      temp.sort(sortByKey('author_id'))
      this.setData({
        pageData:temp
      })
      break;
    }
    case 3:{//按评分
      var temp=[];
      let len=this.data.sourceData.length;
      console.log(len)
      for(let i=0;i<len;i++){
        temp.push(this.data.sourceData[i])
      }
      temp.sort(sortByKey('pubdate'))
      this.setData({
        pageData:temp
      })
      break;
    }

  }
}
function sortByKey( key) {
  return function (a, b) {
      let x = a[key]
      let y = b[key]
      return ((x < y) ? 1 : (x > y) ? -1 : 0)
  }
}
function getPageData(){
  //TODO 作废,不通过api进行请求了
  var _this=this;
  const i = this.categoryId;
  const start = this.data.pageIndex;

  this.setData({
    loadingMore: true,
    isInit: false
  });

  wx.showLoading({
    title: '加载中',
  });

  wx.request({
    
    url: `http://wesource.ink:8080/book/bookCategory/`+_this.data.categoryId, 
    data: {
    },
    header: {
      'content-type': 'application/json' 
    },
    success: function(res) {
      console.log("GET SUCCEESS!")
      this.setData({
        pageData:res.data.content,
      })
    }
  })
}
  

  
 
