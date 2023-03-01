<template>
  <view>
    <uni-search-bar @confirm="getPage" v-model="searchUserName" @cancel="clearSearch" placeholder="请输入要搜索的用户名"
      @clear="clearSearch">
    </uni-search-bar>

    <uni-table ref="table" border stripe type="selection" emptyText="暂无数据">
      <uni-tr>
        <uni-th align="center">用户名</uni-th>
        <uni-th align="center">开始时间</uni-th>
        <uni-th align="center">结束时间</uni-th>
        <uni-th align="center">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in userPermitList" :key="index">
        <uni-td>
          <view>{{ item.userName }}</view>
        </uni-td>
        <uni-td>
          {{ item.beginTime }}
        </uni-td>
       <uni-td>
          {{ item.endTime }}
        </uni-td>
        <uni-td align="center">
          <view class="uni-group">
            <button class="uni-button" size="mini" type="warn">删除</button>
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
    props: ['deviceId'],
    mounted() {
      this.getPage(this.deviceId)
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: '',
        searchUserName: '',
        userPermitList: []
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
          'searchDeviceName': '',
        }
        let res = await this.$API.userPermit.getPermitPage(pageInfo)
        this.total = res.data.total
        this.userPermitList = res.data.records
      },
      getPageByPagination(e) {
        this.page = e.current
        this.getPage()
      },
      clearSearch() {
        this.searchUserName = ''
        this.getPage()
      },
    }
  }
</script>

<style>
</style>
