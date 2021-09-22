/**
 * 环境配置封装
 */
const env = process.env.NODE_ENV || 'production'

const EnvConfig = {
  development: {
    baseApi: '/api/admin',
    mockApi: 'http://rap2api.taobao.org/app/mock/290374/api'
  },
  production: {
    baseApi: '/api/admin',
    mockApi: 'http://rap2api.taobao.org/app/mock/290374/api'
  }
}

export default {
  env,
  mock: false,
  namespace: 'bitrxcAdminClient',
  ...EnvConfig[env]
}
