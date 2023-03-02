<template>
  <view>
    <userList ref="userList"></userList>
    <uni-fab horizontal="right" vertical="bottom" @trigger="addUser"></uni-fab>
  </view>

</template>

<script>
  import userList from './component/userList.vue'

  export default {
    components: {
      userList
    },
    onPullDownRefresh() {
      this.$refs.userList.getPage()
      
      setTimeout(function() {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    data() {
      return {

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
