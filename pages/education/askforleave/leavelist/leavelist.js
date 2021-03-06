// pages/education/homework/homework.js
const app = getApp()
import ajax from '../../../../utils/request';
var choosedate = require("../../../../utils/data.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeworkparentsurl: app.globalData.homeworkparents,
    homeworkteacherurl: app.globalData.homeworkteacher,
    usertype: app.globalData.usertype,
    classes: [],
    day: [],
    classid: [],
    weekarr: [],
    weeklist: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    daylist: [],
    leavelist: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  preweek: function () {
    choosedate.pre();
    var date = choosedate.weekdayanddate[0].datetime;
    var dateNew = new Date(date);
    this.getleavelist(dateNew);
  },
  nextweek: function () {
    choosedate.next();
    var date = choosedate.weekdayanddate[0].datetime;
    var dateNew = new Date(date);
    this.getleavelist(dateNew);
  },
  /**
   * 家长获取家庭作业列表
   */
  getleavelist: function (date1, classid) {
    if (date1 == null) {
      date1 = new Date();
    }
    if (classid == null) {
      classid = "";
    }
    var day = date1.getDate();
    var datas = {};
      var data1 = {
        "classId": classid,
        "leaveDate": date1
      };
    var url = app.globalData.leaveteacher;
    ajax(url).paramters(data1).post().then(res => {
      console.log(res.data);
      this.setData({
        leavelist: res.data,
        classes: res.data.classes,
        classid: res.data.classId != null ? res.data.classId : (classid != null ? classid : "")
      });
    }).catch(err => {

    });
    choosedate.setDate(date1);
    this.setData({
      weekarr: choosedate.cells,
      daylist: choosedate.weekdayanddate,
      day: day,
    });

  },
  onLoad: function (options) {
    this.getleavelist();
    var isupdate = options.isUpdate;
    if (isupdate == 1) {
      var userType = app.globalData.usertype;
      if (userType == 2) {//更新当前在线请假模块为已读
        var data2 = {
          transactionType: 2
        };
        ajax(app.globalData.update_status).paramters(data2).post().then(res => {

        }).catch(err => {

        });
      }
    }
  },

  changeDate: function (e) {
    var date = e.currentTarget.dataset.date;
    var classid = e.currentTarget.dataset.classid[0];
    var date1 = new Date(date);
    this.getleavelist(date1, classid);
  },

  selectitem: function () {
    var that = this
    this.setData({
      select: (!that.data.select)
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