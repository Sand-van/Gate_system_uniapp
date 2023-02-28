<template>
  <view>
    <button @click="loginUser">test1</button>
    <button @click="getUserList">test2</button>
  </view>
</template>

<script>  
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      async loginUser(){
        const userData = {
          account: '123456',
          password: '123456'
        }
        const res = await this.$API.user.login(userData)
        uni.setStorageSync('token', res.token)
      },
      async getUserList(){
        const pageInfo = {
          'page': '1',
          'pageSize': '10'
        }
        const res = await this.$API.user.getUserPage(pageInfo)
        console.log(res)
      }
    }
  }
</script>

<style>

</style>
