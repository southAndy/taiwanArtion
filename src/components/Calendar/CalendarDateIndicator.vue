<template>
  <div class="date-indicator">{{ selectedMonth || "date-indicator" }}</div>
</template>
<script>
export default {
  name: "CalendarDateIndicator",
  props: {
    //傳入date obj
    selectedDate: {
      type: Object,
      require: true,
    },
  },
  computed: {
    selectedMonth() {
      return this.selectedDate.format("YYYY MMMM");
    },
  },
};
</script>
<style>
.date-indicator {
  font-size: 20px;
  font-weight: 700;
  color: #757575;
}
</style>
