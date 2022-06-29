<template>
  <div class="calendar">
    <CalendarDateSelectorVue
      :current-date="today"
      :selected-date="selectedDate"
      @dateSelected="selectDate"
    />
    <div>
      <div class="calendar_month">
        <CalendarDateIndicatorVue :selected-date="selectedDate" />
        <CalendarWeekdaysVue />
        <div class="calendar_month-list">
          <CalendarMonthDayItemVue
            v-for="day in createCurrentMonthDays"
            :key="day.date"
            :day="day"
            :is-today="today === day.date"
            :class="{ active: today === day.date }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
//判斷每週第一天的套件
import weekday from "dayjs/plugin/weekday";
//設定每個月開始的week
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

import CalendarDateSelectorVue from "./CalendarDateSelector.vue";

//calendar body
import CalendarDateIndicatorVue from "./CalendarDateIndicator.vue";
import CalendarWeekdaysVue from "./CalendarWeekdays.vue";
import CalendarMonthDayItemVue from "./CalendarMonthDayItem.vue";
export default {
  name: "CalendarMonth",
  components: {
    CalendarDateSelectorVue,
    CalendarDateIndicatorVue,
    CalendarWeekdaysVue,
    CalendarMonthDayItemVue,
  },
  data() {
    return {
      selectedDate: dayjs(),
    };
  },
  computed: {
    renderDay() {
      return [
        { date: "2020-06-29", isCurrentMonth: false },
        { date: "2020-06-30", isCurrentMonth: false },
        { date: "2020-07-01", isCurrentMonth: true },
        { date: "2020-07-02", isCurrentMonth: true },
      ];
    },
    today() {
      return dayjs().format("YYYY-MM-DD");
    },
    month() {
      return Number(this.selectedDate.format("M"));
    },
    year() {
      return Number(this.selectedDate.format("YYYY"));
    },
    nextMonthDays() {
      let lastDayOfTheMonthWeekday = this.getWeek(
        `${this.year}-${this.month}-${this.createCurrentMonthDays.length}`
      );
      console.log(lastDayOfTheMonthWeekday);
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
      console.log("下個月", nextMonth);
      return 1;
    },
    numberOfDaysInMonth() {
      //利用dayIsMonth方法, 可以知道特定月份有幾天;
      return dayjs(this.selectedDate).daysInMonth();
    },
    createCurrentMonthDays() {
      //[...Array(this.numberOfDaysInMonth)] 根據不同的月份產生不同長度Array
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        //在每個內容加上對應的日期資料
        console.log(dayjs().format("YYYY-MM-DD"));
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
            "YYYY-MM-DD"
          ),
          isCurrentMonth: true,
        };
      });
    },
  },
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    getWeek(date) {
      return dayjs(date).weekday();
    },
  },
};
</script>
<style lang="scss" scoped>
.calendar_month {
  border-radius: 20px;
  border: 1px solid gray;
  margin: 20px auto;

  &-list {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }
  .active {
    border: 1px solid #be875c;
    border-radius: 7px;
    color: #be875c;
    font-weight: 600;
  }
}
</style>
