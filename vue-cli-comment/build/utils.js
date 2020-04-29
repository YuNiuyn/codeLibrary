'use strict'
// 构建工具相关
const path = require('path')
const config = require('../config')

// ExtractTextWebpackPlugin会将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件。
// 因此，你的样式将不再内嵌到 JS bundle 中，而是会放到一个单独的 CSS 文件（即 styles.css）当中。
// 抽离css样式，防止将样式打包在js中引起样式加载错乱
// 如果样式文件较大，这会做更快提前加载，因为 CSS bundle 会跟 JS bundle 并行加载。
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

// assetsPath => 返回相对路径
exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  // path.join返回绝对路径（在电脑上的实际位置）；path.posix.join返回相对路径
  return path.posix.join(assetsSubDirectory, _path)
}

// vue-loader && webpack css-loader
exports.cssLoaders = function (options) {
  // options如果不为空就原样，否则是{}。
  options = options || {}

  const cssLoader = {
    // cssLoader的基本配置
    loader: 'css-loader',
    options: {
      // 是否开启 cssmap,默认是false
      sourceMap: options.sourceMap,
      // minimize表示压缩，如果是生产环境就压缩css代码
      minimize: process.env.NODE_ENV === 'production',
    }
  }
  // TODO ?postcssLoader
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    // 是否使用 postcssLoader
    // options里使用postCSS, 将cssLoader
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader', // 加载对应的loader
        // Object.assign(); es6方法, 主要用来合并对象
        // 用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
        // 一级属性深拷贝，二级属性浅拷贝
        // 合并options
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // vue loader
    // webpack ExtractTextPlugin: 当options里extract:true时就把文件单独提取
    // https://www.webpackjs.com/plugins/extract-text-webpack-plugin/
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders, // 表示使用css-loader从js读取css文件
        fallback: 'vue-style-loader' // fallback表示如果css文件没有成功导入就使用style-loader导入
        // publicPath: 重写此loader的publicPath配置
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
    // 返回最终读取和导入loader，来处理对应类型的文件
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // 分别对应vue-style-loader和相对应的loader
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
    // 示例：[
    // { loader: 'css-loader', options: { sourceMap: true/false } },
    // { loader: 'postcss-loader', options: { sourceMap: true/false } },
    // { loader: 'less-loader', options: { sourceMap: true/false } },
    // ]
  }
}

// Generate loaders for standalone style files (outside of .vue)
// 处理import导入的文件类型的打包
// 使用上面的exports.cssLoaders
// 将相关的loader生成配置push到output里，然后输出在webpack.base.conf.js里的output
exports.styleLoaders = function (options) {
  const output = []
  // 生成的各种css文件的loader对象
  const loaders = exports.cssLoaders(options)
  
  // 把每一种文件的loader都提取出来
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      // 把最终结果都push到output数组中
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  // 示例：
    // {
    //   test: new RegExp(\\.less$),
    //   use: {
    //     loader: 'less-loader', options: { sourceMap: true/false }
    //   }
    // }

  return output
}

exports.createNotifierCallback = () => {  // 配合 friendly-errors-webpack-plugin
  // 基本用法：notifier.notify('message');
  const notifier = require('node-notifier'); // 发送跨平台通知系统,系统级通知

  return (severity, errors) => {
    // 当前设定是只有出现 error 错误时触发 notifier 发送通知
    if (severity !== 'error') return // 严重程度可以是 'error' 或 'warning'

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')  // 通知图标
    })
  }
}
