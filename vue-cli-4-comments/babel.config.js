/**
 * Vue CLI 使用了 Babel 7 中的新配置格式 babel.config.js。和 .babelrc 或 package.json 中的 babel 字段不同
 * 这个配置文件不会使用基于文件位置的方案，而是会一致地运用到项目根目录以下的所有文件，包括 node_modules 内部的依赖。
 * 官方推荐在 Vue CLI 项目中始终使用 babel.config.js 取代其它格式。
 */

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"]
};
