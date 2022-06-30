<template>
<<<<<<< HEAD
  <li
    :class="['calendar_day', { 'day-current': isToday }, { 'day-not': false }]"
    @click="switchDay(getCurrent)"
  >
=======
  <li :class="['calendar_day', { 'day-current': true }, { 'day-not': false }]">
>>>>>>> 5162c4b05638502fe3ddf5e0e132cda2b5f31400
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
<<<<<<< HEAD
      default: false,
    },
    day: {
      type: Object,
      require: true,
    },
    isCurrentMonth: {
      type: Boolean,
      default: false,
=======
    },
    day: {
      type: Object,
    },
    isCurrentMonth: {
      type: Boolean,
>>>>>>> 5162c4b05638502fe3ddf5e0e132cda2b5f31400
    },
  },
  data() {
    return {};
  },
  computed: {
    getDate() {
      return dayjs(this.day.date).format("D");
    },
<<<<<<< HEAD
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
=======
>>>>>>> 5162c4b05638502fe3ddf5e0e132cda2b5f31400
  },
};
</script>
<style>
.calendar_day {
  cursor: pointer;
}
<<<<<<< HEAD
.day-current {
  color: #be875c;
  font-weight: 600;
}
=======
>>>>>>> 5162c4b05638502fe3ddf5e0e132cda2b5f31400
</style>
