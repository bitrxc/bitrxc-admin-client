module.exports = {
  // 开发环境时启动 source-map
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined
  },
  pluginOptions: {
    compression: {
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8
      }
    }
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
