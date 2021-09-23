export default {
  token (state) {
    return state.userInfo.token
  },
  username (state) {
    return state.userInfo.userInfo.username
  }
}
