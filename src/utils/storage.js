/**
 * storage 二次封装
 */
import config from '../config/index.js'

export default {
  getStorage () {
    return JSON.parse(
      window.localStorage.getItem(config.namespace) || '{}'
    )
  },
  setItem (key, val) {
    const storage = this.getStorage()
    storage[key] = val
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  getItem (key) {
    return this.getStorage()[key]
  },
  clearItem (key) {
    const storage = this.getStorage()
    delete storage[key]
    window.localStorage.setItem(config.namespace, JSON.stringify(storage))
  },
  clearAll () {
    window.localStorage.setItem(config.namespace, '')
  }
}
