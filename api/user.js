import myRequest from '@/utils/myRequest.js'

export function login(data) {
  return myRequest({
    url: '/user/login',
    method: 'post',
    data: {
      'account': data.account,
      'password': data.password
    }
  })
}

export function getInfo(token) {
  return myRequest({
    url: '/user/info',
    method: 'get',
    data: {
      'token': token
    }
  })
}

export function logout() {
  return myRequest({
    url: '/user/logout',
    method: 'post'
  })
}

export function addUser(userInfo) {
  return myRequest({
    url: '/user/addUser',
    method: 'post',
    data: userInfo
  })
}

export function deleteUser(userIdToDelete) {
  return myRequest({
    url: '/user/delete',
    method: 'delete',
    data: {
      'userIdToDelete': userIdToDelete
    }
  })
}

export function deleteUserByList(userIdListToDelete) {
  return myRequest({
    url: '/user/deleteByIdList',
    method: 'delete',
    data: userIdListToDelete
  })
}

export function getUserInfo(id) {
  return myRequest({
    url: '/user/getById',
    method: 'get',
    data: {
      'id': id
    }
  })
}

export function updateUserInfo(userInfo) {
  return myRequest({
    url: '/user/update',
    method: 'put',
    data: userInfo
  })
}

export function getUserPage(pageInfo) {
  return myRequest({
    url: '/user/page',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'queryName': pageInfo.searchUserName,
      'queryAccount': pageInfo.searchUserAccount,
      'queryType': pageInfo.searchUserType
    }
  })
}

// export function sendUserInfo(userInfo) {
//   if (userInfo.id) {
//     return updateUserInfo(userInfo)
//   } else {
//     return addUser(userInfo)
//   }
// }
