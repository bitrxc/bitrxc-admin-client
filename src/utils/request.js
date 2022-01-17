/**
 * axios 二次封装
 */
import axios from 'axios'
import config from '../config'
import router from '../router'
import store from '../store'

import { ElMessage } from 'element-plus'

const TOKEN_INVALID = 'token 验证失败, 请重新登录'
const NETWORK_ERROR = '网络异常, 请检查网络是否连接'
const INTERNAL_ERROR = '服务器内部错误，请联系技术保障中心'
const UNKNOWN_ERROR = '未知错误，请联系技术保障中心'

const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})

// 请求拦截
service.interceptors.request.use(req => {
  const token = store.getters.token || ''
  if (token) {
    req.headers.token = token
  }
  return req
})

// 响应拦截
service.interceptors.response.use(res => {
  if (res.status === 200) {
    const { code, data, message } = res.data
    if (code === 401) {
      ElMessage.error(TOKEN_INVALID)
      router.push('/login')
      return undefined
    } else if (code === 400) {
      ElMessage.error(message)
      return undefined
    } else if (code === 200) {
      return data
    } else if (code === 500) {
      if (message === null) {
        ElMessage.error(INTERNAL_ERROR)
      } else {
        ElMessage.error(message)
      }
      return undefined
    } else {
      ElMessage.error(UNKNOWN_ERROR)
      return undefined
    }
  } else {
    ElMessage.error(NETWORK_ERROR)
  }
})

/**
 * 请求的核心函数
 * @todo 利用后端java文件生成接口的类型定义，来具体化option的类型
 * @example
 *  {
 *    url: "/user/name",
 *    method: "GET",
 *    param: {
 *      id: number
 *    },
 *    response: {
 *      name: string
 *    }
 *  }
 * @todo 区分返回值的类型，让错误返回值携带错误信息
 * @todo 开启严格null检查
 * @param {import("axios").AxiosRequestConfig} options 请求参数
 * @returns {import('axios').AxiosPromise<Record<string,any>|Record<number,any>|undefined>} 请求成功时，返回后端返回的请求体，
 *  否则返回`undefined`。检查js文件时默认不检查`null`，因此此接口的undefined返回会被忽略
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
    service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi
  }
  return service(options)
}

export default request
