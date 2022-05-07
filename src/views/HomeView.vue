<template>
  <div class="home">
    <router-link to="/search">search-icon </router-link>
    <router-link to="/search-map">地圖找展</router-link>
    <router-link to="/shared">分享展覽</router-link>
    <!-- <router-link to="/shared">分享展覽</router-link> -->
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  created() {
    console.log(this.$route);
  },
};
</script>
