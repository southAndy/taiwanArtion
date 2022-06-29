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
            v-for="day in days"
            :key="day.date"
            :day="day"
            :is-today="today === day.date"
            :class="{ active: currentDay === day.date }"
            @updateCurrentDay="updateCurrentDay"
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

//calendar control
import CalendarDateSelectorVue from "./CalendarDateSelector.vue";

//calendar body component
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
      currentDay: "",
    };
  },
  computed: {
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
    //利用dayIsMonth方法, 可以知道特定月份有幾天;
    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },
    createCurrentMonthDays() {
      //[...Array(this.numberOfDaysInMonth)] 根據不同的月份產生不同長度Array,ex:5=>31
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        //在每個內容加上對應的日期資料
        return {
          date: dayjs(`${this.year}-${this.month}-${index + 1}`).format(
            "YYYY-MM-DD"
          ),
          isCurrentMonth: true,
        };
      });
    },
    createPreviousMonthDays() {
      //當月第一天是星期幾
      const firstDayOfCurrentMonthWeekday = this.getWeek(
        this.createCurrentMonthDays[0].date
      );
      //subtract(+:previous/-:next,單位): clone 指定月日()
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        "month"
      );
      //todo why 6?
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfCurrentMonthWeekday
        ? firstDayOfCurrentMonthWeekday - 1
        : 6;
      //找到前月最後的週一是幾號
      const previousMonthLastMondayDayOfMonth = dayjs(
        this.createCurrentMonthDays[0].date
      )
        .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
        .date();
      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, amountOfDays) => {
          return {
            date: dayjs(
              `${previousMonth.year()}-${previousMonth.month() + 1}-${
                previousMonthLastMondayDayOfMonth + amountOfDays
              }`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false,
          };
        }
      );
    },
    createNextMonthDays() {
      const lastDaysOfCurrentMonthWeekday = this.getWeek(
        this.createCurrentMonthDays[
          `${this.year}-${this.month}-${this.createCurrentMonthDays.length}`
        ]
      );
      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, "month");
      //todo why??
      const visibleNumberOfDaysFromNextMonth = lastDaysOfCurrentMonthWeekday
        ? 7 - lastDaysOfCurrentMonthWeekday
        : lastDaysOfCurrentMonthWeekday;
      return [...Array(visibleNumberOfDaysFromNextMonth)].map(
        (day, amountOfDays) => {
          return {
            date: dayjs(
              `${nextMonth.year()}-${nextMonth.month() + 1}-${amountOfDays + 1}`
            ).format("YYYY-MM-DD"),
            isCurrentMonth: false,
          };
        }
      );
    },
    //包括previous/current/next 的日期
    days() {
      return [
        ...this.createPreviousMonthDays,
        ...this.createCurrentMonthDays,
        ...this.createNextMonthDays,
      ];
    },
  },
  methods: {
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    getWeek(date) {
      return dayjs(date).weekday();
    },
    updateCurrentDay(selectedDay) {
      this.currentDay = selectedDay;
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
    grid-template-rows: repeat(5, 20%);
    overflow: hidden;
  }
  .active {
    border: 1px solid #be875c;
    border-radius: 7px;
    color: #be875c;
    font-weight: 600;
  }
}
</style>
