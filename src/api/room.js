import request from '../utils/request.js'

export default {
  roomAdd (params) {
    return request({
      url: '/room',
      method: 'post',
      data: params,
      mock: true
    })
  },
  roomDelete (params) {
    const { id } = params
    return request({
      url: `/room/${id}`,
      method: 'delete',
      mock: true
    })
  },
  roomUpdate (params) {
    return request({
      url: '/room',
      method: 'put',
      data: params,
      mock: true
    })
  },
  roomItem (params) {
    const { id } = params
    return request({
      url: `/room/${id}`,
      method: 'get',
      mock: true
    })
  },
  roomItemByName (namelike) {
    return request({
      url: `/room/${namelike}`,
      method: 'get',
      mock: true
    })
  },
  roomList () {
    return request({
      url: '/room',
      method: 'get',
      mock: true
    })
  }
}
