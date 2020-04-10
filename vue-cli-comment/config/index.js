'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
// https://www.cnblogs.com/caideyipi/p/8187656.html
const path = require('path')

module.exports = {
  // 开发环境
  dev: {
    // Paths
    // 静态资源文件夹名称
    assetsSubDirectory: 'static',
    // 发布路径
    assetsPublicPath: '/',
    // 配置代理API
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 9394, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // 是否自动打开浏览器
    autoOpenBrowser: false,
    // 查询错误
    errorOverlay: true,
    // 通知错误
    notifyOnErrors: true,
    // 跟devserver相关的一个配置，webpack为我们提供的devserver是可以监控文件改动的，但在有些情况下却不能工作，我们可以设置一个轮询（poll）来解决
    poll: false,

    /**
     * webpack Source Maps
     * https://webpack.js.org/configuration/devtool/#development
     * 选择一种 source map 格式来增强调试过程，不同的值会明显影响到构建build和重新构建rebuild的速度。
     * 前端代码会通过babel编译或者各类的压缩，在debug时，只能调试编译或者压缩后的代码。简单来说，source map 提供了一种将压缩文件中的代码映射回源文件中的原始位置的方法。
     * 'eval-source-map'初始化比较慢，在重建时提供较快的速度，并且提供每一行准确的映射
     */
    devtool: 'eval-source-map',
    // 配合devtool的配置，当给文件名插入新的hash导致清除缓存时是否生成souce maps，默认在开发环境下为true
    cacheBusting: true,
    // css的sourceMap
    cssSourceMap: true,
    //是否使用eslint
    useEslint: false,
    // 是否展示eslint的错误提示
    showEslintErrorsInOverlay: false,
  },
  // 生产环境
  build: {
    // 编译后index.html的路径，path.resolve(__dirname, '../dist')中
    // path.resolve() 方法将路径或路径片段的序列解析为绝对路径。
    // path.resolve(__dirname)指的是index.js所在的绝对路径，再去找 “../dist” 这个路径
    // __dirname 指的是当前文件的绝对路径
    index: path.resolve(__dirname, '../dist/index.html'),
    // Paths
    // 打包后的文件根路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // 打包后静态资源文件夹名称
    assetsSubDirectory: 'static',
    // 打包后需要部署在服务器上的静态资源的绝对路径
    assetsPublicPath: './',

    /**
     * production Source Maps
     */
    productionSourceMap: true,
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 是否压缩
    productionGzip: false,
    // gzip模式下需要压缩的文件的扩展名，设置后会对相应扩展名的文件进行压缩
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 是否开启打包后的分析报告
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
