const path = require("path");
const UglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  // 基本路径
  // 部署生产环境和开发环境下的URL：可对当前环境进行区分, baseUrl已弃用
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", // 静态资源目录
  indexPath: "index.html", // html的输出路径
  filenameHashing: true, // 文件名hash
  lintOnSave: true, // eslint-loader 是否在保存的时候检查
  // use the full build with in-browser compiler?
  // compiler: false,

  //是否使用包含运行时编译器的 Vue 构建版本
  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,

  // webpack配置
  chainWebpack: () => {},
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
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
          // minimizer prod files
          // new UglifyPlugin({
          //   uglifyOptions: {
          //     compress: {
          //       warnings: false,
          //       drop_console: true, // 移除console
          //       drop_debugger: false,
          //       pure_funcs: ["console.log"] 
          //     }
          //   }
          // })
        ]
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置...
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
    // 将组件内的CSS提取到一个单独的CSS文件（只用在生产环境中）
    // 也可以是一个传递给 extract-text-webpack-plugin 的选项对象
    extract: true, 
    
    sourceMap: false, // 是否开启 CSS source maps
    
    loaderOptions: { // 为预处理器的 loader 传递自定义选项
      css: {
        // 传递给 css-loader
      },
      postcss: {
        // 传递给 postcss-loader
      }
    }, 
    // 启用 CSS modules for all css / pre-processor files.
    // 不会影响 *.vue 文件
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    /* 自动打开浏览器 */
    open: false,
    // host: "192.168.0.137",
    host: "192.168.1.137",
    port: 8080,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        // target: "http://192.168.0.106:8080/",
        target: "http://192.168.1.126:8080/",
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
