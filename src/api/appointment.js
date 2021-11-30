import request from '../utils/request.js'

export default {
  // 订单列表
  appointmentList (params) {
    const { current, limit, schoolId, status } = params
    let url = null
    if (schoolId) {
      url = `/appointment/${current}/${limit}/${schoolId}`
    } else {
      url = `/appointment/${current}/${limit}`
    }
    return request({
      url,
      method: 'get',
      data: {
        status
      },
      mock: false
    })
  },
  // 订单详情
  appointmentItem (params) {
    return request({
      url: '/appointment',
      method: 'get',
      data: params,
      mock: false
    })
  },
  // 审批订单
  appointmentCheck (params) {
    const { id, checkNote, status, conductor } = params
    console.log(conductor)
    return request({
      url: `/appointment/check/${id}?checkNote=${checkNote}&status=${status}&conductor=${conductor}`,
      method: 'put',
      mock: false
    })
  },
  // 批量预约订单
  appointmentMany (params) {
    return request({
      url: '/appointment/appoint',
      method: 'post',
      data: params,
      mock: false
    })
  }
}
