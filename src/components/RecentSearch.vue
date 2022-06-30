<script>
export default {
  name: "Recent_Search",
  props: [],
};
</script>
<template>
  <div class="recent">
    <div class="recent_title">
      <h2>最近搜尋紀錄</h2>
      <span>清除紀錄</span>
    </div>
    <router-link
      :to="{ name: 'ResultView' }"
      class="recent_list"
      v-for="list in 4"
      :key="list"
    >
      <h3>{{ "奇美博物館 " }}</h3>
      <span><img src="@/assets/images/arrowicon.png" alt="搜尋圖示" /></span>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
.recent {
  display: flex;
  flex-direction: column;
  padding: 10px 8px;
  position: absolute;
  top: 48px;
  left: 50px;

  border: 1px solid #cdcdcd;
  background-color: white;
  border-radius: 0 0 20px 20px;
  &_title {
    display: flex;
    gap: 11px;

    h2 {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
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
