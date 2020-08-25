import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 所有组件公用的state
export default new Vuex.Store({
  state:{ // data, 外部使用需要 => this.$store.state的名称 or ...mapState([])
    count: 0,
    products: [
      {name: 'A', price: 20},
      {name: 'B', price: 40},
      {name: 'C', price: 60},
      {name: 'D', price: 80}
    ]
  },
  getters:{ // computed, 外部使用需要 => this.$store.getters.getter的名称
    // or 使用辅助函数 ...mapGetters([])
    saleProducts: (state) => {
      let saleProducts = state.products.map( product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
      return saleProducts;
    }
  },
  mutations:{ // sync methods, 外部调用方法 => this.$store.commit(‘mutations中被调用方法名’,被传递的参数)
    // 第一个形参固定为state，第二个是回调函数使用的参数
    minusPrice (state, payload) {
      let newPrice = state.products.forEach( product => {
        product.price -= payload
      })
    }
  },
  actions:{ //添加actions, async methods, 外部使用需要 => this.$store.dispatch(getter的名称, 参数)
    minusPriceAsync( context, payload ) {
      setTimeout( () => {
        context.commit( 'minusPrice', payload ); //context提交
      }, 2000)
    }
  },
  modules:{
    // 模块化
  }
})
