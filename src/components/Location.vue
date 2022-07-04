<template>
  <div class="location_container">
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
      <div class="location_city">
        <Selected
          v-for="(city, index) in locate.cities"
          :key="index"
          :api="city"
          @update="updateAPI"
          :class="{ selected: this.detectCurrentCity === city }"
        />
      </div>
    </section>
  </div>
</template>
<script>
import Selected from "@/components/Buttons/Selected.vue";

export default {
  name: "Search_Location",
  components: {
    Selected,
  },
  data() {
    return {
      locationList: [
        {
          zone: "北部地區",
          cities: ["臺北", "新北", "基隆", "桃園", "新竹", "宜蘭"],
        },
        {
          zone: "中部地區",
          cities: ["苗栗", "臺中", "彰化", "南投", "雲林"],
        },
        {
          zone: "南部地區",
          cities: ["嘉義", "臺南", "高雄", "屏東"],
        },
        {
          zone: "東部地區",
          cities: ["臺東", "花蓮"],
        },
        {
          zone: "離島",
          cities: ["澎湖", "金門", "馬祖", "綠島", "蘭嶼"],
        },
      ],
    };
  },
  computed: {
    detectCurrentCity() {
      return this.$store.state.selectedList.city;
    },
  },
  methods: {
    updateAPI(selected) {
      this.$store.commit("storeCity", selected);
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/colors";

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
.selected {
  background-color: colors.$primary-color;
  color: white;
}
</style>
