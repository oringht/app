let fetch = require('../../util/utif.js')

// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前加载的分类
    category:{},
    //全部店铺
    shops:[],
    flag:true,
    id:'',
    page:0,
    limit:20
  },
  //加载下一页数据
  loadMore(){
    if(!this.data.flag){
      return false;
    }
    fetch(`categories/${this.data.id}/shops?_page=${++this.data.page}&_limit=${this.data.limit}`).then(res=>{
      wx.stopPullDownRefresh()
      this.setData({
        shops: this.data.shops.concat(res.data),
        page: this.data.page,
        flag: this.data.page * this.data.limit < parseInt(res.header['X-Total-Count']),
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.cat
    })
    //console.log(options)
    fetch(`categories/${options.cat}`).then(res=>{
      //console.log(res.data)
      //wx.setNavigationBarTitle({
        //title: res.data.name,
      //})
      this.setData({category: res.data.name})
      wx.setNavigationBarTitle({
        title: res.data.name
      })
    })
    this.loadMore()
    //加载完分类信息过后再去加载商铺信息
    //fetch(`categories/${options.cat}/shops?_page=1&_limit=10`).then(res => {
      //console.log(res)
     // this.setData({ shops:res.data })
    //})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if(this.data.category.name){
      wx.setNavigationBarTitle({
        title: this.data.category
      })
    }
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
      this.setData({
        shops: [],
        flag: true,
        page: 0,
      })
    //this.loadMore().then(()=>{
      //wx.stopPullDownRefresh()
    //})
    this.loadMore()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})