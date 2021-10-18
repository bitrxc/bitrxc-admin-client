import request from '../utils/request.js'

export default {
  roomAdd (params) {
    return request({
      url: '/room',
      method: 'post',
      data: params,
      mock: false
    })
  },
  roomDelete (params) {
    const { id } = params
    return request({
      url: `/room/${id}`,
      method: 'delete',
      mock: false
    })
  },
  roomUpdate (params) {
    return request({
      url: '/room',
      method: 'put',
      data: params,
      mock: false
    })
  },
  roomItem (params) {
    const { id } = params
    return request({
      url: `/room/${id}`,
      method: 'get',
      mock: false
    })
  },
  roomItemByName (namelike) {
    return request({
      url: `/room/${namelike}`,
      method: 'get',
      mock: false
    })
  },
  roomList () {
    return request({
      url: '/room',
      method: 'get',
      mock: false
    })
  },
  roomFreeTime (params) {
    return request({
      url: '/appointment/availablePeriod',
      method: 'get',
      data: params,
      mock: false
    })
  }
}
