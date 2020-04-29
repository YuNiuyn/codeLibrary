'use strict'
// webpack基础配置
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) { // 返回当前目录的平行目录的路径
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: { // 输入
    app: './src/main.js' // 入口文件为 main.js
  },
  // output 位于对象最顶级键(key)，包括了一组选项，指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」。
  output: { // 输出
    path: config.build.assetsRoot, // 输出文件，默认'../dist' 真正输出路径在index.js中build配置中的assetsRoot
    filename: '[name].js', // 输出文件的名称, 默认使用原名
    publicPath: process.env.NODE_ENV === 'production' //真正的文件引用路径，在index.js中build配置中
      ? config.build.assetsPublicPath // 生产环境 publicpath
      : config.dev.assetsPublicPath // 开发环境 publicpath
  },
  // resolve配置模块解析
  resolve: { // 解析确定的扩展名，方便模块导入
    extensions: ['.js', '.vue', '.json'], // 省略扩展名
    // 创建别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js', // $符号指精确匹配，路径和文件名要详细
      '@': resolve('src'), // '@/components/HelloWorld'
      // resolve('src')指的是项目根目录中的src文件夹目录，导入文件的时候路径可以这样简写 import somejs from "@/some.js"就可以导入指定文件
    }
  },
  module: { // 模块相关配置, 包括 loader, plugin等
    rules: [
      {
        test: /\.vue$/, // vue 要在babel之前
        loader: 'vue-loader', // vue-loader, vue转普通的 html
        options: vueLoaderConfig // 可选项：vue-loader 选项配置，('./vue-loader.conf.js')
      },
      {
        test: /\.js$/, // babel
        loader: 'babel-loader', // es6转es5 loader
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      { // url-loader 文件大小低于指定的限制时，可返回 DataURL，即base64
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // url-loader 图片
        loader: 'url-loader',
        options: { // 兼容性问题，需要将query换成options
          limit: 10000, // 默认无限制
          // 返回图片的hash7相对路径
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // hash:7 代表 7 位数的 hash
          
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // url-loader 音视频
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // url-loader 字体
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.sass$/, // 可配置解析sass,还可添加less等
        loaders: ['style', 'css', 'sass']
    }
    ]
  },
  node: { // 是否polyfill 或 mock
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // setImmediate(callback[, ...args])
    // 使用了nodejs里的timer定时器
    // Node.js 中的定时器是一种内部的构造，其会在指定时段后调用给定的函数。 何时调用定时器函数取决于用来创建定时器的方法以及 Node.js 事件循环正在执行的其他工作。
    // http://nodejs.cn/api/timers.html#timers_setimmediate_callback_args

    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
