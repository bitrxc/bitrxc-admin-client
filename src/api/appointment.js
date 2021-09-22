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
  }
}
