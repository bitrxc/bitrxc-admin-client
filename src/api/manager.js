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
  managerItem (params) {
    const { id } = params
    return request({
      url: `/managers/${id}`,
      method: 'get',
      mock: false
    })
  },
  managerModify (params) {
    const { id, email, mobile } = params
    return request({
      url: `/managers/${id}`,
      method: 'put',
      params: { email, mobile },
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
  },
  roleAssign (params) {
    const { id, roles } = params
    return request({
      url: `/managers/${id}/roles`,
      method: 'post',
      data: roles,
      mock: false
    })
  }
}
