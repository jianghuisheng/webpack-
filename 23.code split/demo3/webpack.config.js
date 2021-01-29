const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 单入口
  // entry: './src/js/index.js',
  // 多入口：有一个入口，最终输出就有一个bundle(束)
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
  /* 
    可以将node_modules中代码单独打包一个chunk最终输出
    自动分析多入口chunk中，有没有公共的文件。如果有会打包成一个单独的chunk(块)
  */
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: 'production',
}
