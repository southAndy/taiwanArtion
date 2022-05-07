<script>
export default {
  name: "searchMap",
  //   setup() {},
  methods: {
    search() {
      //   this.$route.push()
    },
  },
};
</script>
<template>
  <div class="map">
    <input />
    <button>click here</button>
    <!-- path -->
    <!-- <router-link to="/search-map/detail">see detail</router-link> -->
    <!-- router-name -->
    <router-link :to="{ name: 'DetailView' }">不限區域</router-link>
    <router-link :to="{ name: 'DetailView' }">單位</router-link>
    <router-link :to="{ name: 'DetailView' }">日期</router-link>
    <router-view></router-view>
  </div>
</template>
