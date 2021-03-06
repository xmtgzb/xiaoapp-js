import {
  http
} from '../request/http.js'


var url = {

  openid: '/login_wx',
  tianqi: 'https://www.tianqiapi.com/api/',
  upload: '/upload',  //单个上传文件
  uploadimg: '/uploadimg',
  oneimg:"/uploadOne",
  getDwFiles:"/getDwFiles"
}
module.exports = {

  tianqi(params) {
    return http({
      url: url.tianqi,
      method: "GET",
      data: params,

    })
  },

  getopenid(params) {
    return http({
      url: url.openid,
      method: "GET",
      data: params

    })
  },

  setupload(params) {
    return http({
      url: url.upload,
      method: "post",
      data: params

    })
  },
  setuploadimg(params) {
    return http({
      url: url.uploadimg,
      method: "post",
      data: params,
      header: {
        'Content-Type': 'multipart/form-data'
      }

    })
  },



  // 获取首页图片
  getDwFiles(params) {
    return http({
      url: url.getDwFiles,
      method: "post",
      data: params

    })
  },

}