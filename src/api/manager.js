import request from '../utils/request.js'

export default {
  managerList (params) {
    return request({
      url: '/managers',
      method: 'get',
      data: params,
      mock: false
    })
  },
  managerAdd (params) {
    return request({
      url: '/managers',
      method: 'post',
      data: params,
      mock: false
    })
  },
  managerDelete (params) {
    const { id } = params
    return request({
      url: `/managers/${id}`,
      method: 'delete',
      mock: false
    })
  }
}
