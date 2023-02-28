import myRequest from '@/utils/myRequest.js'

export function addPermit(userPermitToAdd) {
  return myRequest({
    url: '/user/permit/add',
    method: 'post',
    data: userPermitToAdd
  })
}

export function addPermitByList(userPermitListToAdd) {
  return myRequest({
    url: '/user/permit/addByList',
    method: 'post',
    data: userPermitListToAdd
  })
}

export function deletePermit(userPermitId) {
  return myRequest({
    url: '/user/permit/deleteById',
    method: 'delete',
    data: {
      'userPermitId' : userPermitId
    }
  })
}

export function deletePermitByList(userPermitIdList) {
  return myRequest({
    url: '/user/permit/deleteByIdList',
    method: 'post',
    data: userPermitIdList
  })
}

export function getPermitPage(pageInfo) {
  return myRequest({
    url: '/user/permit/page',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'queryUserId': pageInfo.queryUserId,
      'queryDeviceId': pageInfo.queryDeviceId,
      'queryName': pageInfo.searchUserName,
      'queryAccount': pageInfo.searchUserAccount,
      'queryDevice': pageInfo.searchDeviceName
    }
  })
}
