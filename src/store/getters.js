export default {
  token (state) {
    return state.userInfo.token
  },
  username (state) {
    return state.userInfo.userInfo.username
  },
  roomList (state) {
    return state.roomList
  },
  roleList (state) {
    return state.roleList
  },
  beginTimes (state) {
    return state.beginTimes
  },
  endTimes (state) {
    return state.endTimes
  }
}
