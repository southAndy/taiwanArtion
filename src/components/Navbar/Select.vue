<template>
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
</template>
<script>
import Location from "@/components/Location.vue";
import MasterUnit from "@/components/MasterUnit.vue";
import AntCalendar from "@/plugins/AntCalendar.vue";

export default {
  name: "Select",
  components: {
    Location,
    MasterUnit,
    AntCalendar,
  },
  data() {
    return {
      //控制component的值
      currentPage: null,
      isInLocation: true,
      isInMasterUnit: false,
      isInDate: false,
      isActive: true,
    };
  },

  methods: {
    //todo
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
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset.scss";
@use "@/assets/scss/base/colors.scss";

.search_type {
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
.active {
  color: colors.$primary_color;
  border-bottom: 1px solid colors.$primary_color;
}
</style>
