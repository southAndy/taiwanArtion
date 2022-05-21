<template>
  <div class="card">
    <router-link :to="{ name: 'DetailView', query: { uid: api.UID } }">
      <div class="card_image">
        <img :src="api.imageUrl" alt="" />
      </div>
      <div class="card_content">
        <!-- ? title -->
        <!-- todo 字體太大的...效果 -->
        <h3 class="card_content-title">{{ api?.title }}</h3>
        <!--? time -->
        <p>展覽日期: {{ api?.startDate }} - {{ api?.endDate }}</p>
        <!-- ? city,location -->
        <p>地點: {{ api.showInfo[0].location || "縣市" }}</p>
        <p>單位: {{ api.showUnit || "單位" }}</p>
      </div>
      <!-- ? price -->
      <!-- <span>{{ api.showInfo[0].price }}</span> -->
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Extension_Card",
  props: ["api"],
  data() {
    return {
      homeAPI: this.api,
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset";
@use "@/assets/scss/base/colors";
.card {
  display: flex;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  margin-bottom: 15px;

  &_image {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    font-size: 1rem;
    img {
      width: 100%;
    }
  }
  &_content {
    padding: 2px 10px;
    &-title {
      font-size: 20px;
    }
    p {
      text-align: start;
    }
  }
}
</style>
