<template>
  <nav class="search_type">
    <button
      v-for="(list, index) in selectList"
      :key="index"
      :class="[
        'search_type-list',
        { active: list.elementName === currentPage },
      ]"
      @click="switchPage(list.elementName, index)"
    >
      {{ list.name }}
    </button>
  </nav>
  <div class="search_content">
    <keep-alive :exclude="('Location', 'MasterUnit', 'CalendarMonthVue')">
      <component
        :is="currentPage"
        :style="{ display: isToggle ? 'none' : 'block' }"
        @update="isToggle"
        :isToggle="isToggle"
      ></component>
    </keep-alive>
  </div>
</template>
<script>
import Location from "@/components/Location.vue";
import MasterUnit from "@/components/MasterUnit.vue";
//old calendar --antdesgin
// import AntCalendar from "@/plugins/AntCalendar.vue";
import CalendarMonthVue from "../Calendar/CalendarMonth.vue";

export default {
  name: "Select",
  components: {
    Location,
    MasterUnit,
    CalendarMonthVue,
    // AntCalendar,
  },
  data() {
    return {
      //控制component的值
      currentPage: "Location",
      isToggle: false,
      selectList: [
        {
          name: "地點",
          elementName: "Location",
          isActive: false,
          hit: 0,
        },
        {
          name: "單位名稱",
          elementName: "MasterUnit",
          hit: 0,

          isActive: false,
        },
        {
          name: "日期",
          elementName: "CalendarMonthVue",
          isActive: false,
          hit: 0,
        },
      ],
    };
  },

  methods: {
    //todo
    switchPage(page, currentIndex) {
      console.log(page, currentIndex);
      this.currentPage = page;
      //每個list點擊第2次,預期關閉
      // this.selectList[currentIndex].hit++;
      // this.isToggle = this.selectList[currentIndex].hit;
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
  }
}
.active {
  color: colors.$primary_color;
  border-bottom: 1px solid colors.$primary_color;
}
</style>
