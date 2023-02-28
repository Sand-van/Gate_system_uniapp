import myRequest from '@/utils/myRequest.js'

export function addAuthority(adminAuthorityToAdd) {
  return myRequest({
    url: '/admin/add',
    method: 'post',
    data: adminAuthorityToAdd
  })
}

export function addAuthorityList(adminAuthorityListToAdd) {
  return myRequest({
    url: '/admin/addByList',
    method: 'post',
    data: adminAuthorityListToAdd
  })
}

export function deleteAuthority(adminAuthorityId) {
  return myRequest({
    url: '/admin/deleteById',
    method: 'delete',
    data: {
      'adminAuthorityId': adminAuthorityId
    }
  })
}

export function getAuthorityPageByAdminID(pageInfo) {
  return myRequest({
    url: '/admin/page/adminId',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'adminId': pageInfo.adminId,
      'deviceName': pageInfo.searchDeviceName
    }
  })
}

export function getAuthorityPageByDeviceID(pageInfo) {
  return myRequest({
    url: '/admin/page/deviceId',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'deviceId': pageInfo.deviceId,
      'userAccount': pageInfo.searchUserAccount,
      'userName': pageInfo.searchUserName
    }
  })
}
