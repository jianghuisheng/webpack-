const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * 缓存：
 *   babel缓存
 *     cacheDirectory: true
 *   文件资源缓存
 *     hash: 每次webpack构建时会生成一个唯一的hash值。
 *       问题：因为js和css同时使用一个hash值。
 *         如果重新打包，会导致所有缓存失败。（可能我却只改动了一个文件）
 *     chunkhash: 根据chunk生成的hash值。如果打包来源于同一个chunk,那么hash值就一样
 *        问题：js和css的hash值还是一样的
 *          因为css是在js中被引入的，所以同属于一个chunk
 *     contenthash: 根据文件的内容生成hash值。 不同文件hash值一定不一样
 *     --> 让代码上线运行缓存更好使用
 * 
 */

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        indent: 'postcss',
        plugins: [require('autoprefixer')],
      },
    },
  },
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 优先执行
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        // 以下loader只会匹配一个，提升构建速度
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader'],
          },

          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env'],
                  // 开启babel缓存
                  // 第二次构建时，会读取之前的缓存，刷新浏览器可以看到效果(会出现强制缓存bug,需要加版本号)
                  cacheDirectory: true,
                },
              },
            ],
          },
          {
            test: /\.(jpg|png|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[contenthash:10].[ext]',
              outputPath: 'imgs',
              esModule: false,
            },
          },
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)$/,
            loader: 'file-loader',
            options: {
              outputPath: 'media',
              name: '[hash:10].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[hash:10].css',
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWitespace: true,
        removeComment: true,
      },
    }),
  ],
  mode: 'production',
  devtool: 'source-map',
}
