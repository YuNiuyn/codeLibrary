'use strict'
// webpack开发环境配置
const utils = require('./utils') 
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge') // 用来合并webpack配置对象，可以把webpack配置文件拆分成几个小的模块，然后合并
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成 html 文件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder') // 获取port

const HOST = process.env.HOST // 获取全局的HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: { // webpack 服务器配置
    // 使用内联模式时，在开发工具的控制台将显示消息，可取的值有none error warning info
    clientLogLevel: 'warning',
    historyApiFallback: { 
      //当使用 h5 history api时，任意的404响应都可能需要被替代为index.html，通过historyApiFallback：true控制；通过传入一个对象，比如使用rewrites这个选项进一步控制
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, //是否启用webpack的模块热替换特性。
    contentBase: false,  // since we use CopyWebpackPlugin.这里禁用了该功能。本来是告诉服务器从哪里提供内容，一半是本地静态资源。
    compress: true, // 一切服务是否都启用gzip压缩
    host: HOST || config.dev.host, // 如果有全局HOST，则使用，否则使用config/index.js里的host
    port: PORT || config.dev.port, // port同理
    open: config.dev.autoOpenBrowser, // 是否在浏览器里开启 dev server
    overlay: config.dev.errorOverlay // 当有编译器错误时，是否在浏览器中显示全屏覆盖。
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, //此路径下的打包文件可在浏览器中访问
    proxy: config.dev.proxyTable, // 代理，如果有单独的后端开发服务器api,解决某些跨域问题。
    quiet: true, // necessary for FriendlyErrorsPlugin
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下使用轮询。
      poll: config.dev.poll, // 是否使用轮询
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 模块 HtmlWebpackPlugin
      filename: 'index.html', // 生成的文件名称
      template: 'index.html', // 可以指定模块html文件
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([ // 模块 CopyWebpackPlugin 将单个文件或整个文件复制到构建目录
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

// webpack将运行由配置文件导出的函数，并且等待promise返回，便于需要异步地加载所需的配置变量。
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: { // build 成功会执行块
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback() //出错显示utils里配置好的信息。
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
