<template>
  <div class="scroll">
    <h3 class="scroll_year">2022 年</h3>
    <div class="scroll_month">
      <div
        class="scroll_month-list"
        v-for="(month, index) in monthList"
        :key="index"
      >
        <h4 :class="{ fontactive: currentMonth === month.value }">
          {{ month.short }}
        </h4>
        <!-- todo calendar select -->
        <p
          @click="selectSpecificDate(month.value)"
          :class="{ clicked: currentMonth === month.value }"
        >
          {{ month.cn }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  name: "CalendarDateSelector",
  props: {
    currentDate: {
      type: String,
      required: true,
    },

    selectedDate: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      monthList: [
        { short: "JAN", cn: "1月", value: 0 },
        { short: "FEB", cn: "2月", value: 1 },
        { short: "MAR", cn: "3月", value: 2 },
        { short: "APR", cn: "4月", value: 3 },
        { short: "MAY", cn: "5月", value: 4 },
        { short: "JUN", cn: "6月", value: 5 },
        { short: "JUL", cn: "7月", value: 6 },
        { short: "AUG", cn: "8月", value: 7 },
        { short: "SEP", cn: "9月", value: 8 },
        { short: "OCT", cn: "10月", value: 9 },
        { short: "NOV", cn: "11月", value: 10 },
        { short: "DEC", cn: "12月", value: 11 },
      ],
      currentMonth: dayjs().month(),
      isClicked: false,
    };
  },
  computed: {},
  methods: {
    selectSpecificDate(month) {
      //class綁定依據
      this.currentMonth = month;

      //回傳month去修改顯示month
      let newSelectedDate = dayjs().month(month);
      console.log(newSelectedDate);
      this.$emit("dateSelected", newSelectedDate);
    },
  },
};
</script>
<style lang="scss" scoped>
.scroll {
  &_year {
    color: #be875c;
    text-align: start;
  }
  .scroll_month {
    display: flex;
    overflow: scroll;

    &-list {
      flex-shrink: 0;
      cursor: pointer;
      width: 50px;
      height: 70px;
      margin-right: 15px;
      &:nth-child(10),
      &:nth-child(12) {
        flex-shrink: 0;
      }
      h4 {
        font-size: 14px;
      }
    }
  }
}
.clicked {
  border: 1px solid #be875c;
  border-radius: 7px;
  color: #be875c;
  font-weight: 600;
}
.fontactive {
  color: #be875c;
}
</style>
