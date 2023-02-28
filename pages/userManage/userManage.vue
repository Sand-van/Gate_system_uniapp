<template>
  <view>
    <userList></userList>
    <uni-fab horizontal="right" vertical="bottom" @trigger="addUser" ></uni-fab>
  </view>
  
</template>

<script>
  import userList from './component/userList.vue'
  
  export default {
    components: {
      userList
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
