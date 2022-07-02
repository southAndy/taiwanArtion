<template>
  <div class="result">
    <Search />
    <Navbar_select />
    <h3 class="result_title">
      {{ selectCity }}市,{{
        `找到${selectedAPI.length}件展覽!` || "共500件展覽"
      }}
    </h3>
    <div class="result_content" v-if="selectedAPI">
      <router-link
        :to="{ name: 'DetailView', query: { id: result.UID } }"
        v-for="result in selectedAPI"
        :key="result.UID"
      >
        <Result_Card :result="result" />
      </router-link>
      <router-view></router-view>
    </div>
  </div>
</template>
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
  computed: {
    selectedAPI() {
      console.log("excuting");
      return this.$store?.getters.mutipleSelect || [];
    },
    selectCity() {
      return this.$store.state.selectedList.city;
    },
  },
  methods: {},
  async created() {
    await this.$store.dispatch("getAPI");
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/breakpoints";
.result {
  padding: 16px;
  &_title {
    font-size: 16px;
    text-align: start;
  }
  &_content {
    display: flex;
    flex-direction: column;
    @include breakpoints.desktop {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
    }
  }
}
</style>
