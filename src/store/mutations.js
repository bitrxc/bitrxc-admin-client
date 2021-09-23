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
    state.beginTimes = beginTimes
    storage.setItem('beginTimes', beginTimes)
  },
  saveEndTimes (state, endTimes) {
    state.endTimes = endTimes
    storage.setItem('endTimes', endTimes)
  }
}
