const module = {
  state: {
    list: [1, 5, 8, 10, 30, 50]
  },
  getters: {
    filteredList: state => state.list.filter(item => item < 10),
    listCount: (state, getters, rootState) => {
      // rootState:根节点的状态
      return getters.filteredList.length;
    }
  },
  mutations: {
    addList: (state) => {
      state.list.push(7)
    }
  }
};
export default module;