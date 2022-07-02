import { createStore } from "vuex";
import { filterAPI } from "./API/filterAPI";

import { getAPI } from "@/service/getAPI.js";
// import dayjs from "dayjs";

export default createStore({
  state: () => ({
    api: [],
    selected: null,
    currentPageUID: null,
    specificRangeExhibitions: null,
    latitude: 0,
    longitude: 0,
    selectedList: {},
    defaultImage: require("@/assets/images/5248954-02.png"),
    logoList: {
      desktop: "",
      mobile: "",
    },
  }),
  getters: {
    setCityForAPI(state) {
      return state.api?.filter((data) => {
        data.city = data.showInfo[0].location.slice(0, 2);
        console.log(data.city);
        return data;
      });
    },
    setUnitForAPI(state, getters) {
      return getters.setCityForAPI?.filter((data) => {
        if (
          data.showUnit.includes("畫廊") ||
          data.showUnit.includes("空間") ||
          data.showUnit.includes("藝廊")
        ) {
          return (data.unit = "民間藝文空間");
        }
        if (data.showUnit.includes("線上")) {
          return (data.unit = "線上展");
        }
        if (data.showUnit.includes("博物館")) {
          return (data.unit = "博物館");
        }
        if (data.showUnit.includes("美術館")) {
          return (data.unit = "美術館");
        }
      });
    },
    mutipleSelect(state, getters) {
      //多選
      console.log(Object?.keys(state.selectedList).length);
      let rules = Object.keys(state.selectedList);
      if (rules.length === 3) {
        console.log("3");
        return getters.setUnitForAPI?.filter((data) => {
          let userSelectedDate = new Date(state.selectedList.date);
          let apiEndDate = new Date(data.endDate);
          if (
            data.city === state.selectedList.city &&
            data.unit === state.selectedList.unit &&
            apiEndDate.valueOf() > userSelectedDate.valueOf()
          ) {
            return data;
          }
        });
      }
      //複選
      if (rules.length === 2) {
        return getters.setUnitForAPI?.filter((data) => {
          let userSelectedDate = new Date(state.selectedList.date);
          let apiEndDate = new Date(data.endDate);
          if (
            (data.city === state.selectedList.city &&
              data.unit === state.selectedList.unit) ||
            (data.unit === state.selectedList.unit &&
              apiEndDate.valueOf() > userSelectedDate.valueOf()) ||
            (data.city === state.selectedList.city &&
              apiEndDate.valueOf() > userSelectedDate.valueOf())
          ) {
            return data;
          }
        });
      }
      //單選
      if (rules.length === 1) {
        return getters.setUnitForAPI.filter((data) => {
          let userSelectedDate = new Date(state.selectedList.date);
          let apiEndDate = new Date(data.endDate);
          if (
            data.city === state.selectedList.city ||
            data.unit === state.selectedList.unit ||
            apiEndDate.valueOf() > userSelectedDate.valueOf()
          ) {
            return data;
          }
        });
        // return getters.setUnitForAPI?.filter((data) => {
        //   let userSelectedDate = new Date(state.selectedList.date);
        //   let apiEndDate = new Date(data.endDate);
        //   if (
        //     data.city === state.selectedList.city ||
        //     data.unit === state.selectedList.unit ||
        //     apiEndDate.valueOf() > userSelectedDate.valueOf()
        //   ) {
        //     return data;
        //   }
        // });
      }
      // return getters.setUnitForAPI?.filter((data) => {
      //   let userSelectedDate = new Date(state.selectedList.date);
      //   let apiEndDate = new Date(data.endDate);
      //   //?全選
      //   if (
      //     data.city === state.selectedList.city &&
      //     data.unit === state.selectedList.unit &&
      //     apiEndDate.valueOf() > userSelectedDate.valueOf()
      //   ) {
      //     console.log("mutiple");
      //     return data;
      //   }
      //   //?複選
      // if (
      //   (data.city === state.selectedList.city &&
      //     data.unit === state.selectedList.unit) ||
      //   (data.unit === state.selectedList.unit &&
      //     apiEndDate.valueOf() > userSelectedDate.valueOf()) ||
      //   (data.city === state.selectedList.city &&
      //     apiEndDate.valueOf() > userSelectedDate.valueOf())
      // ) {
      //     console.log("dobule");
      //     return data;
      //   }
      //   //?單選情境
      //   // if (
      //   //   data.city === state.selectedList.city ||
      //   //   data.unit === state.selectedList.unit ||
      //   //   apiEndDate.valueOf() > userSelectedDate.valueOf()
      //   // ) {
      //   //   return data;
      //   // }
      // });
    },
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
