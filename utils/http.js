const http=function(url){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      method:'get',
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        if(res.statusCode!==200){
          reject(res.data)
        }
        resolve(res.data)
    
      },
      fail:function(res){
        reject('not data');
      }
    })
  })
}
module.exports={
  http:http
}