import myRequest from '@/utils/myRequest.js'

export function acceptApply(applyId) {
  return myRequest({
    url: '/user/apply/accept',
    method: 'post',
    data: {
      'applyId': applyId
    }
  })
}

export function addApply(userApplyToAdd) {
  return myRequest({
    url: '/user/apply/add',
    method: 'post',
    data: userApplyToAdd
  })
}

export function deleteApply(userApplyId) {
  return myRequest({
    url: '/user/apply/deleteById',
    method: 'delete',
    data: {
      'userApplyId': userApplyId
    }
  })
}

export function deleteApplyByList(userApplyIDList) {
  return myRequest({
    url: '/user/apply/deleteByIdList',
    method: 'post',
    data: userApplyIDList
  })
}

export function getApplyPage(pageInfo) {
  return myRequest({
    url: '/user/apply/page',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'queryName': pageInfo.searchUserName,
      'queryAccount': pageInfo.searchUserAccount,
      'queryDevice': pageInfo.searchDeviceName
    }
  })
}

export function getOwnApplyPage(pageInfo) {
  return myRequest({
    url: '/user/apply/pageForMyOwn',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'queryDevice': pageInfo.searchDeviceName
    }
  })
}
