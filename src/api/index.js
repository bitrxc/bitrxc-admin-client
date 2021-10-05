import request from '../utils/request.js'
import userFunctions from './user.js'
import appointmentFunctions from './appointment.js'
import roleFunctions from './role.js'
import managerFunctions from './manager.js'
import roomFunctions from './room.js'

export default {
  ...userFunctions,
  ...appointmentFunctions,
  ...roleFunctions,
  ...managerFunctions,
  ...roomFunctions,
  timeList () {
    return request({
      url: '/timelist',
      method: 'get',
      mock: true
    })
  }
}
