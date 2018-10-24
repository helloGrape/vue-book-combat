import Vue from 'vue';
import Vuex from 'vuex';
import product_data from '../product';

Vue.use(Vuex);
// 数组去重
function getFilterArray ( array ) {
  const res = [];
  const json = {};
  for (let i = 0;i < array.length;i ++) {
    const _self = array[i];
    if (!json[_self]) {
      res.push(_self);
      json[_self] = 1;
    }
  }
  return res;
}

const store = new Vuex.Store({
  state: {
    //商品列表数据
    productList: [],
    //购物车数据 本地有存储
    cartList: localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : []
  },
  getters: {
    brands: state => {
      const brands = state.productList.map(item => item.brand);
      return getFilterArray(brands);
    },
    colors: state => {
      const colors = state.productList.map(item => item.color);
      return getFilterArray(colors);
    }/*,
    saveCartList: state => {
      return localStorage.setItem("cartList", JSON.stringify(state.cartList));
    }*/
  },
  mutations: {
    setProductList(state, data) {
      state.productList = data;
    },
    addCart(state, id) {
      // 先判断购物车是否已有, 如果有，数量+1
      const isAdded = state.cartList.find(item => item.id === id);
      if (isAdded) {
        isAdded.count ++;
      }else {
        state.cartList.push({
          id: id,
          count: 1
        })
      }
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    editCartCount (state, payload) {
      const product = state.cartList.find(item => item.id === payload.id);
      product.count += payload.count;
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    deleteCart (state, id) {
      const index = state.cartList.findIndex(item => item.id === id);
      state.cartList.splice(index, 1);
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    },
    emptyCart (state) {
      state.cartList = [];
      localStorage.setItem("cartList", JSON.stringify(state.cartList));
    }
  },
  actions: {
    //请求商品列表
    getProductList({ commit }) {
      // 真实环境通过Ajax获取，这里用异步模拟
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('setProductList', product_data);
          resolve();
        }, 500);
      });
    },
    buy ( { commit }) {
      return new Promise((resolve, reject) => {
        // 真实环境应该通过Ajax提交购买请求后再清空购物列表
        setTimeout(() => {
          commit('emptyCart');
          resolve();
        }, 500)
      })
    }
  }
});
export default store;