const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 多入口：有一个入口，最终输出就有一个bundle
  entry: {
    index: './src/js/index.js',
    test: './src/js/test.js',
  },
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
  mode: 'production',
}
