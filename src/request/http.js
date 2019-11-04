/**
 * 封装http 请求方法
 */


const apiUrl = "http://localhost:8080"; //服务器api地址


// loading配置，请求次数统计
function startLoading() {
  wx.showLoading({
    title: '请稍候',
    icon: 'none'
  })
}
function endLoading() {
  wx.hideLoading();
}
// 声明一个对象用于存储请求个数
var needLoadingRequestCount = 0;
function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
};
function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
};



const http = (params) => {
  showFullScreenLoading()
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiUrl + params.url,//服务器url+参数中携带的接口具体地址
      data: params.data,//请求参数
      header: params.header || {
        'Content-Type': 'application/json; charset=UTF-8' ,
        'uniqueFlag':wx.getStorageSync('uniqueFlag') || ''
        
        //设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      },
      method: params.method || 'POST',//默认为GET,可以不写，如常用请求格式为POST，可以设置POST为默认请求方式
      dataType: params.dataType,//返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      // responseType: params.responseType,//响应的数据类型
      success: function (res) {
        //接口访问正常返回数据
        if (res.statusCode == 200) {
          //1. 操作成功返回数据,原则上只针对服务器端返回成功的状态（如本例中为000000）
          if (res.data) {
            resolve(res.data)
          }
        } else {
          //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示
          // var errMsg = res.data.message
          // errorToast();
          // console.log(res.data)
        }
        tryHideFullScreenLoading();

        // return res
      },
      fail: function (e) {
        // errorToast();
        // reject(e)
        console.log('失败了')
        tryHideFullScreenLoading();

      }
    })
  })
}
module.exports = {
  http: http
}