import storage from '../utils/storage.js'

export default {
  saveUserInfo (state, userInfo) {
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  },
  saveRoomList (state, roomList) {
    state.roomList = roomList
    storage.setItem('roomList', roomList)
  },
  saveBeginTimes (state, beginTimes) {
    const obj = {}
    beginTimes.forEach(item => {
      obj[item.id] = item.time
    })
    state.beginTimes = obj
    storage.setItem('beginTimes', obj)
  },
  saveEndTimes (state, endTimes) {
    const obj = {}
    endTimes.forEach(item => {
      obj[item.id] = item.time
    })
    state.endTimes = obj
    storage.setItem('endTimes', obj)
  },
  saveRoleList (state, roleList) {
    state.roleList = roleList
    storage.setItem('roleList', roleList)
  },
  clear (state) {
    state.userInfo = {}
    state.roomList = []
    state.beginTimes = []
    state.endTimes = []
    storage.clearAll()
  }
}
