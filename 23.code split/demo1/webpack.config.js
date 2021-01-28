const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
