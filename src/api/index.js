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
  ...roomFunctions
}
