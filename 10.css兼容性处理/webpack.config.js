const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置node.js环境变量
process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          /* 
            css兼容性处理: postcss --> postcss-loader postcss-preset-env

            帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式

              "browserslist": {
                // 开发环境 --> 设置环境变量：process.env.NODE_ENV = 'development'
                "development": [
                  "last 1 chrome version",
                  "last 1 firefox version",
                  "last 1 safari version"
                ],
                // 生产环境（默认运行）
                "production": [
                  ">0.2%",
                  "not dead",
                  "not op_mini all"
                ]
              }

          */
          // 'postcss-loader', //使用loader的默认配置
          // 修改loader的配置
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       indent: 'postcss',
          //       plugins: () => [
          //         // postcss的插件
          //         require('postcss-preset-env')(),
          //       ],
          //     },
          //   },
          // },

          // 这个得在项目根目录创建此文件
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                indent: 'postcss',
                plugins: [
                  require('autoprefixer')
                ]
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css',
    }),
  ],
  mode: 'development',
}
