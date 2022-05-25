<script>
import Search from "@/components/Search.vue";
import Location from "@/components/Location.vue";
import MasterUnit from "@/components/MasterUnit.vue";
import AntCalendar from "@/plugins/AntCalendar.vue";

export default {
  name: "SearchView",
  components: {
    Search,
    AntCalendar,
    Location,
    MasterUnit,
  },
  data() {
    return {
      //控制component的值
      currentPage: "Location",
      isInLocation: true,
      isInMasterUnit: false,
      isInDate: false,
      isActive: true,
    };
  },
  methods: {
    // todo 優化邏輯
    switchPage(page) {
      if (page === "Location") {
        this.isInMasterUnit = false;
        this.isInDate = false;
        this.isInLocation = true;
        this.currentPage = page;
        console.log("now in the:", page);
      }
      if (page === "MasterUnit") {
        this.isInMasterUnit = true;
        this.isInDate = false;
        this.isInLocation = false;
        this.currentPage = page;
        console.log("now in the:", page);
      }
      if (page === "AntCalendar") {
        this.isInMasterUnit = false;
        this.isInDate = true;
        this.isInLocation = false;
        this.currentPage = page;
        console.log("now in the:", page);
      }
    },
    // todo 確定搜尋種類
    sendSearch() {
      console.log("message");
      this.$router.push({ name: "ResultView" });
    },
  },
};
</script>
<template>
  <div class="search">
    <Search />
    <nav class="search_type">
      <!-- todo 優化buttons -->
      <button
        :class="['search_type-list', { active: isInLocation }]"
        @click="switchPage('Location')"
      >
        地點
      </button>
      <button
        :class="['search_type-list', { active: isInMasterUnit }]"
        @click="switchPage('MasterUnit')"
      >
        單位名稱
      </button>
      <button
        :class="['search_type-list', { active: isInDate }]"
        @click="switchPage('AntCalendar')"
      >
        日期
      </button>
    </nav>
    <div class="search_content">
      <component :is="currentPage"></component>
    </div>
    <!-- todo 同步變色 -->
    <button class="search_send" @click="sendSearch">確定</button>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset.scss";
@use "@/assets/scss/base/colors.scss";

.search {
  padding: 16px 16px;
  background: #ffffff;

  &_type {
    display: flex;
    margin: 15px 0;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);

    &-list {
      border: none;
      background: none;

      &:active {
        background-color: colors.$primary_color;
        color: white;
      }
    }
  }
  &_send {
    width: 100%;
    height: 36px;
    border-radius: 4px;
    border: none;
    margin-top: 35px;
    &:hover {
      background-color: colors.$primary_color;
    }
  }
}
.active {
  color: colors.$primary_color;
  border-bottom: 1px solid colors.$primary_color;
}
</style>
