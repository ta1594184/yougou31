// pages/goods_detail/goods_detail.js
const { request } = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_all:{}, //总数据
    big_pics:[]  //图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options
    this.getDetailData(goods_id)
  },

  getDetailData(goods_id){
    request({
      url:"goods/detail",
      data:{
        goods_id
      }
    }).then(res=>{
      // 获取系统信息
      wx.getSystemInfo({
        success: result=> {
          if (result.system.toLowerCase().includes("ios")){
             // "ios 10.0.1".indexOf('ios') >  包含字符串返回大于 -1 的索引值
          // "ios 10.0.1".includes('ios')   包含字符串返回 布尔类型 true
          // IOS 平台下不支持 webp 图片格式，需要通过正则表达式替换成普通 jpg
            res.goods_introduce = res.goods_introduce.replace(/\?.+?webp/g, "");
          }
        },
      })
      
      const big_pics=res.pics.map((item,index)=>{
        return item.pics_big
      })  

      this.setData({
        goods_all:res,
        big_pics
      })
    })
  },
  //图片浏览
  previewImage(event){
    const { current } =event.currentTarget.dataset;
    console.log(current)
    wx.previewImage({
      current,
      urls: this.data.big_pics
    })
  },
  addToCart(){
    
  },
  addToCart(){
    const {
      goods_id,
      goods_name,
      goods_small_logo,
      goods_price
    }=
    this.data.goods_all;
    //商品的总数据，如有数据先储存本地，没有数据在往对象中添加数据
    let cartList = wx.getStorageSync("cartList")||{};
    //每个商品的数据
   
    //将对应的商品数据天加到总数据中
   if(cartList[goods_id]){
     //有数据时只需要书香加1
     cartList[goods_id].count++
   }else{
     let goodsItem = {
       goods_id,
       goods_name,
       goods_small_logo,
       goods_price,
       selected: true,
       count: 1
     }
     cartList[goods_id] = goodsItem;
   }
    //本地储存数据
    wx.setStorageSync("cartList", cartList)
//提示框是否显示透明蒙层，防止触摸穿透
    wx.showToast({
      title: '添加成功',
      duration:1500,
      mask:true
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