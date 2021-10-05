import request from '../utils/request.js'

export default {
  roleList () {
    return request({
      url: '/managers/roles',
      method: 'get',
      mock: false
    })
  }
}
