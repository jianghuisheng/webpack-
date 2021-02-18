const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * HMR: hot module replacement 热模块替换 / 模块热替换
 *  作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
 *    极大提升构建速度
 *    
 *    样式文件：可以使用HMR功能：因为style-loader内部实现了
 *    js文件：默认不能使用HMR功能
 *    html文件：默认不能使用HMR功能，同时会导致问题：html文件不能热更新了~ (就一个文件不用做HMR功能)
 *      解决：修改entry入口，将html文件引入
 */

module.exports = {
  // entry: './src/js/index.js',
  entry: ['./src/js/index.js','./src/index.html'],
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // loader 配置
      // 处理less资源
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // 处理css资源
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 处理图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[hash:10].[ext]',
          limit: 8 * 1024,
          esModule: false,
          outputPath: 'image',
        },
      },
      // 处理html中img资源
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 处理其他资源
      {
        exclude: /\.(html|js|css|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    // host:'localhost',
    port: 3000,
    open: true,
    hot: true,
  },
}
