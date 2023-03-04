<template>
  <view>
    <scroll-view scroll-x="true">
      <view v-for="(item,index) in showModeList" :key="item.id" class="tabName" :data-current="index" @click="onTabTap">
        <text class="tabName_text" :class="showModeSelect == index?'active_text':''">{{item.name}}</text>
      </view>
    </scroll-view>

    <view v-show="showModeSelect == 0">
      <applyTable ref="applyTable"></applyTable>
      <uni-fab horizontal="right" vertical="bottom" @fabClick="addApply"></uni-fab>
    </view>

    <view v-show="showModeSelect == 1">
      <applyManageTable ref="applyManageTable" v-if="loginUserType != '1'"></applyManageTable>
      <text v-else>没有权限</text>
    </view>

  </view>
</template>

<script>
  import applyTable from './component/applyTable.vue'
  import applyManageTable from './component/applyManageTable.vue'

  export default {
    onLoad() {
      this.loginUserType = uni.getStorageSync('userType')
    },
    onPullDownRefresh() {
      this.$refs.applyTable.getPage()
      this.$refs.applyManageTable.getPage()
      setTimeout(function() {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    data() {
      return {
        showModeList: [{
          name: '我的申请',
          id: 0
        }, {
          name: '我管理的申请',
          id: 1
        }],

        showModeSelect: 0,
        loginUserType: '',
      }
    },
    methods: {
      addApply() {
        uni.navigateTo({
          url: '/pages/applyAdd/applyAdd'
        })
      },
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
      applyTable,
      applyManageTable
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
    width: 30%;
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
