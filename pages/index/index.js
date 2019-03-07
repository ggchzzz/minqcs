// pages/discover/index.js
Page({
  turnto:function(ev){
    console.log(ev);
    console.log(ev.currentTarget.dataset.forward)
    if(ev.currentTarget.dataset.forward===1204){
      wx.switchTab({
        url: '/pages/vip/index',
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
      swiper:'',
      Httpfunction:null,
      indicatorDots: false,
      autoplay: true,
      interval: 5000,
      duration: 1000,
      founav:'',
      endtime:Number,
      now:Number,
      msTime:{
        h:'00',
        m:'00',
        s:'00'
      },
      timernav:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var http=getApp().globalData;
    this.Httpfunction=http.http;
    this.Httpfunction.http('https://h5.watsons.com.cn/aladdin/get_batch_data?codes=[%22new_header%22,%22sylunbo%22,%22new_Home_4navs_180105_1%22,%22%E4%B8%B4%E6%97%B6%22,%22pingou_B%22,%22Home_AboveTopic_activity_170505_7%22,%22Home_TopicCase_170505_7%22,%22Home_CategaryNavs_170505_7%22]&version=&app_channel=wap&plat=wap&access_token=&device_id=86deca30-3052-11e9-9b0b-dbbec14c1b76').then(res=>{
      this.setData({
        swiper: res.data.sylunbo.datas,
        founav: res.data.new_Home_4navs_180105_1.datas
      })
    })
    this.Httpfunction.http('https://h5.watsons.com.cn/activity/specials/info?count=8&code=Home_flashSale__Top_Img&device_id=86deca30-3052-11e9-9b0b-dbbec14c1b76').then(res=>{
      this.setData({
        now:res.data.now,
        endtime:res.data.specials_time_ranges[0].end,
        timernav: res.data.specials_item_v_o_s
      })
      this.changeTime(res.data.now, res.data.specials_time_ranges[0].end)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeTime:function(now,endtime){
    var eclapse=Math.floor((endtime-now)/1000);
    var timer=null;
    timer=setInterval(()=>{
    eclapse--;
    var h = Math.floor(eclapse / 60 / 60 % 24) < 10 ? '0' + Math.floor(eclapse / 60 / 60 % 24) : Math.floor(eclapse / 60 / 60 % 24);
    var m = Math.floor(eclapse / 60 % 60) < 10 ? '0' + Math.floor(eclapse / 60 % 60) : Math.floor(eclapse / 60 % 60);
    var s = eclapse % 60 < 10?'0'+eclapse % 60: eclapse % 60;
    this.setData({
        msTime:{
          h,m,s
        }
      })
    },1000)
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
  detail(){
    wx.navigateTo({
      url: 'detail/index',
    })
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
},)

