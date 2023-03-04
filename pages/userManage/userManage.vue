<template>
  <view v-if="loginUserType == '3'">
    <userList ref="userList"></userList>
    <uni-fab horizontal="right" vertical="bottom" @trigger="addUser"></uni-fab>
  </view>
  <view v-else>
    <text>没有权限</text>
  </view>

</template>

<script>
  import userList from './component/userList.vue'

  export default {
    components: {
      userList
    },
    onLoad() {
      this.loginUserType = uni.getStorageSync('userType')
    },
    onShow() {
      this.loginUserType = uni.getStorageSync('userType')
    },
    onPullDownRefresh() {
      this.$refs.userList.getPage()
      
      setTimeout(function() {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    data() {
      return {
        loginUserType: ''
      }
    },
    methods: {
      addUser() {

      }
    }
  }
</script>

<style>

</style>
