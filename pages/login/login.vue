<template>
  <view class="login-container">
    <uni-card>
      <uni-forms class="login-form" :model="loginData">
        <view class="title-container">
          <text class="title">用户登录</text>
        </view>
        <uni-forms-item>
          <uni-easyinput prefixIcon='person' trim="all" v-model="loginData.account" placeholder="账户"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item>
          <uni-easyinput prefixIcon='locked' trim="all" v-model="loginData.password" placeholder="密码" type="password">
          </uni-easyinput>
        </uni-forms-item>
        <button class="uni-button" size="default" type="primary" @click="loginUser">登录</button>

      </uni-forms>
    </uni-card>
    <view>
      <button type="default" style="width: 25%;" @click="showForm">设置</button>
    </view>
    <view>
      <uni-popup ref="inputDialog" type="dialog">
        <uni-popup-dialog ref="inputClose" mode="input" :value="baseUrl" title="编辑服务器地址" placeholder="请输入内容"
          @confirm="setUrl"></uni-popup-dialog>
      </uni-popup>
    </view>
  </view>
</template>

<script>
import { getInfo } from '../../api/user'
  export default {
    data() {
      return {
        loginData: {
          account: '',
          password: ''
        },
        baseUrl: '',
      }
    },
    onLoad() {
      // this.getInfo()
    },
    methods: {
      async loginUser() {
        const userData = {
          account: this.loginData.account,
          password: this.loginData.password
        }
        const res = await this.$API.user.login(userData)
        if (res.code == 200) {
          uni.setStorageSync('token', res.token)
          uni.setStorageSync('userId', res.data.id)
          uni.setStorageSync('userType', res.data.type)
          uni.switchTab({
            url: '/pages/me/me'
          })
        } else {
          console.log('fail')
        }
      },
      async getInfo() {
        let res = await this.$API.user.getInfo(uni.getStorageInfoSync('token'))
        if (res.code == 200)
        {
          uni.switchTab({
            url: '/pages/me/me'
          })
        }
      },
      showForm() {
        var baseUrl = uni.getStorageSync('base_url')
        if ((baseUrl == '') || (typeof baseUrl == 'undefined')) {
          uni.setStorageSync('base_url', 'http://10.73.128.31:8080')
        }
        this.baseUrl = baseUrl
        this.$refs.inputDialog.open()
      },
      setUrl(url) {
        console.log('set Url: ' + url)
        uni.setStorageSync('base_url', url)
        this.$refs.inputDialog.close()
      }
    }
  }
</script>


<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    min-height: 100%;
    width: 100%;
    // background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      // width: 520rpx;
      max-width: 100%;
      padding: 160rpx 35rpx 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14rpx;
      color: #fff;
      margin-bottom: 10rpx;

      span {
        &:first-of-type {
          margin-right: 16rpx;
        }
      }
    }

    .svg-container {
      padding: 6rpx 5rpx 6rpx 15rpx;
      color: $dark_gray;
      vertical-align: middle;
      width: 30rpx;
      display: inline-block;
    }

    .title-container {
      position: relative;
      margin-bottom: 50rpx;

      .title {
        font-size: 50rpx;
        margin: 0rpx auto 40rpx auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10rpx;
      top: 7rpx;
      font-size: 16rpx;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
