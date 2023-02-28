<template>
  <view>
    <button @click="loginUser">test1</button>

    <uni-card>
      <view class="uni-px-5">
        <uni-data-checkbox style="" mode="tag" v-model="showModeSelect" :localdata="showMode"></uni-data-checkbox>
      </view>
    </uni-card>

    <view v-show="showModeSelect == 1">
      <superAdminManageDeviceList v-if="loginUserType=='3'"></superAdminManageDeviceList>
      <adminManageDeviceList v-if="loginUserType == '2'"></adminManageDeviceList>
    </view>

    <view v-show="showModeSelect == 0">
      <userAuthorityDeviceList></userAuthorityDeviceList>
    </view>
  </view>
</template>

<script>
  import superAdminManageDeviceList from './component/superAdminManageDeviceList.vue'
  import adminManageDeviceList from './component/adminManageDeviceList.vue'
  import userAuthorityDeviceList from './component/userAuthorityDeviceList.vue'

  export default {
    components: {
      superAdminManageDeviceList,
      adminManageDeviceList,
      userAuthorityDeviceList,
    },
    mounted() {
      this.loginUserType = uni.getStorageSync('userType')
    },
    data() {
      return {
        showMode: [{
          text: '有权限的设备',
          value: 0
        }, {
          text: '设备管理',
          value: 1
        }],

        showModeSelect: 0,
        loginUserType: '1',
      }
    },
    methods: {
      async loginUser() {
        const userData = {
          account: '123456',
          password: '123456'
        }
        const res = await this.$API.user.login(userData)
        uni.setStorageSync('token', res.token)
        uni.setStorageSync('userId', res.data.id)
        uni.setStorageSync('userType', res.data.type)
      }
    }
  }
</script>

<style>
  .uni-px-5 {
    padding-left: 10rpx;
    padding-right: 10rpx;
  }
</style>
