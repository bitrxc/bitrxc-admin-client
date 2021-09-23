import request from '../utils/request.js'

export default {
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
      }
    })
  },
  appointmentItem (params) {
    return request({
      url: '/appointment',
      method: 'get',
      data: params
    })
  },
  // 审批订单
  appointmentCheck (params) {
    const { id, checkNote, status, conductor } = params
    console.log(conductor)
    return request({
      url: `/appointment/check/${id}?checkNote=${checkNote}&status=${status}&conductor=${conductor}`,
      method: 'put'
    })
  }
}
