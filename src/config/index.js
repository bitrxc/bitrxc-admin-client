/**
 * 环境配置封装
 */
const env = process.env.NODE_ENV || 'production'

const EnvConfig = {
  development: {
    baseApi: 'https://api-dev.bitrxc.com/admin',
    mockApi: 'http://rap2api.taobao.org/app/mock/291194/api/admin'
  },
  production: {
    baseApi: 'https://api.bitrxc.com/admin',
    mockApi: 'http://rap2api.taobao.org/app/mock/291194/api/admin'
  }
}

export default {
  env,
  mock: true,
  namespace: 'bitrxcAdminClient',
  ...EnvConfig[env]
}
