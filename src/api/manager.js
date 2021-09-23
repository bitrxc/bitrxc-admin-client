import request from '../utils/request.js'

export default {
  managerList (params) {
    return request({
      url: '/managers',
      method: 'get',
      data: params
    })
  },
  managerAdd (params) {
    return request({
      url: '/managers',
      method: 'post',
      data: params
    })
  },
  managerDelete (params) {
    const { id } = params
    return request({
      url: `/managers/${id}`,
      method: 'delete'
    })
  }
}
