<template>
  <view>
    <uni-card>
      <uni-table ref="table" border stripe>
        <uni-tr>
          <uni-th><uni-icons type="wallet-filled"/>  设备名</uni-th>
          <uni-td>{{deviceInfo.name}}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="location"/>  ip</uni-th>
          <uni-td>{{deviceInfo.ip}}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="settings-filled"/>  状态</uni-th>
          <uni-td>
            <uni-tag v-if="deviceInfo.status == '1'" text="在线" type="success" />
            <uni-tag v-else-if="deviceInfo.status == '2'" text="离线" type="error" />
            <uni-tag v-else-if="deviceInfo.status == '3'" text="弃用" type="default" />
          </uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="compose"/>设备id</uni-th>
          <uni-td>{{deviceInfo.id}}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="calendar"/>创建时间</uni-th>
          <uni-td>{{deviceInfo.creatTime}}</uni-td>
        </uni-tr>
      </uni-table>
    </uni-card>
  </view>
</template>

<script>
  export default {
    props: ['deviceId'],
    mounted() {
      this.getDeviceInfo(this.deviceId)
    },
    data() {
      return {
        deviceInfo: {
          creatTime: '',
          id: '',
          ip: '',
          name: '',
          status: ''
        }
      }
    },
    methods: {
      async getDeviceInfo(deviceId) {
        let res = await this.$API.deviceManage.getDeviceInfo(deviceId)
        this.deviceInfo = res.data
      }
    }
  }
</script>

<style>
</style>
