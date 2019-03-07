// pages/vip/index.js.js
Page({
  /**
   * 组件的初始数据
   */
  data: {
    tab:[
    {name:"如野面露 ",indexID:0,groupID:14147},
    {name: "眼霜精华", indexID:1,groupID:14148},
    {name: "洁面爽肤水", indexID:2,groupID:14149 }
    ],
    num:0,
    dateitem:[],
    page:1,
    pageID:14147,
    shortTitle:'正在加载',
    endtype:true,
  },
  /**
   * 组件的方法列表
   */
   onReady:function(ev){
    this.getData(14147);
  },
  onPullDownRefresh:function(){
      wx.showNavigationBarLoading();
      var http = getApp().globalData.http.http;
    http(`https://h5.watsons.com.cn/item/ws/group_list?current_page=1&page_size=24&group_id=${this.data.pageID}&device_id=86deca30-3052-11e9-9b0b-dbbec14c1b76`).then(res=>{
      this.setData({
        dateitem: res.data.item_list,
      })
    })
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();

  },
  loadMore:function ( page) {
    var http = getApp().globalData.http.http;
    http(`https://h5.watsons.com.cn/item/ws/group_list?current_page=${page}&page_size=24&group_id=${this.data.pageID}&device_id=86deca30-3052-11e9-9b0b-dbbec14c1b76`).then(res => {
      if(res.data!==undefined){
        var temp = this.data.dateitem;
        this.setData({
          dateitem: temp.concat(res.data.item_list),
          
        })
        wx.showLoading({
          title: this.data.shortTitle
        })     
      }
      else{
        this.setData({
          endtype:false,
        })
      }
      setTimeout(()=>{
        wx.hideLoading();   
      },2000)
     
    })
  },
  onReachBottom: function (ev) {
    var temp=this.data.page+1;
    this.setData({
      page:temp,
    })
    this.loadMore(this.data.id, this.data.page);   
  },
  getData: function (id,page) {
      var http = getApp().globalData.http.http;
      http(`https://h5.watsons.com.cn/item/ws/group_list?current_page=${page}&page_size=24&group_id=${id}&device_id=86deca30-3052-11e9-9b0b-dbbec14c1b76`).then(res => {
        this.setData({
          dateitem :res.data.item_list,
        })
      })
    },
    detail(ev){
      console.log(ev);
    },
   switclass:function(ev){
     this.setData({
       num:ev.currentTarget.dataset.num,
       pageID: ev.currentTarget.dataset.group
     }),
     this.getData(ev.currentTarget.dataset.group,this.data.page);
   },
})
