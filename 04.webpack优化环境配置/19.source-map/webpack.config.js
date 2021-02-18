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
  entry: ['./src/js/index.js', './src/index.html'],
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
  devtool: 'eval-source-map',
}

/**
 * source-map:一种 提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）    错误代码准确信息和源代码的错误位置
 * [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 *
 * inline-source-map:       内联  只生成一个内联source-map                                           错误代码准确信息和源代码的错误位置
 * hidden-source-map:       外部                                                                    不能追踪源代码错误，只能提示到构建后代码的错误位置
 * eval-source-map：        内联  每一个文件都声称对应的source-map,都在eval函数中                     错误代码准确信息和源代码的错误位置
 * nosources-source-map:    外部                                                                    错误代码准确信息，但是没有任何源代码信息
 * cheap-source-map:        外部                                                                    错误代码准确信息和源代码的错误位置（只能精确到行）
 * cheap-module-source-map: 外部                                                                    错误代码准确信息和源代码的错误位置（只能精确到行）
 *
 * 
 * 内联 和 外部的区别
 * 1. 外部生成了文件，内联没有
 * 2. 内联构建速度更快
 *
 *
 * 开发环境：速度快，调试更友好
 *  速度快（eval>inline>cheap>...)
 *  调试更友好（source-map,cheap-module-source-map,cheap-source-map)
 *  ---> eval-source-map / eval-cheap-module-source-map
 *
 * 生产环境：源代码要不要隐藏？调试要不要更友好
 *  内联会让代码体积变大，所以在生产环境不用内联
 *  nosources-source-map  全部隐藏
 *  hidden-source-map     只隐藏源代码，会提示构建后代码错误信息
 * ---> source-map / cheap-module-source-map
 * 总结：一般开发环境用eval-source-map;生产环境用source-map
 */
