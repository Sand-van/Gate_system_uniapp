import {
  login
} from "../api/user";

export default function myRequest(param) {
  var baseUrl = uni.getStorageSync('base_url')
  if ((baseUrl == '') || (typeof baseUrl == 'undefined')) {
    uni.setStorageSync('base_url', 'http://10.73.128.31:8080')
    baseUrl = 'http://10.73.128.31:8080'
  }
  // 请求参数
  var url = param.url,
    method = param.method,
    data = param.data || {},
    // hideLoading = param.hideLoading || false,
    header = {},

    //拼接完整请求地址
    requestUrl = baseUrl + url;

  //请求方式:GET或POST(POST需配置
  // header: {'content-type' : "application/x-www-form-urlencoded"},)
  if (method) {
    method = method.toUpperCase(); //小写改为大写
    if (method == "GET") {
      header = {
        'token': uni.getStorageSync('token'),
        'content-type': "application/x-www-form-urlencoded",
        'Access-Control-Allow-Origin': "http://127.0.0.1:8080"
      };
    } else {
      header = {
        'token': uni.getStorageSync('token'),
        'content-type': "application/json",
        'Access-Control-Allow-Origin': "http://127.0.0.1:8080"
      };
    }
  }

  // 返回promise
  return new Promise((resolve, reject) => {
    // 请求
    uni.request({
      url: requestUrl,
      data: data,
      method: method,
      header: header,
      timeout: 5000,
      success: (res) => {
        // 判断 请求api 格式是否正确
        if (res.statusCode && res.statusCode != 200) {
          uni.showToast({
            title: "api错误" + res.errMsg,
            icon: 'none'
          });
          return;
        }

        if (res.data.code == 430) {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }

        if (res.data.code == 431) {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          // relogin()
          // 重新登录
          setTimeout(function() {
            uni.reLaunch({
              url: '/pages/login/login'
            })
          }, 1000)

          return;
        }

        if (res.data.code == 200) {
          resolve(res.data)
        }
      },
      //请求失败
      fail: (err) => {
        uni.showToast({
          title: "服务器连接失败，请连接到校园网",
          icon: 'none'
        });
        reject(err.data);
      },
    })
  })

}

// 将密码存储在本地是否过于危险？自动从新登录暂且不使用
function relogin() {
  const data = {
    account: uni.getStorageInfoSync('account'),
    password: uni.getStorageInfoSync('password')
  }
  const res = login(data)
  uni.setStorageSync('token', res.token)
  uni.setStorageSync('userId', res.data.id)
  uni.setStorageSync('userType', res.data.type)
}
