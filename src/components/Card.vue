<template>
  <div class="card">
    <router-link :to="{ name: 'DetailView', params: { id: api.UID } }">
      <div class="card_image">
        <img :src="api.imageUrl || defaultImage" alt="展覽海報" />
      </div>
      <div class="card_content">
        <!-- ? title -->
        <!-- todo 字體太大的...效果 -->
        <h3 class="card_content-title">{{ api?.title }}</h3>
        <!--? time -->
        <p class="card_content-time">
          {{ api?.startDate }} - {{ api?.endDate }}
        </p>
        <!-- ? city,location -->
        <p class="card_content-place">
          {{ api.showInfo[0].location || "縣市" }}
        </p>
        <p class="card_content-unit">{{ api.showUnit || "單位" }}</p>
      </div>
      <!-- ? price -->
      <span class="card_content-price">{{
        api.showInfo[0].price != "" ? "需要付費" : "免費入場"
      }}</span>
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
      defaultImage: require("@/assets/images/5248954-02.png"),
    };
  },
  computed: {},
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset";
@use "@/assets/scss/base/colors";
@use "@/assets/scss/base/breakpoints";
.card {
  display: flex;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
  margin-bottom: 15px;

  padding: 20px;
  @include breakpoints.desktop {
    flex-basis: 40%;
  }

  a {
    display: flex;
  }

  &_image {
    flex-basis: 40%;

    width: 100%;
    height: 100%;
    margin-bottom: 10px;
    font-size: 1rem;
    img {
      width: 100%;
    }
  }
  &_content {
    flex-basis: 40%;
    margin-left: 10px;

    &-title {
      font-size: 18px;
    }
    p {
      text-align: start;
    }
    &-time {
      font-size: 11px;
      width: 145px;
    }
    &-price {
      align-self: end;
      background: #be875c;
      color: white;
      border-radius: 4px;
      font-size: 12px;
      flex-basis: 20%;
    }
  }
}
</style>
