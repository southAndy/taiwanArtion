<template>
  <div class="home">
    <nav class="home_menu">
      <li>
        <img src="@/assets/images/↳Color.png" alt="點擊選單" />
      </li>
      <li>
        <router-link @click="test" to="/search">
          <img src="@/assets/images/icon.png" alt="搜尋" />
        </router-link>
      </li>
    </nav>
    <h2>沒有想法嗎?</h2>
    <span>看看最近有什麼最新展覽吧!</span>
    <HomeNavbar />
    <Carousel />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeNavbar from "@/components/HomeNavbar.vue";
import Carousel from "@/plugins/Carousel.vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "HomeView",
  components: { HomeNavbar, Carousel },
  created() {},
  data() {
    return {};
  },
  methods: {
    ...mapMutations([]),
    ...mapActions([]),
    test() {
      // this.$store.commit("filterAPI/test");
    },
  },
  computed: {
    ...mapState({
      // test: (state) => state.filterAPI.test,
    }),
    ...mapGetters([]),
    cal() {
      return this.$store.getters["filterAPI/calTest"];
    },
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
  }
}
</style>
