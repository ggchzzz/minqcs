// pages/vip/index.js.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabdata:{
      type:String,
    },
    
    
    
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    tab:[
    {name:"会员爆款",indexID:0,groupID:9966},
    {name: "会员三折起", indexID:1,groupID:9967},
    {name: "更多会员价", indexID:2,groupID:9968 }
    ],
    num:0,
    dateitem:{},
    
    
  },

  /**
   * 组件的方法列表
   */
  attached:function(ev){
    this.getData(9966);
  },
  methods: {
    getData: function (id) {
      var http = getApp().globalData.http.http;
      http(`https://h5.watsons.com.cn/item/ws/group_list?current_page=1&          page_size=24&group_id=${id}&             device_id=86deca30-3052-11e9-9b0b-dbbec14c1b76`).then(res => {
        console.log(res);
        this.setData({
          dateitem :res.data.item_list,
        })
      })
    },
    detail(ev){

      wx.navigateTo({
        url: '/pages/itemDetail/index?id=' + ev.currentTarget.dataset.id + '&image=' + ev.currentTarget.dataset.image + '&min=' + ev.currentTarget.dataset.min / 100 + '&max=' + ev.currentTarget.dataset.max / 100 + '&name='+ev.currentTarget.dataset.name,
      })
    },
   switclass:function(ev){
     this.setData({
       num:ev.currentTarget.dataset.num
     }),
     this.getData(ev.currentTarget.dataset.group);
   },
  },
})
