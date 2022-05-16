<template>
  <div class="home">
    <HomeNavbar />
    <Carousel />
    <router-link to="/search">search-icon </router-link>
    <router-link to="/shared">分享展覽</router-link>
    <!-- <router-link to="/shared">分享展覽</router-link> -->
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeNavbar from "@/components/HomeNavbar.vue";
import Carousel from "@/plugins/Carousel.vue";
export default {
  name: "HomeView",
  components: { HomeNavbar, Carousel },
  data() {
    return {};
  },
  created() {
    console.log(this.$route);
  },
};
</script>
