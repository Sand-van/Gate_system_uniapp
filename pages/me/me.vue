<template>
  <view>
    <userInfo :userId='loginUserId' ></userInfo>
    <button style="width: 90%; margin-top: 100rpx;" size="default" type="warn" @click="logoutUser">注销账号</button>
  </view>
  
</template>

<script>
  import userInfo from '@/pages/userDetail/component/userInfo.vue'
  export default {
    data() {
      return {
        loginUserId: ''
      }
    },
    onLoad() {
      this.loginUserId = uni.getStorageSync('userId')
    },
    onShow() {
      this.loginUserId = uni.getStorageSync('userId')
    },
    methods: {
      logoutUser(){
        this.$API.user.logout()
        uni.clearStorage()
        uni.reLaunch({
          url:'/pages/login/login'
        })
      }
    },
    components: {
      userInfo
    }
  }
</script>

<style>

</style>
