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
    receivedCity() {
      return this.$store.getters?.withSpecificCityAPI;
    },
  },
  methods: {},
  created() {
    this.$store.commit("receivedSelected", this.$route.query.selected);
    this.$store.dispatch("getAPI");
  },
};
</script>
<template>
  <div class="result">
    <Search />
    <Navbar_select />
    <h3 class="result_title">
      {{ this.$store.state.selected }}市,{{
        `找到${receivedCity.length}件展覽!` || "共500件展覽"
      }}
    </h3>
    <div class="result_card" v-if="receivedCity">
      <router-link
        :to="{ name: 'DetailView', params: { id: result.UID } }"
        v-for="result in receivedCity"
        :key="result"
      >
        <Result_Card :result="result" />
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
