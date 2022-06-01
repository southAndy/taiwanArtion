<script>
import Result_Card from "@/components/Cards/Result.vue";
import Search from "@/components/Search.vue";
import Navbar_select from "@/components/Navbar/Select.vue";

export default {
  name: "ResultView",
  components: {
    Result_Card,
    Search,
    Navbar_select,
  },
};
</script>
<template>
  <div class="result">
    <Search />
    <Navbar_select />
    <h3>臺北市,共500件展覽</h3>
    <router-link :to="{ name: 'ResultView' }">card</router-link>
    <router-view>
      <Result_Card />
    </router-view>
  </div>
</template>
<style>
.result {
  padding: 16px;
}
</style>
