<template>
  <view>
    <uni-card>
      <uni-table ref="table" border stripe>
        <uni-tr>
          <uni-th><uni-icons type="person"/>  用户名</uni-th>
          <uni-td>{{userInfo.name}}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="staff"/>  用户账号</uni-th>
          <uni-td>{{userInfo.account}}</uni-td>
        </uni-tr><uni-tr>
          <uni-th><uni-icons type="scan"/>  校园卡id</uni-th>
          <uni-td>{{userInfo.cardId}}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="phone"/>  电话 </uni-th>
          <uni-td>{{userInfo.phoneNumber}}</uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="settings-filled"/>  用户类型</uni-th>
          <uni-td>
            <uni-tag v-if="userInfo.type == '1'" text="普通用户" type="success" />
            <uni-tag v-else-if="userInfo.type == '2'" text="管理员" type="warning" />
            <uni-tag v-else-if="userInfo.type == '3'" text="超级管理员" type="error" />
          </uni-td>
        </uni-tr>
        <uni-tr>
          <uni-th><uni-icons type="compose"/>用户id</uni-th>
          <uni-td>{{userInfo.id}}</uni-td>
        </uni-tr>
      </uni-table>
    </uni-card>
  </view>
</template>

<script>
  export default {
    props: ['userId'],
    mounted() {
      this.getUserInfo(this.userId)
    },
    data() {
      return {
        userInfo: {
          account: '',
          cardId: '',
          id: '',
          name: '',
          phoneNumber: '',
          type: ''
        }
      }
    },
    methods: {
      async getUserInfo(userId) {
        let res = await this.$API.user.getUserInfo(userId)
        this.userInfo = res.data
      }
    }
  }
</script>

<style>
</style>