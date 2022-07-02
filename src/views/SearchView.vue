<script>
import Search from "@/components/Search.vue";
import Select_Navbar from "@/components/Navbar/Select.vue";
import RecentSearch from "@/components/RecentSearch.vue";

export default {
  name: "SearchView",
  components: {
    Search,
    Select_Navbar,
    RecentSearch,
  },
  created() {
    this.$store.dispatch("getAPI");
  },
  data() {
    return {
      showRecent: false,
    };
  },
  methods: {
    //? 確定搜尋種類
    sendSearch() {
      console.log("message");
      this.$router.push({ name: "ResultView" });
    },
    //click
    isClicked(value) {
      console.log("mom clicked", value);
      this.showRecent = !this.showRecent;
    },
  },
};
</script>
<template>
  <div class="search">
    <Search @input="showRecent = !showRecent" />
    <Select_Navbar />
    <RecentSearch v-show="showRecent" />
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset.scss";
@use "@/assets/scss/base/colors.scss";

.search {
  height: 100vh;
  padding: 16px 16px;
  background: #ffffff;

  &_type {
    display: flex;
    margin: 15px 0;
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.2);

    &-list {
      border: none;
      background: none;

      &:active {
        background-color: colors.$primary_color;
        color: white;
      }
    }
  }
  &_send {
    width: 100%;
    height: 36px;
    border-radius: 4px;
    border: none;
    margin-top: 35px;
    &:hover {
      background-color: colors.$primary_color;
    }
  }
}
.active {
  color: colors.$primary_color;
  border-bottom: 1px solid colors.$primary_color;
}
</style>
