<template>
  <view>
    <uni-card>
      <view class="uni-px-5">
        <uni-data-checkbox style="" mode="tag" v-model="showModeSelect" :localdata="showMode"></uni-data-checkbox>
      </view>
    </uni-card>

    <view v-show="showModeSelect == 0">
      <applyList></applyList>
      <uni-fab horizontal="right" vertical="bottom" @trigger="addApply"></uni-fab>
    </view>

    <view v-show="showModeSelect == 1">
      <applyManageList></applyManageList>
    </view>

  </view>
</template>

<script>
  import applyList from './component/applyList.vue'
  import applyManageList from './component/applyManageList.vue'

  export default {
    mounted() {
      this.loginUserType = uni.getStorageSync('userType')
    },
    data() {
      return {
        showMode: [{
          text: '我的申请',
          value: 0
        }, {
          text: '我管理的申请',
          value: 1
        }],

        showModeSelect: 0,
        loginUserType: '1',
      }
    },
    methods: {
      addApply() {
        
      }
    },
    components: {
      applyList,
      applyManageList
    }
  }
</script>

<style>
  .uni-px-5 {
    padding-left: 10rpx;
    padding-right: 10rpx;
  }
</style>
