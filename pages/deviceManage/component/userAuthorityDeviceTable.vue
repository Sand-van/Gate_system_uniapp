<template>
  <view>
    <uni-search-bar @confirm="getPage" v-model="searchDeviceName" @cancel="clearSearch" placeholder="请输入要搜索的设备名"
      @clear="clearSearch">
    </uni-search-bar>

    <uni-table ref="table" border stripe emptyText="暂无数据">
      <uni-tr>
        <uni-th align="center">设备名</uni-th>
        <uni-th align="center">起始时间</uni-th>
        <uni-th align="center">结束时间</uni-th>
        <uni-th align="center">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in deviceDataList" :key="index">
        <uni-td>
          <view align="center">{{ item.deviceName }}</view>
        </uni-td>
        <uni-td>
          <view>{{ item.beginTime }}</view>
        </uni-td>
        <uni-td>
          <view>{{ item.endTime }}</view>
        </uni-td>
        <uni-td align="center">
          <view class="uni-group">
            <button class="uni-button" size="mini" type="primary" @click="openDoor(item.deviceId)">开启</button>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
    <view class="uni-pagination-box">
      <uni-pagination show-icon :page-size="pageSize" :current="page" :total="total" @change="getPageByPagination" />
    </view>
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
    mounted() {
      this.getPage()
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: '',
        searchDeviceName: '',
        deviceDataList: [],
        msgData: {
          msg: '',
          type: '',
        }
      }
    },
    methods: {
      async getPage() {
        const pageInfo = {
          page: this.page,
          pageSize: this.pageSize,
          queryUserId: uni.getStorageSync('userId'),
          queryDeviceId: '',
          searchUserName: '',
          searchUserAccount: '',
          searchDeviceName: this.searchDeviceName,
        }
        let res = await this.$API.userPermit.getPermitPage(pageInfo)
        this.total = res.data.total
        this.deviceDataList = res.data.records
      },
      getPageByPagination(e) {
        this.page = e.current
        this.getPage()
      },
      clearSearch() {
        this.searchUserName = ''
        this.getPage()
      },
      async openDoor(deviceId) {
        let res = await this.$API.deviceManage.openDevice(deviceId)
        if (res.code == 200){
          this.msgData.msg = '开启成功'
          this.msgData.type = 'success'
          this.$refs.message.open()
        } else {
          this.msgData.msg = '开启失败'
          this.msgData.type = 'error'
          this.$refs.message.open()
        }
      }
    },
  }
</script>

<style>
</style>
