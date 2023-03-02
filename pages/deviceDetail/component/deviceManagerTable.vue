<template>
  <view>
    <uni-search-bar @confirm="getPage" v-model="searchUserName" @cancel="clearSearch"
      placeholder="请输入要搜索的用户名" @clear="clearSearch">
    </uni-search-bar>
  
    <uni-table ref="table" border stripe type="selection" emptyText="暂无数据">
      <uni-tr>
        <uni-th align="center">用户名</uni-th>
        <uni-th align="center">创建时间</uni-th>
        <uni-th align="center">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in adminDataList" :key="index">
        <uni-td>
          <view class="name">{{ item.adminName }}</view>
        </uni-td>
        <uni-td>{{ item.createTime }}</uni-td>
        <uni-td align="center">
          <view class="uni-group">
            <button class="uni-button" size="mini" type="primary">查看用户</button>
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
      this.getPage()
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: '',
        searchUserName: '',
        adminDataList: []
      }
    },
    methods: {
      async getPage() {
        const pageInfo = {
          'page': this.page,
          'pageSize': this.pageSize,
          'deviceId': this.deviceId,
          'searchUserAccount': '',
          'searchUserName': this.searchUserName
        }
        let res = await this.$API.adminAuthority.getAuthorityPageByDeviceID(pageInfo)
        this.total = res.data.total
        this.adminDataList = res.data.records
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