import { createStore } from "vuex";
import { filterAPI } from "./API/filterAPI";

import { getAPI } from "@/service/getAPI.js";

export default createStore({
  state: () => ({
    api: [],
    selected: null,
    currentPageUID: null,
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
    withMasterUnit(state) {
      return state?.api.filter((data) =>
        data?.showUnit.includes(state.selected)
      );
    },
    withSpecificUIDAPI(state) {
      return state?.api.filter((data) => data?.UID === state.currentPageUID);
    },
    //todo 篩選日期 --- week
    withinWeekAPI() {},
    //todo 篩選日期 --- month
    withinMonthAPI() {},
    //todo 篩選日期 --- three month
    withinMonthsAPI() {},
  },
  mutations: {
    //store fetched api to state
    recievedAPI(state, api) {
      state.api = api;
    },
    //store user selected parameter to state
    filterSpecificCities(state, city) {
      this.state.selected = this.state.api.filter((data) =>
        data?.showInfo[0]?.location.startsWith(city)
      );
    },
    filterSpecificMasterUnit(state, unit) {
      this.state.selected = state?.api.filter((data) =>
        data?.showUnit.includes(unit)
      );
    },

    // store api UID to state
    receivedUID(state, UID) {
      this.state.currentPageUID = UID;
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
