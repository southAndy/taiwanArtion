import { createStore } from "vuex";
import { filterAPI } from "./API/filterAPI";

import { getAPI } from "@/service/getAPI.js";

export default createStore({
  state: () => ({
    api: [],
    selected: null,
    currentPageUID: null,
    specificRangeExhibitions: null,
    latitude: 0,
    longitude: 0,
    selectedList: {
      city: "",
      unit: "",
      date: "",
    },
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
    withLatLngAPI(state) {
      return state?.api.filter(
        (data) =>
          data.showInfo[0].latitude != null &&
          data.showInfo[0].longitude != null
      );
    },
  },
  mutations: {
    withKeyWord(state, userInput) {
      console.log("call withKeyWord", userInput);
      state.selected = state?.api?.filter((data) => {
        let defaultSelect = "";
        if (userInput.select === defaultSelect || userInput.select === "不限") {
          //
          return data.descriptionFilterHtml.includes(userInput.keyword);
        }
        if (userInput.select === "已開展") {
          //?關鍵字符合,且時間也符合
          //todo 使用dayjs篩選
        }
        if (userInput.select === "尚未開展") {
          //?關鍵字符合,且時間也符合
          //todo 使用dayjs篩選
        }
      });
    },
    storeCity(state, selected) {
      state.selectedList.city = selected;
    },
    storeUnit(state, selected) {
      state.selectedList.unit = selected;
    },
    storeDate(state, selected) {
      state.selectedList.date = selected;
    }, //store fetched api to state
    recievedAPI(state, api) {
      state.api = api;
    },
    //store user selected parameter to state
    filterSpecificCities(state, city) {
      state.selected = state.api.filter((data) =>
        data?.showInfo[0]?.location.startsWith(city)
      );
    },
    filterSpecificMasterUnit(state, unit) {
      state.selected = state?.api.filter((data) =>
        data?.showUnit.includes(unit)
      );
    },
    filterfilterSpecificDate(state, date) {
      // //? 搜尋selecteddate以後展覽ing的資料
      let selectedMonth = new Date(date).getMonth();
      console.log(selectedMonth);
      state.selected = state.api.filter((data) => {
        //? 判斷api展覽日期
        let apiDate = new Date(data.endDate).getMonth();
        if (selectedMonth < apiDate) {
          return data;
        }
      });
    },
    //? homePage filter
    openWithinWeek(state) {
      //?current year / month / day
      let currentTime = new Date();
      let currentYear = currentTime.getFullYear();
      let currentMonth = currentTime.getMonth();

      //?api year / month / day
      state.specificRangeExhibitions = state.api.filter((value) => {
        let apiDate = new Date(value.startDate);
        console.log(apiDate);
        if (currentYear - apiDate.getFullYear() <= 0) {
          //? 只要相同月份都會
          if (currentMonth === apiDate.getMonth()) {
            return value;
          }
        }
      });
    },
    openWithinMonth(state, range) {
      //?current year / month / day
      let currentTime = new Date();
      let rightYear = currentTime.getFullYear();
      let rightMonth = currentTime.getMonth();
      // let rightDay = currentTime.getDate();

      //?api year / month / day
      state.specificRangeExhibitions = state.api.filter((value) => {
        let apiDate = new Date(value.startDate);
        console.log(apiDate);
        if (rightYear - apiDate.getFullYear() >= 0) {
          if (rightMonth + range >= apiDate.getMonth()) {
            return value;
          }
        }
      });
    },
    openWithThreeMonth(state, range) {
      //?current year / month / day
      let currentTime = new Date();
      let rightYear = currentTime.getFullYear();
      let rightMonth = currentTime.getMonth();
      // let rightDay = currentTime.getDate();

      //?api year / month / day
      state.specificRangeExhibitions = state.api.filter((value) => {
        let apiDate = new Date(value.startDate);
        console.log(apiDate);
        if (rightYear - apiDate.getFullYear() >= 0) {
          if (rightMonth + range >= apiDate.getMonth()) {
            return value;
          }
        }
      });
    },
    //? update position
    updatePosition(state, position) {
      console.log("recieved", position);
      state.latitude = position;
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
    async getCurrentPosition({ commit }) {
      console.log("excuting..");
      const userPosition = function () {
        return navigator.geolocation.getCurrentPosition(
          (position) => position.coords
        );
      };
      let x = userPosition();

      console.log(x);
      commit("updatePosition", userPosition());
    },
  },
  modules: {
    filterAPI: filterAPI,
  },
});
