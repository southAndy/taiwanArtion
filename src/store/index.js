import { createStore } from "vuex";

import { filterAPI } from "./API/filterAPI";

export default createStore({
  state: {
    test: 2,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    filterAPI: filterAPI,
  },
});
