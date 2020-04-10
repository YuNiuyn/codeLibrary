// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 页面程序入口文件
import Vue from 'vue' // 引入vue文件
import App from './App' // 引入同目录下的App.vue
import router from './router' // 引入路由

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
