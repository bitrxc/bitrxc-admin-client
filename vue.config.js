const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: {
    // 本意是仅在开发环境生成 source-map 。由于 package.json 中定义的 vue-cli-service build 指令会将 NODE_ENV 覆盖，因此下方语句没用
    // devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined,
    plugins: [
      // 压缩文件以启用静态gzip
      new CompressionPlugin({
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|ttf|ico|svg|json|map)(\?.*)?$/i,
        minRatio: 0.8
      })
    ]
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api-renwen.bitrxc.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
