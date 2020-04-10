'use strict'
// 修改控制台中字符串的样式（字体样式加粗等／字体颜色／背景颜色）
const chalk = require('chalk')

// Semver是一个专门分析Semantic Version（语义化版本）的工具。Npm使用了该工具来处理版本相关的工作。
// semver可以作为一个node模块，同时也可以作为一个命令行工具。
const semver = require('semver')

const packageConfig = require('../package.json')

// 可以在js文件中执行shell命令
const shell = require('shelljs')

// 创建子进程返回版本号
function exec (cmd) {
  // NodeJS --- execSync(command[, options]) : 同步创建个子进程
  // JS --- toString() : 把一个逻辑值转换为字符串，并返回结果。
  // JS --- trim() : 用于删除字符串的头尾空格，此方法不会改变原始字符串。
  return require('child_process').execSync(cmd).toString().trim()
}
// 定义版本需要的常量数组
const versionRequirements = [
  {
    name: 'node',
    // NodeJS --- process 对象是一个全局变量，它提供有关当前 Node.js 进程的信息并对其进行控制。
    currentVersion: semver.clean(process.version), // 规范版本信息，semver.clean('  =v1.2.3   ')    // '1.2.3'
    versionRequirement: packageConfig.engines.node // 规定package.json中engines选项的node版本信息
  }
]
// which : linux指令，在$path规定的路径下查找符合条件的文件
if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'), // 调用npm --version命令，并且把参数返回给exec函数创建子进程返回纯净版本
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      //如果版本号不符合package.json文件中指定的版本号，就执行warning.push
      //当前版本号用红色标识，需要的版本号用绿色标识
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) { // 如果为真，则打印提示用户升级新版本
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }
    
    console.log()
    process.exit(1)
  }
}
