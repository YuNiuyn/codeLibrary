import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
// 自动全局注册
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

// Vue.config.productionTip = false;
//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
// 	const authorization = localStorage.getItem('authorization');
//   	if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
//       	if (authorization) {  // 通过vuex state获取当前的token是否存在
//           	next();
//       	}else {
// 			next('/');
//       	}
//   	} else {
//       next();
//   	}
// });

// new Vue({
//   el: "#app",
//   router,
//   store,
//   data: {
//     currentRoute: window.location.pathname
//   },
//   computed: {
//     ViewComponent () {
//       const matchingView = router[this.currentRoute]
//       return matchingView
//         ? require('./views/' + matchingView + '.vue')
//         : require('./views/Home.vue')
//     }
//   },
//   render (h) {
//     return h(this.ViewComponent)
//   }
  
// })


new Vue({
  router,
  store,
  template: '<App/>',
  render: h => h(App)
}).$mount('#app')



