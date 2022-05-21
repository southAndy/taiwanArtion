// import { getAPI } from "@/service/getAPI.js";

export const filterAPI = {
  namespaced: true,
  getters: {},
  actions: {
    // async getAPI({ commit }) {
    //   let x = await getAPI.getAllAPI();
    //   console.log("[actions] fetched API", x);
    //   commit("recievedAPI", await getAPI.getAllAPI());
    // },
  },
  mutations: {
    // recievedAPI(state, api) {
    //   console.log("[mutations] passed api", api);
    //   state.api = api;
    // },
  },
  state: () => ({
    test: 1,
    test2: 2,
    api: [],
  }),
};
