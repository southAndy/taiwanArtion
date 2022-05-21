import { createStore } from "vuex";
import { filterAPI } from "./API/filterAPI";

import { getAPI } from "@/service/getAPI.js";

export default createStore({
  state: () => ({
    api: [],
  }),
  getters: {
    //todo contain image's apis
    withImageAPI(state) {
      return state?.api.filter((value) => value.imageUrl !== "");
    },
    //todo 篩選日期 --- week
    withinWeekAPI() {},
    //todo 篩選日期 --- month
    withinMonthAPI() {},
    //todo 篩選日期 --- three month
    withinMonthsAPI() {},
  },
  mutations: {
    recievedAPI(state, api) {
      // console.log(api);
      state.api = api;
    },
  },
  actions: {
    async getAPI({ commit }) {
      commit("recievedAPI", await getAPI.getAllAPI());
    },
  },
  modules: {
    filterAPI: filterAPI,
  },
});
