const request = (params)=>{
  const baseURL ="https://api.zbztb.cn/api/public/v1/";

  wx.showLoading({
    title: '加载中',
    mask:false
  })

  return new Promise((resolve,reject)=>{
    wx:wx.request({
      ...params,
      url: baseURL + params.url,
      success:res=>{
        const {message} = res.data;
        resolve(message);
      },
      fail: err => {
        reject(err);
      },
      // 请求完成的时候
      complete: res => {
        // 3.0 隐藏加载框
        wx.hideLoading();
      }
    })
  })
}
module.exports={
  request
}