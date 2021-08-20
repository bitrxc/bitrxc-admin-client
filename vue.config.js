const compressionPlugin = require("compression-webpack-plugin");
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  indexPath: "index.html",
  devServer: {
    port: 9000
  },
  // 配置 gzip 压缩
  configureWebpack: () => {
    return {
      plugins: [
        new compressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 10240, // 超过 10kb 则打包为 gzip
          deleteOriginalAssets: false // 是否删除源文件
        })
      ]
    };
  }
};
