<template>
  <view>
    <uni-search-bar @confirm="getPage" v-model="searchDeviceName" @cancel="clearSearch" placeholder="请输入要搜索的设备名"
      @clear="clearSearch">
    </uni-search-bar>

    <uni-table ref="table" border stripe type="selection" emptyText="暂无数据">
      <uni-tr>
        <uni-th align="center">设备名</uni-th>
        <uni-th align="center">开始时间</uni-th>
        <uni-th align="center">结束时间</uni-th>
        <uni-th align="center">操作</uni-th>
      </uni-tr>
      <uni-tr v-for="(item, index) in applyList" :key="index">
        <uni-td>
          {{ item.deviceName }}
        </uni-td>
        <uni-td>
          {{ item.beginTime }}
        </uni-td>
        <uni-td align="center">
          {{ item.endTime }}
        </uni-td>
        <uni-td align="center">
          <view class="uni-group">
            <button class="uni-button" size="mini" type="warn" @click="deleteApply(item.id)">删除</button>
          </view>
        </uni-td>
      </uni-tr>
    </uni-table>
    <view class="uni-pagination-box">
      <uni-pagination show-icon :page-size="pageSize" :current="page" :total="total" @change="getPageByPagination" />
    </view>
    
    <uni-popup ref="message" type="message">
      <uni-popup-message :type="msgData.type" :message="msgData.msg" :duration="2000"></uni-popup-message>
    </uni-popup>
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
        applyList: [],
        msgData:{
          msg:'',
          type:'',
        }
      }
    },
    methods: {
      async getPage() {
        const pageInfo = {
          page: this.page,
          pageSize: this.pageSize,
          searchDeviceName: this.searchDeviceName,
        }
        let res = await this.$API.userApply.getOwnApplyPage(pageInfo)
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
      async deleteApply(applyId) {
        let res = await this.$API.userApply.deleteApply(applyId)
        if (res.code == 200){
          this.msgData.msg = '删除成功'
          this.msgData.type = 'success'
          this.$refs.message.open()
        } else {
          this.msgData.msg = res.msg
          this.msgData.type = 'error'
          this.$refs.message.open()
        }
        this.getPage()
      }
    },
  }
</script>

<style>
</style>
