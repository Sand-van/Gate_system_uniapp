<template>
  <view>
    <uni-forms class="form" :modelValue="applyData">
      <uni-forms-item label="设备" required>
        <uni-data-picker :localdata="deviceList" v-model="applyData.deviceId" popup-title="选择设备"
          :map="{text:'name', value:'id'}"></uni-data-picker>
      </uni-forms-item>
      <uni-forms-item label="开始时间" required>
        <uni-datetime-picker type="datetime" return-type="string" v-model="applyData.beginTime" />
      </uni-forms-item>
      <uni-forms-item label="结束时间" required>
        <uni-datetime-picker type="datetime" return-type="string" v-model="applyData.endTime" />
      </uni-forms-item>
    </uni-forms>

    <button type="primary" @click="submit">提交</button>

    <view>
      <!-- 提示信息弹窗 -->
      <uni-popup ref="message" type="message">
        <uni-popup-message :type="msgData.type" :message="msgData.msg" :duration="2000"></uni-popup-message>
      </uni-popup>
    </view>
  </view>
</template>

<script>
  export default {
    onLoad() {
      this.getDeviceList()
    },
    data() {
      return {
        applyData: {
          userId: '',
          deviceId: '',
          beginTime: '',
          endTime: ''
        },
        deviceList: [],
        msgData: {
          msg: '',
          type: '',
        }
      }
    },
    methods: {
      async submit() {
        if ((this.applyData.deviceId == '') || (this.applyData.beginTime == '') || (this.applyData.endTime == '')) {
          this.msgData.msg = '表单不完整'
          this.msgData.type = 'error'
          this.$refs.message.open()
          return
        }
        this.applyData.userId = uni.getStorageSync('userId')
        let res = await this.$API.userApply.addApply(this.applyData)
        if (res.code == 200) {
          this.msgData.msg = '申请成功'
          this.msgData.type = 'success'
          this.$refs.message.open()
          setTimeout(function() {
            uni.navigateBack()
          }, 1000)
        } else {
          this.msgData.msg = '错误'
          this.msgData.type = 'error'
          this.$refs.message.open()
        }
      },
      async getDeviceList() {
        let res = await this.$API.deviceManage.getDeviceSimpleInfo()
        this.deviceList = res.data
      }
    }
  }
</script>

<style>
  .form {
    padding: 15px;
    background-color: #fff;
  }

  .segmented-control {
    margin-bottom: 15px;
  }

  .form-item {
    display: flex;
    align-items: center;
  }

  .button {
    display: flex;
    align-items: center;
    height: 35px;
    margin-left: 10px;
  }
</style>
