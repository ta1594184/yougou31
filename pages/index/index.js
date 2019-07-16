Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[],
    entrance:[],
    floor:[],
    top:"false"
  },
  //轮播图
  getSlideshow(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: res => {
        // console.log(res)
        // 解构数据
        const {
          message
        } = res.data;
        // 设置数据
        this.setData({
          imgUrls: message
        });
      }
    })
  },

  //入口请求数据
  getEntrance(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success:res=>{
        // console.log(res)
        const {message}=res.data
        this.setData({
          entrance:message
        })
      }
    })
  },
  getFloor(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success:res=>{
          console.log(res)
          const {message}=res.data
        this.setData({
          floor:message
        })
      }
    })
  },

  goTop(event){
     const {top} =event.currentTarget.dataset;
    wx.pageScrollTo({
      scrollTop: top,
      duration: 300
    })
  },
  onPageScroll: function (options){
   const {scrollTop}=options

   if(scrollTop<200){
     this.setData({
       top:true
     })
   }else{
     this.setData({
       top: false
     })
   }
  },

    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSlideshow(),
      this.getEntrance(),
      this.getFloor()
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