<template>
  <div class="calendar_container">
    <div class="scroll">
      <h3 class="scroll_year">2022 年</h3>
      <div class="scroll_month">
        <div
          class="scroll_month-list"
          v-for="(month, index) in monthList"
          :key="index"
        >
          <h4>{{ month.short }}</h4>
          <!-- todo class="active" 的邏輯 -->
          <p>{{ month.cn }}</p>
        </div>
      </div>
    </div>
    <!-- customer line -->
    <div
      style="
        width: 100%;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        background-color: #f5f5f5;
        padding: 15px;
      "
    >
      <a-calendar
        v-model:value="value"
        :fullscreen="false"
        @panelChange="onPanelChange"
      >
        <template
          #headerRender="{ value: current, type, onChange, onTypeChange }"
        >
          <div style="padding: 10px">
            <div style="margin-bottom: 10px">{{ value }}</div>
            <a-row type="flex" justify="space-between">
              <a-col>
                <a-radio-group
                  size="small"
                  :value="type"
                  @change="(e) => onTypeChange(e.target.value)"
                >
                  <a-radio-button value="month">Month</a-radio-button>
                  <a-radio-button value="year">Year</a-radio-button>
                </a-radio-group>
              </a-col>
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  class="my-year-select"
                  :value="String(current.year())"
                  @change="
                    (newYear) => {
                      onChange(current.year(newYear));
                    }
                  "
                >
                  <a-select-option
                    v-for="val in getYears(current)"
                    :key="String(val)"
                    class="year-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
              <a-col>
                <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  :value="String(current.month())"
                  @change="
                    (selectedMonth) => {
                      onChange(
                        current.month(parseInt(String(selectedMonth), 10))
                      );
                    }
                  "
                >
                  <a-select-option
                    v-for="(val, index) in getMonths(current)"
                    :key="String(index)"
                    class="month-item"
                  >
                    {{ val }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </div>
        </template>
      </a-calendar>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const value = ref();

    const monthList = [
      { short: "JAN", cn: "1月" },
      { short: "FEB", cn: "2月" },
      { short: "MAR", cn: "3月" },
      { short: "APR", cn: "4月" },
      { short: "MAY", cn: "5月" },
      { short: "JUN", cn: "6月" },
      { short: "JUL", cn: "7月" },
      { short: "AUG", cn: "8月" },
      { short: "SEP", cn: "9月" },
      { short: "OCT", cn: "10月" },
      { short: "NOV", cn: "11月" },
      { short: "DEC", cn: "12月" },
    ];

    const onPanelChange = (value, mode) => {
      console.log(value, mode);
    };

    const getMonths = (value) => {
      const localeData = value.localeData();
      const months = [];

      for (let i = 0; i < 12; i++) {
        months.push(localeData.monthsShort(value.month(i)));
      }

      return months;
    };

    const getYears = (value) => {
      const year = value.year();
      const years = [];

      for (let i = year - 10; i < year + 10; i += 1) {
        years.push(i);
      }

      return years;
    };

    return {
      value,
      onPanelChange,
      getMonths,
      getYears,
      //custom part -----
      monthList,
    };
  },
});
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset";
.calendar_container {
  // background-color: #f5f5f5;
  // padding: 15px;
  .scroll {
    &_year {
      color: #be875c;
      text-align: start;
    }
    .scroll_month {
      display: flex;
      overflow: scroll;

      &-list {
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
}
.active {
  border: 1px solid #be875c;
  border-radius: 7px;
  color: #be875c;
}
</style>
