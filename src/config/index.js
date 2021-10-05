/**
 * 环境配置封装
 */
const env = process.env.NODE_ENV || 'production'

const EnvConfig = {
  development: {
    baseApi: '/api/admin',
    mockApi: 'http://rap2api.taobao.org/app/mock/291194/api/admin'
  },
  production: {
    baseApi: '/api',
    mockApi: 'http://rap2api.taobao.org/app/mock/291194/api/admin'
  }
}

export default {
  env,
  mock: true,
  namespace: 'bitrxcAdminClient',
  ...EnvConfig[env]
}
