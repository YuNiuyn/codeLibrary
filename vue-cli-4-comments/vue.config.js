// 使用 vue inspect > output.js 审查 vue.config.js 里的 webpack 配置
const path = require("path");
// const UglifyPlugin = require("uglifyjs-webpack-plugin");
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

  // use the full build with in-browser compiler?
  // compiler: false,

  //是否使用包含运行时编译器的 Vue 构建版本
  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,

  /** webpack配置
   * Vue CLI 内部的 webpack 配置是通过 webpack-chain 维护的。
   * 这个库提供了一个 webpack 原始配置的上层抽象，使其可以定义具名的 loader 规则和具名插件，并有机会在后期进入这些规则并对它们的选项进行修改。
   * 它允许我们更细粒度的控制其内部配置
   */
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置
      config.mode = "production";
      // 将每个依赖包打包成单独的js文件
      var optimization = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        },
        minimizer: [
          // new UglifyPlugin({
          //   uglifyOptions: {
          //     compress: {
          //       warnings: false,
          //       drop_console: true, // console
          //       drop_debugger: false,
          //       pure_funcs: ["console.log"] // 移除console
          //     }
          //   }
          // })
        ]
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置
      config.mode = "development";
      var optimization2 = {
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          maxInitialRequests: Infinity,
          minSize: 20000, // 依赖包超过20000bit将被单独打包
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace("@", "")}`;
              }
            }
          }
        }
      };
    }
    Object.assign(config, {
      // 开发生产共同配置

      // externals: {
      //   'vue': 'Vue',
      //   'element-ui': 'ELEMENT',
      //   'vue-router': 'VueRouter',
      //   'vuex': 'Vuex'
      // } // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(用于csdn引入)
      resolve: {
        extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views"),
          "@u": path.resolve(__dirname, "./src/utils"),
          "@s": path.resolve(__dirname, "./src/service")
        }, // 别名配置
        plugins: []
      },
      optimization: optimization2
    });
  },

  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // css相关配置
  css: {
    requireModuleExtension: false,
    sourceMap: true,
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {},
      /**
       * 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
       * 但是在配置 `data` 选项的时候
       * `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
       * 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
       */
      scss: {},
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: "#fff"
        }
      }
    }
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,

  // dll: false,
  // PWA 插件相关配置
  pwa: {},

  // webpack-dev-server 相关配置
  devServer: {
    host: "127.0.0.1", // 自动打开浏览器
    port: 9099,
    open: false,
    https: false,
    hotOnly: false,

    proxy: {  //使用代理
      "/api": {
        /* 目标代理服务器地址 */
        target: "http://localhost:9394",
        changeOrigin: true, // 允许跨域
        secure: false, // false为http访问，true为https访问
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    before: () => {}
  },

  // 第三方插件配置
  pluginOptions: {}
};
