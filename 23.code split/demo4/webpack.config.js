const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 单入口
  entry: './src/js/index.js',
  output: {
    // [name]: 取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWitespace: true,
        removeComment: true,
      },
    }),
  ],
  /* 
    可以将node_modules中代码单独打包一个chunk最终输出
    自动分析多入口chunk中，有没有公共的文件。如果有会打包成一个单独的chunk(块)
    作用：避免代码臃肿，分割成多个小模块并行加载，提高效率
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
}
