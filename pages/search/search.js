// pages/search/search.js
const { request } = require("../../utils/request.js")
let timer
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //关键词
    keyword:"",
    //关键词总汇
    historyList:[],
    //搜索提示
    tipsList:[],

    showTips:false
  },
  
  //失去焦点
  inputBlur(){
    this.setData({
      showTips:false
    })
  },
  //获取焦点时触发
  inputFocus() {
    this.setData({
      showTips: true
    })
  },

  removeHistory(){
    const {historyList}=this.data

    this.setData({
      historyList:[]
    })
    wx.removeStorageSync("historyList")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { keyword } = options
    this.setData({
      keyword
    })
  },

  //输入框输入时内容时触发
  handleInput(event){
    const { value } = event.detail
    this.setData({
      keyword:value
    })
  //判断输入框为空的时候提示框隐藏或显示
    if (!value.trim()) {
      this.setData({
        showTips: false
      })
    }else{
      this.setData({
        showTips: true
      })
    }
    clearInterval(timer)

    timer = setTimeout(() => {
      // 当用户输入内容发生改变的时候，获取搜索提示
      this.getSearchTipsData(value);
    }, 500);
  },
  //获取搜索提示数据
  getSearchTipsData(query){
    request({
      url:"goods/qsearch",
      data:{
        query
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        tipsList:res||[]
      })
    })
  },
  
  //点击按钮时触发
  inputSumbit(event){
    const { value } = event.detail
    let { historyList}=this.data
    //数组前面添加
    historyList.unshift(value);
    //去重
    historyList= [...new Set(historyList)];

    this.setData({
      historyList
    })


    //本地储存
    wx.setStorageSync("historyList",historyList)

    wx.redirectTo({
      url: '/pages/goods_list/goods_list?keyword=' + value,
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
    this.setData({
      //获取本地数据传递数据，如果没有数据则传递空数组
      historyList: wx.getStorageSync("historyList") || []
    })
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