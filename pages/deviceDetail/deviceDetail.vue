<template>
  <view>
    <uni-card>
      <view class="uni-px-5">
        <uni-data-checkbox style="" mode="tag" v-model="showModeSelect" :localdata="showMode"></uni-data-checkbox>
      </view>
    </uni-card>
    <view v-show="showModeSelect == 0">
      <deviceInfo :deviceId='deviceId' ref="deviceInfo"></deviceInfo>
    </view>
    <view v-show="showModeSelect == 1">
      <deviceManager :deviceId='deviceId' ref="deviceManager"></deviceManager>
    </view>
    <view v-show="showModeSelect == 2">
      <devicePermission :deviceId='deviceId' ref="devicePermission"></devicePermission>
    </view>
    <view v-show="showModeSelect == 3">
      <deviceRecords :deviceId='deviceId' ref="deviceRecords"></deviceRecords>
    </view>
  </view>
</template>

<script>
  import deviceInfo from './component/deviceInfo.vue'
  import deviceManager from './component/deviceManager.vue'
  import deviceRecords from './component/deviceRecords.vue'
  import devicePermission from './component/devicePermission.vue'

  export default {
    onLoad: function(option) {
      this.deviceId = option.deviceId
    },
    onPullDownRefresh() {
      this.$refs.deviceInfo.getDeviceInfo(this.deviceId)
      this.$refs.deviceManager.getPage()
      this.$refs.devicePermission.getPage()
      this.$refs.deviceRecords.getPage()
      
      setTimeout(function() {
        uni.stopPullDownRefresh()
      }, 1000)
    },
    data() {
      return {
        deviceId: '',
        showMode: [{
          text: '信息',
          value: 0
        }, {
          text: '管理员',
          value: 1
        }, {
          text: '权限',
          value: 2
        }, {
          text: '通行记录',
          value: 3
        }],

        showModeSelect: 0,
      }
    },
    methods: {
      beng() {

      },
    },
    components: {
      deviceInfo,
      deviceManager,
      deviceRecords,
      devicePermission
    }
  }
</script>

<style>

</style>
