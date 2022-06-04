import { createStore } from "vuex";
import { filterAPI } from "./API/filterAPI";

import { getAPI } from "@/service/getAPI.js";

export default createStore({
  state: () => ({
    api: [],
    selected: null,
  }),
  getters: {
    withImageAPI(state) {
      return state?.api.filter((value) => value.imageUrl !== "");
    },
    withSpecificCityAPI(state) {
      return state?.api.filter((data) =>
        data?.showInfo[0]?.location.startsWith(state.selected)
      );
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
    receivedSelected(state, selected) {
      console.log(selected);
      this.state.selected = selected;
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
