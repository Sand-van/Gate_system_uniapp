<template>
  <view>
    <button @click="loginUser">test1</button>

    <scroll-view scroll-x="true">
      <view v-for="(item,index) in showModeList" :key="item.id" class="tabName" :data-current="index" @click="onTabTap">
        <text class="tabName_text" :class="showModeSelect == index?'active_text':''">{{item.name}}</text>
      </view>
    </scroll-view>

    <!--    <swiper :current="showModeSelect" @change="tabChange">
      <swiper-item>
        <view>
          <userAuthorityDeviceTable ref="userAuthorityDeviceTable"></userAuthorityDeviceTable>
        </view>
      </swiper-item>
      <swiper-item>
        <superAdminManageDeviceTable v-if="loginUserType=='3'" ref="superAdminManageDeviceTable">
        </superAdminManageDeviceTable>

        <adminManageDeviceTable v-if="loginUserType == '2'" ref="adminManageDeviceTable"></adminManageDeviceTable>
      </swiper-item>
    </swiper> -->
    <view v-show="showModeSelect == 1">
      <superAdminManageDeviceTable v-if="loginUserType == '3'" ref="superAdminManageDeviceTable">
      </superAdminManageDeviceTable>
      <adminManageDeviceTable v-if="loginUserType == '2'" ref="adminManageDeviceTable">
        </adminManageDeviceTable>
    </view>

    <view v-show="showModeSelect == 0">
      <userAuthorityDeviceTable ref="userAuthorityDeviceTable"></userAuthorityDeviceTable>
    </view>
  </view>
</template>

<script>
  import superAdminManageDeviceTable from './component/superAdminManageDeviceTable.vue'
  import adminManageDeviceTable from './component/adminManageDeviceTable.vue'
  import userAuthorityDeviceTable from './component/userAuthorityDeviceTable.vue'

  export default {
    components: {
      superAdminManageDeviceTable,
      adminManageDeviceTable,
      userAuthorityDeviceTable,
    },
    mounted() {
      this.loginUserType = uni.getStorageSync('userType')
    },
    onPullDownRefresh() {
      if (this.loginUserType == 3) {
        this.$refs.superAdminManageDeviceTable.getPage()
      } else if (this.loginUserType == 2) {
        this.$refs.adminManageDeviceTable.getPage()
      }
      this.$refs.userAuthorityDeviceTable.getPage()
      setTimeout(function() {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    data() {
      return {
        showModeList: [{
          name: '有权限的设备',
          id: 0
        }, {
          name: '设备管理',
          id: 1
        }],

        showModeSelect: 0,
        loginUserType: '1',
      }
    },
    methods: {
      onTabTap(e) {
        let index = e.target.dataset.current || e.currentTarget.dataset.current;
        this.switchTab(index);
      },
      switchTab(index) {
        if (this.showModeSelect == index) {
          return
        }
        this.showModeSelect = index;
      },
      tabChange(e) {
        console.log(e)
        let index = e.target.current || e.detail.current; // 获取到当前移动到第几个
        this.switchTab(index);
      },

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

<style lang="scss">
  .uni-px-5 {
    padding-left: 10rpx;
    padding-right: 10rpx;
  }

  #tab {
    width: 100%;
    display: flex;
  }

  .tabName {
    text-align: center;
    width: 33%;
    display: inline-block;
    height: 80rpx;
    line-height: 80rpx;
    white-space: nowrap;
  }

  .tabName_text {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .active_text {
    background-color: $uni-primary;
    color: #FFFFFF;
  }

  #tabContent {
    width: 100%;
  }
</style>
