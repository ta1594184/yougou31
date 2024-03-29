// pages/fenlei/fenlei.js
const { request } = require("../../utils/request.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    "classify":[],
    activeIndex:0,
    subClassify:[]
  },

getClassIfy(){
  request({ url:"categories"})
    .then(res=>{
      this.setData({
        classify:res,
        subClassify: res[this.data.activeIndex].children
      })
    })
},
//点击左侧获取数据索引
  handleIfy(event){
    const { index } = event.currentTarget.dataset
    this.setData({
      activeIndex:index,
      subClassify:this.data.classify[index].children

    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassIfy()
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