<template>
  <main class="home">
    <RouterNavbarVue />
    <section class="home_carousel">
      <div class="carousel_header">
        <h2 class="carousel_title">沒有想法嗎?</h2>
        <div class="carousel_image">
          <img src="@/assets/images/iconoir_light-bulb-on.png" alt="燈泡圖示" />
        </div>
        <p class="carousel_description">看看最近有什麼最新展覽吧!</p>
      </div>
      <SwiperSComponent :api="recievedAPI" />
      <!-- <Carousel :api="recievedAPI" /> -->
    </section>
    <section class="home_recent-exhibition">
      <!-- 保有部分nest,也保有權重 -->
      <div class="title">
        <h3>近期展覽</h3>
        <!-- todo 超連結 -->
        <a href="##">See All</a>
      </div>
      <div class="filter">
        <!-- todo 篩選 -->
        <Selected
          v-for="(data, index) in time"
          :key="index"
          :api="data"
          @update="renewAPI"
        />
      </div>
      <div class="content">
        <Card
          v-for="value in recieveSpecificRange"
          :key="value.UID"
          :api="value"
        />
      </div>
    </section>
  </main>
</template>

<script>
import RouterNavbarVue from "@/components/Navbar/RouterNavbar.vue";
// import Carousel from "@/plugins/Carousel.vue";
import Card from "@/components/Card.vue";
import Selected from "@/components/Buttons/Selected.vue";
import SwiperSComponent from "@/plugins/Swiper.vue";

export default {
  name: "HomeView",
  components: {
    Card,
    Selected,
    // Carousel,
    RouterNavbarVue,
    SwiperSComponent,
  },
  async created() {
    // await this.$store.dispatch("getCurrentPosition");
    await this.$store.dispatch("getAPI");
  },
  async mounted() {
    await this.$store.dispatch("getAPI");
  },

  data() {
    return {
      time: ["不限", "一週", "一個月", "三個月"],
      selected: null,
      specificRangeExhibition: null,
    };
  },
  methods: {
    renewAPI(selected) {
      console.log("message", selected);
      //根據使用者當前時間
      //current year / month / day
      if (selected === "一週") {
        this.$store.commit("openWithinWeek");
      }
      if (selected === "一個月") {
        this.$store.commit("openWithinMonth", 1);
      }
      if (selected === "三個月") {
        this.$store.commit("openWithThreeMonth", 3);
      }
    },
  },
  computed: {
    // get api from vuex
    recievedAPI() {
      return this.$store.getters.withImageAPI;
    },
    recieveSpecificRange() {
      return this.$store.state.specificRangeExhibitions;
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset.scss";
@use "@/assets/scss/base/breakpoints";
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;

  //作為navbar參考
  position: relative;

  &_carousel {
    text-align: start;

    margin-bottom: 35px;
    @include breakpoints.desktop {
      gap: 20px;
    }
    .carousel_header {
      display: flex;
      flex-wrap: wrap;
      @include breakpoints.desktop {
        margin-left: 120px;
        margin-bottom: 40px;
      }
      .carousel_title {
        display: inline-block;
        font-size: 32px;
        font-weight: 800;
      }
      .carousel_image {
        width: 25px;
        height: 35px;

        img {
          height: 100%;
          object-fit: contain;
        }
      }
      .carousel_description {
        flex-basis: 100%;
        color: #757575;
        @include breakpoints.desktop {
          font-size: 24px;
          margin-top: 17px;
        }
      }
    }
  }
  &_recent-exhibition {
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
      color: #757575;
    }
    .filter {
      display: flex;
      text-align: start;
      margin-bottom: 16px;

      // 針對button的排版
      button {
        margin-right: 5px;
        &:last-child {
          margin-right: 0;
        }
      }
      @include breakpoints.desktop {
        justify-content: center;
      }
    }
    .content {
      @include breakpoints.desktop {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}
</style>
