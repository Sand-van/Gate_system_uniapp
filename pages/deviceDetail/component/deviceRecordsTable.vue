<template>
  <view>
    <uni-search-bar @confirm="getPage" v-model="searchUserName" @cancel="clearSearch" placeholder="请输入要搜索的用户名"
      @clear="clearSearch">
    </uni-search-bar>

    <uni-table ref="table" border stripe emptyText="暂无数据">
      <uni-tr>
        <uni-th align="center">通行时间</uni-th>
        <uni-th align="center">设备名</uni-th>
        <uni-th align="center">用户名</uni-th>
        <uni-th align="center">卡id</uni-th>
        <uni-th align="center">结果</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in recordList" :key="index">
        <uni-td>
          <view class="name">{{ item.permissionTime }}</view>
        </uni-td>
        <uni-td>{{ item.deviceName }}</uni-td>
        <uni-td>{{ item.userName }}</uni-td>
        <uni-td>{{ item.cardId }}</uni-td>
        <uni-td align="center">
          <uni-tag v-if="item.isSuccess == '0'" text="非法访问" type="error" />
          <uni-tag v-else-if="item.isSuccess == '1'" text="成功" type="primary" />
        </uni-td>
      </uni-tr>
    </uni-table>
    <view class="uni-pagination-box">
      <uni-pagination show-icon :page-size="pageSize" :current="page" :total="total" @change="getPageByPagination" />
    </view>
  </view>
</template>

<script>
  export default {
    props: ['deviceId'],
    mounted() {
      this.getPage()
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: '',
        searchUserName: '',
        recordList: []
      }
    },
    methods: {
      async getPage() {
        const pageInfo = {
          'page': this.page,
          'pageSize': this.pageSize,
          'queryUserId': '',
          'queryDeviceId': this.deviceId,
          'searchUserName': this.searchUserName,
          'searchUserAccount': '',
          'queryDeviceName': '',
          'beginTime': '',
          'endTime': '',
        }
        let res = await this.$API.permissionRecords.getRecordsPage(pageInfo)
        this.total = res.data.total
        this.recordList = res.data.records
      },
      getPageByPagination(e) {
        this.page = e.current
        this.getPage()
      },
      clearSearch() {
        this.searchUserName = ''
        this.getPage()
      },
    },
  }
</script>

<style>
</style>
