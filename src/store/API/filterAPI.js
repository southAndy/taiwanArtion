export const filterAPI = {
  namespaced: true,
  state: () => ({
    test: 1,
    test2: 2,
  }),
  mutations: {
    test(state) {
      console.log(state.test);
    },
  },
  getters: {
    calTest(state, getters, rootState) {
      // console.log(state.test);
      console.log(getters.calTT);
      console.log(rootState.test);
      return state.test;
    },
    calTT() {
      return 2;
    },
    // calTest2(state, getters, commit) {
    //   //local state
    //   console.log(state.test2);
    //   //local getter
    //   console.log(getters.calTest);
    //   //local mutation
    //   console.log(commit("test"));
    //   return state;
    // },
  },
};
