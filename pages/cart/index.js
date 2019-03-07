// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataitem:{},
      sumprice:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  add:function(ev){
  var id=ev.currentTarget.dataset.id;
  var itemdata=wx.getStorageSync('cart');
  var length=itemdata.length;
  for(var i=0;i<length;i++){
    if(itemdata[i].id===id){
        itemdata[i].num++;
    }
  }
  wx.setStorageSync('cart', itemdata)
  this.setData({
    dataitem:itemdata,
  })
  this.compute(this.data.dataitem);
  },
  minus:function(ev){
    var id = ev.currentTarget.dataset.id;
    var itemdata = wx.getStorageSync('cart');
    var length = itemdata.length;
    for (var i = 0; i < length; i++) {
      if (itemdata[i].id === id&&itemdata[i].num>1) {
        itemdata[i].num--;
      }
    }
    wx.setStorageSync('cart', itemdata)
    this.setData({
      dataitem: itemdata,
    })
    this.compute(this.data.dataitem);
  },
  compute:function(data){
    var length = data.length;
    var sum = 0;
    for (var i = 0; i < length; i++) {
        sum+=data[i].num*data[i].price;
      
    }
    console.log(sum);
    this.setData({
      sumprice:sum,
    })
  },
  onLoad: function (options) {
        var data=wx.getStorageSync('cart');
        this.setData({
          dataitem:data,
        })
        this.compute(this.data.dataitem);
        this.setData({
          dataitem: data,
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