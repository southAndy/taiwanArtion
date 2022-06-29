<template>
  <li
    :class="['calendar_day', { 'day-current': isToday }, { 'day-not': false }]"
    @click="switchDay(getCurrent)"
  >
    <span>{{ getDate }}</span>
  </li>
</template>
<script>
import dayjs from "dayjs";

export default {
  name: "CalendarMonthDayItem",
  props: {
    //判斷是不是今天
    isToday: {
      type: Boolean,
      default: false,
    },
    day: {
      type: Object,
      require: true,
    },
    isCurrentMonth: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    getDate() {
      return dayjs(this.day.date).format("D");
    },
    getCurrent() {
      return dayjs(this.day.date).format("YYYY-MM-DD");
    },
  },
  methods: {
    switchDay(selectedDay) {
      console.log(selectedDay);
      //回傳點選日期
      this.$emit("updateCurrentDay", selectedDay);
    },
  },
};
</script>
<style>
.calendar_day {
  cursor: pointer;
}
.day-current {
  color: #be875c;
  font-weight: 600;
}
</style>
