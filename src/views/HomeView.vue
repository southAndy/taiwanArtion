<template>
  <div class="home">
    <nav class="home_menu">
      <li>
        <img src="@/assets/images/↳Color.png" alt="點擊選單" />
      </li>
      <li>
        <router-link to="/search">
          <img src="@/assets/images/icon.png" alt="搜尋" />
        </router-link>
      </li>
    </nav>
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
        <a href="##">See All</a>
      </div>
      <div class="filter">
        <Button
          v-for="(data, index) in time"
          :key="index"
          :api="data"
          @update="renewAPI"
        />
      </div>
      <Card v-for="value in recievedAPI" :key="value.UID" :api="value" />
    </section>
    <!-- <HomeNavbar /> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HomeNavbar from "@/components/HomeNavbar.vue";
import Carousel from "@/plugins/Carousel.vue";
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "HomeView",
  components: {
    // HomeNavbar,
    Card,
    Button,
    Carousel,
  },
  async created() {
    // await this.$store.dispatch("filterAPI/getAPI");
    await this.$store.dispatch("getAPI");
  },
  data() {
    return {
      time: ["不限", "一週", "一個月", "三個月"],
    };
  },

  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    renewAPI(selected) {
      console.log("message", selected);
      //
    },
  },

  computed: {
    // get api from vuex
    recievedAPI() {
      // console.log(this.$store.getters("withImageAPI"));
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
      text-align: start;
      margin-bottom: 16px;

      // 針對button的排版
      button {
        margin-right: 5px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
