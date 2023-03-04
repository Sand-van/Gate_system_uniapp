<template>
  <view>
    <scroll-view scroll-x="true">
      <view v-for="(item,index) in showModeList" :key="item.id" class="tabName" :data-current="index" @click="onTabTap">
        <text class="tabName_text" :class="showModeSelect == index?'active_text':''">{{item.name}}</text>
      </view>
    </scroll-view>
    
    <view v-show="showModeSelect == 0">
      <deviceInfo :deviceId='deviceId' ref="deviceInfo"></deviceInfo>
    </view>
    <view v-show="showModeSelect == 1">
      <deviceManagerTable v-if="nowLoginUserType == '3'" :deviceId='deviceId' ref="deviceManagerTable"></deviceManagerTable>
      <text v-else>没有权限</text>
    </view>
    <view v-show="showModeSelect == 2">
      <devicePermissionTable :deviceId='deviceId' ref="devicePermissionTable"></devicePermissionTable>
    </view>
    <view v-show="showModeSelect == 3">
      <deviceRecordsTable :deviceId='deviceId' ref="deviceRecordsTable"></deviceRecordsTable>
    </view>
  </view>
</template>

<script>
  import deviceInfo from './component/deviceInfo.vue'
  import deviceManagerTable from './component/deviceManagerTable.vue'
  import deviceRecordsTable from './component/deviceRecordsTable.vue'
  import devicePermissionTable from './component/devicePermissionTable.vue'

  export default {
    onLoad: function(option) {
      this.deviceId = option.deviceId
      this.nowLoginUserType = uni.getStorageSync('userType')
    },
    onPullDownRefresh() {
      this.$refs.deviceInfo.getDeviceInfo(this.deviceId)
      this.$refs.deviceManagerTable.getPage()
      this.$refs.devicePermissionTable.getPage()
      this.$refs.deviceRecordsTable.getPage()
      
      setTimeout(function() {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    data() {
      return {
        deviceId: '',
        nowLoginUserType: '',
        showModeList: [{
          name: '信息',
          id: 0
        }, {
          name: '管理员',
          id: 1
        }, {
          name: '权限',
          id: 2
        }, {
          name: '通行记录',
          id: 3
        }],

        showModeSelect: 0,
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
    },
    components: {
      deviceInfo,
      deviceManagerTable,
      deviceRecordsTable,
      devicePermissionTable
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
    width: 25%;
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
