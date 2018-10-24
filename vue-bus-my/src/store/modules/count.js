const module = {
  state: {
    count: 0
  },
  mutations: {
    increment (state, n = 1) {
      state.count += n;
      //state.count += params.count;
    },
    decrease (state) {
      state.count --;
    }
  },
  actions: {
    decrease(context, rootState) {
      // context 中可以访问根节点的状态rootState
      context.commit('decrease');
      // 可以提交另一个模块的mutation
      context.commit('addList');
    },
    asyncIncrement(context) {
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('increment');
          resolve();
        }, 1000)
      });
    }
  },
  getters: {
    count: (state) => state.count
  }
};

export default module;