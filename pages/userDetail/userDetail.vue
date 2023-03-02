<template>
  <view>
    <scroll-view scroll-x="true">
      <view v-for="(item,index) in showModeList" :key="item.id" class="tabName" :data-current="index" @click="onTabTap">
        <text class="tabName_text" :class="showModeSelect == index?'active_text':''">{{item.name}}</text>
      </view>
    </scroll-view>
    
    <view v-show="showModeSelect == 0">
      <userInfo :userId='userId'></userInfo>
    </view>
    <view v-show="showModeSelect == 1">
      <userPermissionTable :userId='userId'></userPermissionTable>
    </view>
    <view v-show="showModeSelect == 2">
      <userAuthorityTable :userId='userId'></userAuthorityTable>
    </view>
    <view v-show="showModeSelect == 3">
      <userRecordsTable :userId='userId'></userRecordsTable>
    </view>
    
  </view>
</template>

<script>
  import userInfo from './component/userInfo.vue'
  import userAuthorityTable from './component/userAuthorityTable.vue'
  import userPermissionTable from './component/userPermissionTable.vue'
  import userRecordsTable from './component/userRecordsTable.vue'

  export default {
    onLoad: function(option) {
      this.userId = option.userId
    },
    data() {
      return {
        userId: "",
        showModeList: [{
          name: '用户信息',
          id: 0
        }, {
          name: '权限',
          id: 1
        }, {
          name: '管理',
          id: 2
        }, {
          name: '通行记录',
          id: 3
        }],

        showModeSelect: 0,
      }
    },
    methods: {
      onTabTap(e) {
        let index = e.target.dataset.current || e.currentTarget.dataset.current;
        this.switchTab(index);
      },
      switchTab(index) {
        if (this.showModeSelect == index) {
          return
        }
        this.showModeSelect = index;
      },
    },
    components: {
      userInfo,
      userAuthorityTable,
      userPermissionTable,
      userRecordsTable
    }
  }
</script>

<style lang="scss">
  .uni-px-5 {
    padding-left: 10rpx;
    padding-right: 10rpx;
  }

  #tab {
    width: 100%;
    display: flex;
  }

  .tabName {
    text-align: center;
    width: 25%;
    display: inline-block;
    height: 80rpx;
    line-height: 80rpx;
    white-space: nowrap;
  }

  .tabName_text {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  .active_text {
    background-color: $uni-primary;
    color: #FFFFFF;
  }

  #tabContent {
    width: 100%;
  }
</style>
