//index.js
//获取应用实例
// const app = getApp()

Page({
  data: {
    timePickerShow: true,
    timeArr: [{
      time: '8:00',
      id: '8:00'
  }, {
      time: '9:00',
      id: '9:00'
  }, {
      time: '10:00',
      id: '10:00'
  }, {
      time: '11:00',
      id: '11:00'
  }, {
      time: '12:00',
      id: '12:00'
  }, {
      time: '13:00',
      id: '13:00'
  }, {
      time: '14:00',
      id: '14:00'
  }, {
      time: '15:00',
      id: '15:00'
  }, {
      time: '16:00',
      id: '16:00'
  }, {
      time: '17:00',
      id: '17:00'
  }, {
      time: '18:00',
      id: '18:00'
  }, {
      time: '19:00',
      id: '19:00'
  },],
  num: 0,
  index_1:0
  },
  
  onLoad: function () {
    this.getDate()
  },
  scroll(e) {
    // console.log(e)
  },
  getDate() {//获得未来5天的日期以及对比先在的时间
    let dateArr = []
    let timeArr = this.data.timeArr
    let now = new Date()
    for (let i = 0; i < timeArr.length; i++) {    
        //设置当前时间是否可选
        let milliseconds = now.getTime() + 60 * 60 * 1000 //现在时间戳
        let year = now.getFullYear()
        let month = now.getMonth() + 1; //获取当前月
        let day = now.getDate(); //获取当前日
        let thisTime = year + '/' + month + '/' + day + ' ' + timeArr[i].time + ':00'
        let pseconds = new Date(thisTime).getTime()
        if (milliseconds < pseconds) {
            timeArr[i].select = true
        } else {
            timeArr[i].select = false
        }

    }
    for(let i=0;i<5;i++){ //获取未来5天的日期  
        let futureDate = now.getTime() + 1000 * 60 * 60 * 24 * i; //当i为0代表当前日期，为1时可以得到明天的日期的时间戳，以此类推
        let newMyDate = new Date(futureDate);//未来日期的时间戳
        let f_year = newMyDate.getFullYear()
        let f_month = newMyDate.getMonth() + 1; 
        let f_day = newMyDate.getDate(); 
        dateArr.push({
          date: f_month + '月' +f_day + "号",
          id: f_year + '/' + f_month + '/' + f_day
      })
    }
    this.setData({
        timeArr,
        dateArr
    })  
  },
  handleTimePicker(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    if (id == 1) {
        this.setData({
            timePickerShow: true
        });
    } else if (id == 0) {
        this.setData({
            timePickerShow: false
        });
    };

},
chooseDate(e) { //选择日期
    let id = e.currentTarget.dataset.id;
    // let num =this.data.num;
    let index=e.currentTarget.dataset.index
    let timeArr = this.data.timeArr;
    // console.log(index)
    // console.log(num)
    if (index > 0) {
        for (let i = 0; i < timeArr.length; i++) {
            timeArr[i].select = true
        };
    } else {
        this.getDate();
    };
    this.setData({
        timeArr,
        date: id,
        num:index
    });
},
chooseTime(e) { //选择时间
    let time = e.currentTarget.dataset.time;
    let index = e.currentTarget.dataset.index;
    this.setData({
        time,
        index_1: index
    });
},
timeConfirm() { //确定时间
    let date = this.data.dateArr[this.data.num].date;
    let date_1 = this.data.dateArr[this.data.num].id;
    let time = '';
    if (!this.data.time) {
        time = this.data.timeArr[0].time
    } else {
        time = this.data.time
    };
    let now = new Date()
    let milliseconds = now.getTime() //现在时间戳
    let thisTime = date_1 + ' ' + time
    let pseconds = new Date(thisTime).getTime()//选择的时间戳
    if (pseconds < milliseconds) {
        wx.showToast({
          title: '当前时间无效，请重新选择时间',
          duration:2000,
          icon: "none",
        })
      
        // app.alert("当前时间无效，请重新选择时间")
    } else {
        this.setData({
            date,
            time,
            serveTime: date + ' ' + time,
            upServeTime: date_1 + ' ' + time,
            // timePickerShow: false
        })
    };
},
 
})
