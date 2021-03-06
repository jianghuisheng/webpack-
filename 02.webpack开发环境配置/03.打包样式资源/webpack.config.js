/**
 * webpack.config.js webpack的配置文件
 * 作用：指示 webpack 干那些活(当你运行 webpack 指令时，会加载里面的配置)
 * 所有构建工具都是基于node.js平台运行的 模块化默认采用common.js
 */

const { resolve } = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // _dirname node.js的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      {
        test: /\.css$/,
        // 使用哪些loader进行处理 use数组中loader执行顺序：从右到左，从下到上，依次执行
        use: [
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成common.js模块加载js中，里面内容是样式字符串
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          'less-loader',
        ],
      },
    ],
  },
  // plugins的配置
  plugins: [
    // 详细plugins得配置
  ],
  // 模式
  mode: 'development',
  // mode:'production',
}
