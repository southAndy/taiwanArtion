<script>
export default {
  name: "Recent_Search",
  props: [],
};
</script>
<template>
  <div class="search">
    <div class="search_title">
      <h2>最近搜尋紀錄</h2>
      <span>清除紀錄</span>
    </div>
    <router-link
      :to="{ name: 'ResultView' }"
      class="search_list"
      v-for="list in 4"
      :key="list"
    >
      <h3>{{ "奇美博物館 " }}</h3>
      <span><img src="@/assets/images/arrowicon.png" alt="搜尋圖示" /></span>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;

  &_title {
    display: flex;
    justify-content: space-between;

    h3 {
      font-size: 18px;
      font-weight: 700;
    }
  }

  &_list {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin: 20px 0;

    h3 {
      font-size: 16px;
      color: gray;
    }
  }
}
</style>
