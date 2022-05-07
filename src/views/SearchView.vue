<script>
export default {
  name: "SearchView",
  data() {
    return {};
  },
  methods: {
    tempSwitchPage() {
      this.$router.push({ name: "ResultView" });
    },
  },
};
</script>
<template>
  <div class="search">
    <!-- todo 以動態component切換 -->
    <router-link :to="{ name: 'DetailView' }">不限區域</router-link>
    <router-link :to="{ name: 'DetailView' }">單位</router-link>
    <router-link :to="{ name: 'DetailView' }">日期</router-link>
    <router-view></router-view>
    <button @click="tempSwitchPage">確定</button>
  </div>
</template>
