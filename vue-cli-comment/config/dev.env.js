'use strict'
// 引入merge, 引入prodEnv, 再使用merge
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
