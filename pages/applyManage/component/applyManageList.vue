<template>
  <view>
    <uni-search-bar @confirm="getPage" v-model="searchDeviceName" @cancel="clearSearch" placeholder="请输入要搜索的设备名"
      @clear="clearSearch">
    </uni-search-bar>

    <uni-table ref="table" border stripe type="selection" emptyText="暂无数据">
      <uni-tr>
        <uni-th align="center">用户名</uni-th>
        <uni-th align="center">设备名</uni-th>
        <uni-th align="center">开始时间</uni-th>
        <uni-th align="center">结束时间</uni-th>
        <uni-th align="center">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in applyList" :key="index">
        <uni-td align="center">
          {{ item.userName }}
        </uni-td>
        <uni-td align="center">
          {{ item.deviceName }}
        </uni-td>
        <uni-td align="center">
          {{ item.beginTime }}
        </uni-td>
        <uni-td align="center">
          {{ item.endTime }}
        </uni-td>
        <uni-td align="center">
          <view class="uni-group">
            <button class="uni-button" size="mini" type="primary">同意</button>
            <button class="uni-button" size="mini" type="warn">拒绝</button>
          </view>
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
    mounted() {
      this.getPage()
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: '',
        searchDeviceName: '',
        applyList: []
      }
    },
    methods: {
      async getPage() {
        const pageInfo = {
          page: this.page,
          pageSize: this.pageSize,
          searchUserName: '',
          searchUserAccount: '',
          searchDeviceName: this.searchDeviceName,
        }
        let res = await this.$API.userApply.getApplyPage(pageInfo)
        this.total = res.data.total
        this.applyList = res.data.records
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
