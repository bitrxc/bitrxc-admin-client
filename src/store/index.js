import { createStore } from 'vuex'
import storage from '../utils/storage.js'
import getters from './getters.js'
import mutations from './mutations.js'

const state = {
  userInfo: storage.getItem('userInfo') || {},
  roomList: storage.getItem('roomList') || [],
  roleList: storage.getItem('roleList') || [],
  beginTimes: storage.getItem('beginTimes') || {},
  endTimes: storage.getItem('endTimes') || {}
}

export default createStore({
  state,
  mutations,
  getters
})
