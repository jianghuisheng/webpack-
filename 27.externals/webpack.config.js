const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/[name].[hash].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'production',
  externals: {
    // 忽略库名 --- npm包名
    // 改用cdn减小打包体积
    jquery: 'jQuery',
  },
}
