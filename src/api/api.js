import {
  http
} from '../request/http.js'


var url = {
  userLogin: "/user/login", 
  getUserPhone: "/user/phone", 
  openid:'/login_wx?code='

}
module.exports = {
  userLogin(code) {
    return http({      
      url: url.userLogin,
      data: { code: code},
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  },
  getUserPhone(params) {
    return http({
      url: url.getUserPhone,
      data: params
    })
  },
  getopenid(params) {
    return http({
      url: url.openid,
      method:"GET",
      data: params

    })
  },

}