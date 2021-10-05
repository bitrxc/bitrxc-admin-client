module.exports = {
  // 开发环境时启动 source-map
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api-dev.bitrxc.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
