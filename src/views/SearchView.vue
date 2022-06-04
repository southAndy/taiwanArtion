<script>
import Search from "@/components/Search.vue";
import Select_Navbar from "@/components/Navbar/Select.vue";

export default {
  name: "SearchView",
  components: {
    Search,
    Select_Navbar,
  },
  data() {
    return {};
  },
  methods: {
    // todo 確定搜尋種類
    sendSearch() {
      console.log("message");
      this.$router.push({ name: "ResultView" });
    },
  },
};
</script>
<template>
  <div class="search">
    <Search />
    <Select_Navbar />
    <!-- todo 同步變色 -->
    <!-- <button class="search_send" @click="sendSearch">確定</button> -->
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset.scss";
@use "@/assets/scss/base/colors.scss";

.search {
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
