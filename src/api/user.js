import request from '../utils/request.js'

export default {
  /**
   *
   * @param {{username:string,password:string}} params
   * @returns
   */
  login (params) {
    return request({
      url: '/login',
      method: 'post',
      data: params,
      mock: false
    })
  },
  /**
   * @param {string} schoolId
   * @returns {{userInfo:import("../typings/model").User}}
   */
  getUserInfoBySchoolId ({ schoolId }) {
    return request({
      url: '/user/bySchoolId',
      method: 'get',
      mock: false,
      data: {
        schoolId
      }
    })
  },
  /**
   * @param {string} schoolId
   */
  getUserInfoByWxid ({ wxid }) {
    return request({
      url: '/user/byWxid',
      method: 'get',
      mock: false,
      data: {
        wxid
      }
    })
  },
  /**
   * @param {{string}} schoolId
   */
  getUserInfoByExample (params) {
    return request({
      url: '/user/byExample',
      method: 'post',
      mock: false,
      data: params
    })
  },
  /**
   * @param {{username:string,check:boolean}} param
   */
  checkUser (param) {
    return request({
      url: '/user/check',
      method: 'post',
      mock: false,
      params: param
    })
  }
}
