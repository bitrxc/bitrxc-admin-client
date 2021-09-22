/**
 * axios 二次封装
 */
import axios from 'axios'
import config from '../config'
import router from '../router'
import { ElMessage } from 'element-plus'

const TOKEN_INVALID = 'token 验证失败, 请重新登录'
const NETWORK_ERROR = '网络异常, 请检查网络是否连接'

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use(req => {
  // TO DO
  const headers = req.headers
  if (!headers.Authorization) {
    headers.Authorization = 'TEMP TOKEN'
  }
  return req
})

// 响应拦截
service.interceptors.response.use(res => {
  if (res.status === 200) {
    const { code, data, msg } = res.data
    if (code === 401) {
      ElMessage.error(TOKEN_INVALID)
      router.push('/login')
      return
    }
    if (code === 200) {
      return data
    }
    ElMessage.error(msg)
    throw Error(msg)
  } else {
    ElMessage.error(NETWORK_ERROR)
  }
})

/**
 * 请求的核心哈数
 * @params {Object} params
 */
function request (options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  if (typeof options.mock !== 'undefined') {
    config.mock = options.mock
  }
  if (config.env === 'production') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseApi = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

export default request
