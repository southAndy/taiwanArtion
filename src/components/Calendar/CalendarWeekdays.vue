<template>
  <ol class="day-week">
    <li v-for="(weekDay, index) in WEEKDAYS" :key="index">{{ weekDay }}</li>
  </ol>
</template>
<script>
export default {
  name: "CalendarWeekdays",
  data() {
    return {
      WEEKDAYS: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    };
  },
};
</script>
<style lang="scss" scoped>
.day-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0;
<<<<<<< HEAD
  margin-top: 20px;
=======
>>>>>>> 5162c4b05638502fe3ddf5e0e132cda2b5f31400
}
</style>
