const path = require("path");

module.exports = {
  // 基本路径
  // 部署生产环境和开发环境下的URL：可对当前环境进行区分, baseUrl已弃用
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", // 静态资源目录
  indexPath: "index.html", // html的输出路径
  filenameHashing: true, // 文件名hash
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // compiler: false, // use the full build with in-browser compiler?

  // 是否使用包含运行时编译器的 Vue 构建版本
  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,

  /** webpack配置 */ 
  // 普通 webpack 配置
  // 使用 vue inspect > output.js 审查 vue.config.js 里的 webpack 配置
  configureWebpack: config => {
    config.externals = { // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
      vue: "Vue",
      "element-ui": "ELEMENT",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios"
    }
    if (process.env.NODE_ENV === "production") {  // 为生产环境修改配置
      config.mode = "production"; 
    } else { // 为开发环境修改配置
      config.mode = "development";
    }
  },
  /** webpack配置
   * 高级用法 链式配置
   * Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。
   * 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
   * 可以更细粒度的控制其内部配置
   * webpack chain
   */
  chainWebpack: config => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm.js")
      .set("@", path.resolve(__dirname, "./src"))
      .set("@a", path.resolve(__dirname, "./src/assets"))
      .set("@c", path.resolve(__dirname, "./src/components"))
      .set("@v", path.resolve(__dirname, "./src/views"))
      .set("@s", path.resolve(__dirname, "./src/static"));


    const cdn = {
      css: ["https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css"],
      js: [
        "//unpkg.com/vue@2.6.11/dist/vue.min.js",
        "//unpkg.com/vue-router@3.4.3/dist/vue-router.min.js",
        "//unpkg.com/vuex@3.5.1/dist/vuex.min.js",
        "//unpkg.com/axios@0.20.0/dist/axios.min.js",
        "//unpkg.com/element-ui@2.13.2/lib/index.js"
      ]
    };
    config.plugin("html")
      .tap(args => {
        // html中添加cdn
        args[0].cdn = cdn;
        return args;
      })
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //     .loader('vue-loader')
    //     .tap(options => {
    //       // 修改它的选项...
    //       return options
    //     })
    // 使用其他loader，css loader在以下css loader里进行独立配置

    // chain webpack 里 alias设置，一定要set "vue$", 以防找不到vue实例
    
  },

  // vue-loader 配置项
  // vueLoader: {},

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css loader 相关配置
  css: {
    requireModuleExtension: false,
    sourceMap: true,
    loaderOptions: {
      // postcss 选项配置
      postcss: {
        plugin: [
          require("postcss-pxtorem") ({
            rootValue: 75, // 换算的基数
            //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            // selectorBlackList: ["el"], 过滤不想使用转换的框架，el => .el-box等
            propList: ["*"],
            exclude: /node_modules/
          }),
        ]
      },
      
    }
  },

  // webpack-dev-server 相关配置
  devServer: {
    host: "127.0.0.1",
    port: 8099,
    open: true,
    https: false,
    hotOnly: false,
  },

  // 第三方插件配置
  pluginOptions: {}
};
