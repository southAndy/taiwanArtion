<template>
  <section
    class="location"
    v-for="(locate, index) in locationList"
    :key="index"
  >
    <div class="location_title">
      <h3>
        {{ locate.zone }}
      </h3>
      <!-- todo click 會全選 -->
      <button>全選</button>
    </div>
    <!-- todo 把回傳值丟回 .views -->
    <div class="location_city">
      <Button v-for="city in locate.cities" :key="city">{{ city }}</Button>
    </div>
  </section>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  name: "Search_Location",
  components: { Button },
  data() {
    return {
      locationList: [
        {
          zone: "北部地區",
          cities: ["台北", "新北", "基隆", "桃園", "新竹", "宜蘭"],
        },
        {
          zone: "中部地區",
          cities: ["苗栗", "台中", "彰化", "南投", "雲林"],
        },
        {
          zone: "南部地區",
          cities: ["嘉義", "台南", "高雄", "屏東"],
        },
        {
          zone: "東部地區",
          cities: ["台東", "花蓮"],
        },
        {
          zone: "離島",
          cities: ["澎湖", "金門", "馬祖", "綠島", "蘭嶼"],
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.location {
  margin-top: 16px;

  &_title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    h3 {
      font-size: 16px;
      margin: 0;
      text-align: start;
      align-self: center;
    }
    button {
      color: black;
      border: none;
      background-color: unset;
    }
  }

  &_city {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
  }
}
</style>
