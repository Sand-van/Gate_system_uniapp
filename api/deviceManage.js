import myRequest from '@/utils/myRequest.js'

export function addDevice(deviceInfo) {
  return myRequest({
    url: '/device/add',
    method: 'post',
    data: deviceInfo
  })
}

export function deleteDevice(deviceIdToDelete) {
  return myRequest({
    url: '/device/delete',
    method: 'delete',
    data: {
      'deviceIdToDelete': deviceIdToDelete
    }
  })
}

export function getDeviceInfo(deviceId) {
  return myRequest({
    url: '/device/getById',
    method: 'get',
    data: {
      'deviceId': deviceId
    }
  })
}

export function openDevice(deviceId) {
  return myRequest({
    url: '/device/openDevice',
    method: 'post',
    data: {
      'deviceId': deviceId
    }
  })
}

export function getDevicePage(pageInfo) {
  return myRequest({
    url: '/device/page',
    method: 'get',
    data: {
      'page': pageInfo.page,
      'pageSize': pageInfo.pageSize,
      'queryName': pageInfo.searchDeviceName
    }
  })
}

export function updateDeviceInfo(deviceInfo) {
  return myRequest({
    url: '/device/update',
    method: 'post',
    data: deviceInfo
  })
}

export function getDeviceSimpleInfo() {
  return myRequest({
    url: '/device/simpleInfo',
    method: 'get',
  })
}
