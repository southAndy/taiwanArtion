<template>
  <div class="home">
    <!-- <nav class="home_menu">
      <li>
        <img src="@/assets/images/↳Color.png" alt="點擊選單" />
      </li>
      <li>
        <router-link to="/search">
          <img src="@/assets/images/icon.png" alt="搜尋" />
        </router-link>
      </li>
    </nav> -->
    <section class="home_carousel">
      <div class="carousel_header">
        <h2 class="carousel_title">沒有想法嗎?</h2>
        <div class="carousel_image">
          <img src="@/assets/images/iconoir_light-bulb-on.png" alt="燈泡圖示" />
        </div>
        <p class="carousel_description">看看最近有什麼最新展覽吧!</p>
      </div>
      <Carousel :api="recievedAPI" v-if="recievedAPI" />
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
<<<<<<< Updated upstream
      <div class="content">
        <Card v-for="value in recievedAPI" :key="value.UID" :api="value" />
      </div>
=======
      <Card v-for="value in Selected" :key="value.UID" :api="value" />
>>>>>>> Stashed changes
    </section>
  </div>
</template>

<script>
import Carousel from "@/plugins/Carousel.vue";
import Card from "@/components/Card.vue";
import Selected from "@/components/Buttons/Selected.vue";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "HomeView",
  components: {
    Card,
    Selected,
    Carousel,
  },
  async created() {
    await this.$store.dispatch("getAPI");
  },
  data() {
    return {
      time: ["不限", "一週", "一個月", "三個月"],
      selected: null,
    };
  },

  methods: {
    renewAPI(selected) {
      console.log("message", selected);
      //根據使用者當前時間
      let currentTime = new Date();

      // if(selected==="三週")
      // if(selected==="一個月")
      // if(selected==="三個月")

      //current year / month / day
      let rightMonth = currentTime.getMonth();
      let rightDay = currentTime.getDate();
      if (selected === "一週") {
        //call api
        this.selected = this.$store?.state.api?.filter((value) => {
          let apiMonth = new Date(value.endDate).getMonth();
          let apiDate = new Date(value.endDate).getDate();
          if (rightMonth - apiMonth >= 0) {
            if (rightDay - apiDate < 7) {
              return value;
            }
          }
        });
      }
      console.log(rightMonth, rightDay);
      if (selected === "三週") {
        let y = 21;
        this.$store.commit("");
      }
      //api year / month / day
    },
  },
  computed: {
    // get api from vuex
    recievedAPI() {
      return this.$store.getters.withImageAPI;
    },
    ...mapState({
      // test: (state) => state.filterAPI.test,
    }),
    ...mapGetters([]),
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

  &_menu {
    display: flex;
    justify-content: space-between;
    padding: 35px 0;
  }
  &_carousel {
    text-align: start;

    margin-bottom: 35px;

    .carousel_header {
      display: flex;
      flex-wrap: wrap;
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
