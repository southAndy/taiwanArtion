<template>
  <li :class="['calendar_day', { 'day-current': true }, { 'day-not': false }]">
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
    },
    day: {
      type: Object,
    },
    isCurrentMonth: {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  computed: {
    getDate() {
      return dayjs(this.day.date).format("D");
    },
  },
};
</script>
<style>
.calendar_day {
  cursor: pointer;
}
</style>
