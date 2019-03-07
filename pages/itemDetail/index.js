// pages/itemDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:Number,
      image:'',
      min:Number,
      max:Number,
      item:{},
      datetiem:{},
      itemtitle:'',
      imageView:[],
  },
  turncart:function(){
    console.log(121);
    wx.switchTab({
      url: '/pages/cart/index',
    })
  },
  addcart:function(ev){
   var  item=wx.getStorageSync("cart");
    var flags=true;
    var datecart=[];
    var length=item.length;
    for(var i=0;i<length;i++){
    if(item[i].id===ev.currentTarget.dataset.id)
      {
            item[i].num++;
            flags=false;
      }
       datecart.push(item[i]);
    }
    if(flags){
        datecart.push({
          id:ev.currentTarget.dataset.id,
          image:ev.currentTarget.dataset.image,
          num:1,
          price:ev.currentTarget.dataset.price
        })
      }
        wx.setStorageSync('cart', datecart);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var http = getApp().globalData.http.http;
    this.setData({
      id:options.id,
      image:options.image,
      min:options.min,
      max:options.max,
      itemtitle:options.name,
      
    })
    wx.setNavigationBarTitle({
      title:this.data.itemtitle
    })
    var http = getApp().globalData.http.http;
    http('https://h5.watsons.com.cn/item/reviews/list?item_id='+this.data.id+'&count=1&offset=0').then(res=>{
      this.setData({
       imageView:res.data.reviews,
      })
    })
    setTimeout(()=>{
      console.log(this.data.imageView[0].sku_name)
    },2000)
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