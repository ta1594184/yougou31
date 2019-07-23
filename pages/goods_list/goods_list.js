// pages/goods_list/goods_list.js
const {request}=require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],  //总数据
    keyword:"", //商品关键词
    cid:0,  //商品id
    pagenum:1, //页数
    pagesize:20,   //条数
    hasMore:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const {
       keyword,
       cid,
       } = options
    const { 
      pagenum, 
      pagesize
      }=this.data


    this.setData({
      keyword,
      cid,
    })
    //将四个参数传递
    this.getListData({
      query:keyword, 
      cid, 
      pagenum, 
      pagesize,
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    let {
      keyword,
      cid,
      pagenum,
      pagesize,
      hasMore
    } = this.data;

if(!hasMore) {
  //满足条件没有数据
  wx.showToast({
    title: '没有更多数据了',
    icon:"none"
  })
  return
  }
//触发时页数加1
    pagenum++;
//更新页数
    this.setData({
      pagenum
    })
    //讲更新后的参数重新传递
    this.getListData({
      keyword,
      cid,
      pagenum,
      pagesize,
      hasMore
    })
  },

  // 获取列表数据
  getListData(params) {
const {pagesize}=this.data

    if (!params.cid){
      delete params.cid
    }
    request({
      url: "goods/search",
      data: {
        ...params
      }
    })
      .then(res => {
        const { goods } = res;
      //判断请求回来的数据是否还有数据来判断是否请求
        if (goods.length < pagesize){
         this.setData({
           hasMore: false
         })
       
        }
        //将每触发的页数中的数据进行拼接添加，不能直接替换
        this.setData({
          goods:[...this.data.goods,...goods]
        })
      })
  },
  goToDetail(event){
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/goods_detail/goods_detail?goods_id=' +id,
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})