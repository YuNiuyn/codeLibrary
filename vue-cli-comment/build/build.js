'use strict'
// 参考
// 生产环境构建代码
// webpack的打包文件
// 通过package.json下的script来执行脚本，npm run build 其实就是 node build/build.js

require('./check-versions')() // node 和 npm 版本检查

process.env.NODE_ENV = 'production' // 设置环境为生产环境

const ora = require('ora')    // ora : 实现loading的模块
const rm = require('rimraf')  // rimraf ：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除.

const path = require('path')
/** nodejs
 * path.dirname()  :获取目录
 * path.extname()  : 获取扩展名
 * path.parse()    : 将一个路径转换成一个js对象
 * path.format()   ：将一个js对象转换成路径
 * join()          : 拼接多个路径成一个路径
 * path.resolve() :将相对路径转为绝对路径
 * __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
 * __filename: 总是返回被执行的 js 的绝对路径
*/

const chalk = require('chalk') // 修改控制台中字符串的样式（字体样式加粗等／字体颜色／背景颜色）
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// 删除(拼接config文件夹里build配置里的assetsRoot和assetsSubDirectory)
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err  // 抛出异常
  webpack(webpackConfig, (err, stats) => { // 构建webpack
    spinner.stop()    // 停止loading
    if (err) throw err

    // NodeJS 表示 process 的 stdout 的可读流。
    process.stdout.write(stats.toString({ // 标准输出流, 类似于console.log
      colors: true,       // 增加控制台颜色开关
      modules: false,     // 是否增加内置模块信息
      children: false,    // // 不增加子级信息，If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,      // 允许较少的输出
      chunkModules: false // 不将内置模块的信息加到包信息
    }) + '\n\n')

    if (stats.hasErrors()) {  // 编译出错的信息
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    // 以上就是在编译过程中，持续打印消息
    console.log(chalk.cyan('  Build complete.\n'))  // 编译成功的消息
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
