import myRequest from '@/utils/myRequest.js'

export function getRecordsPage(pageInfo) {
  return myRequest({
    url: '/permissionRecords/page',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'queryUserId': pageInfo.queryUserId,
      'queryDeviceId': pageInfo.queryDeviceId,
      'queryName': pageInfo.searchUserName,
      'queryAccount': pageInfo.searchUserAccount,
      'queryDeviceName': pageInfo.searchDeviceName,
      'beginTime': pageInfo.searchBeginTime,
      'endTime': pageInfo.searchEndTime
    }
  })
}