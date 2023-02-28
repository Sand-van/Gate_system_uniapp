<template>
  <view>
    <uni-search-bar @confirm="getPage" v-model="searchUserName" @cancel="clearSearch"
      placeholder="请输入要搜索的姓名" @clear="clearSearch">
    </uni-search-bar>

    <uni-table ref="table" border stripe type="selection" emptyText="暂无数据" @selection-change="selectionChange">
      <uni-tr>
        <uni-th align="center">姓名</uni-th>
        <uni-th align="center">学工号</uni-th>
        <uni-th align="center">用户类型</uni-th>
        <uni-th align="center">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in userDataList" :key="index">
        <uni-td>
          <view class="name">{{ item.name }}</view>
        </uni-td>
        <uni-td>{{ item.account }}</uni-td>
        <uni-td align="center">
          <uni-tag v-if="item.type == '1'" text="普通用户" type="success" />
          <uni-tag v-else-if="item.type == '2'" text="管理员" type="warning" />
          <uni-tag v-else-if="item.type == '3'" text="超级管理员" type="error" />
        </uni-td>
        <uni-td align="center">
          <view class="uni-group">
            <button class="uni-button" size="mini" type="primary">详情</button>
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
        searchUserName: '',
        userDataList: []
      }
    },
    methods: {
      selectionChange(e) {
        console.log(e.detail.index)
        this.selectedIndexs = e.detail.index
      },
      async getPage() {
        const pageInfo = {
          page: this.page,
          pageSize: this.pageSize,
          searchUserName: this.searchUserName,
          searchUserAccount: '',
          searchUserType: '',
        }
        let res = await this.$API.user.getUserPage(pageInfo)
        this.total = res.data.total
        this.userDataList = res.data.records
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
