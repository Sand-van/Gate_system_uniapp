const BASE_URL = 'http://10.73.128.31:8080'

/*
export const myRequest = (options) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method,
      data: options.data || {},
      header: {
        token: uni.getStorageSync('token')
      },
      timeout: 5000,
      success: (res) => {

        resolve(res)
      },
      fail: (err) => {

        reject(err)
      }
    })
  })
}
*/

export default function myRequest(param) {

  // 请求参数
  var url = param.url,
    method = param.method,
    data = param.data || {},
    // hideLoading = param.hideLoading || false,
    header = {},

    //拼接完整请求地址
    requestUrl = BASE_URL + url;

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
          return;
        }

        if (res.data.code == 200) {
          resolve(res.data)
        }
      },
      //请求失败
      fail: (err) => {
        uni.showToast({
          title: "" + err.data.msg,
          icon: 'none'
        });
        reject(err.data);
      },
    })
  })

}
