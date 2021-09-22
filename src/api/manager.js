import request from '../utils/request.js'

export default {
  managerList (params) {
    return request({
      url: '/managers',
      method: 'get',
      data: params
    })
  }
}
