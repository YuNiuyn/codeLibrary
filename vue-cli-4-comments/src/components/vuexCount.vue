<template>
  <div class="vuex-count">
    <div class="vuexCount">{{ products[0].price }}</div>
    <div class="vuexCount">{{ saleProducts[0].price }}</div>
    <button class="vuexCount-btn" @click="minusPrice(2)">
      MINUS PRICE 2
    </button>
    <button class="vuexCount-btn" @click="minusPriceAsync(2)">
      MINUS PRICE 2 Async
    </button>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "VuexCount",
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["count", "products"]),
    ...mapGetters(["saleProducts"])
  },
  methods: {
    ...mapMutations(["minusPrice"]),
    ...mapActions(["minusPriceAsync"])
  }
};
</script>

<style scoped>
.vuex-count {
  position: relative;
  width: 100%;
  height: 500px;
}
.vuexCount {
  position: relative;
  width: 100%;
  margin-top: 100px;
  background-color: pink;
  font-size: 30px;
  color: white;
}
.vuexCount-btn {
  position: relative;
  width: 200px;
  margin: 0 auto;
  background-color: #1989fa;
  border: 0;
  outline: 0;
  border-radius: 10px;
  height: 40px;
  color: white;
  margin-top: 100px;
}
</style>
