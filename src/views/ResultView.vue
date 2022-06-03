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
  methods: {},
};
</script>
<template>
  <div class="result">
    <Search />
    <Navbar_select />
    <h3 class="result_title">臺北市,共500件展覽</h3>
    <div class="result_card">
      <router-link
        :to="{ name: 'DetailView', params: { id: 4 } }"
        v-for="result in 4"
        :key="result"
      >
        <Result_Card />
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.result {
  padding: 16px;
  &_title {
    font-size: 16px;
    text-align: start;
  }
  &_card {
    display: flex;
    flex-direction: column;
  }
}
</style>
