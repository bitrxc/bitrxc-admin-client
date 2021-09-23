import storage from '../utils/storage.js'

export default {
  saveUserInfo (state, userInfo) {
    state.userInfo = userInfo
    storage.setItem('userInfo', userInfo)
  },
  saveRoomList (state, roomList) {
    state.roomList = roomList
    storage.setItem('roomList', roomList)
  }
}
