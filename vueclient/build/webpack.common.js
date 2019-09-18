const path = require('path')
const config = require('./base.config')
const utils = require('./utils')
// vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
 
module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': utils.resolve('src'),
      'excel': path.resolve(__dirname, '../src/excel'),//新增加一行
    }
  },
  // 如用scripst标签方式引入的jquery，我们在使用时，依旧用require的方式来使用，但是却不希望webpack将它又编译进文件中。
  // externals: {
  //   jquery: 'jquery',
  // },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [utils.resolve('src'), utils.resolve('test'), utils.resolve('node_modules/webpack-hot-middleware/client')],
        exclude: /node_modules/,
        options: {
          cacheDirectory: true // 开启缓存
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|.ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader插件
  ] 
};