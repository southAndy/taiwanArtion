<template>
  <div class="result_card">
    <div class="card_image">
      <!-- <img src="@/assets/images/Frame89.png" alt="" /> -->
      <img
        :src="result.imageUrl || `@/assets/images/Frame89.png`"
        alt="展覽圖片"
      />
    </div>
    <div class="card_content">
      <div class="title">
        <!-- todo api replace -->
        <h3>{{ result.title }}</h3>
        <p>{{ result.startDate }}-{{ result.endDate }}</p>
      </div>
      <div class="content">
        <i class="content_icon"></i>
        <p class="content_place">
          {{ result.showInfo[0].location }},{{ result.showUnit }}
        </p>
        <p class="content_price">
          {{ result.showInfo[0].price || "無票價資訊" }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
  props: ["result"],
};
</script>
<style lang="scss" scoped>
//mobile :390px i12-pro
@use "@/assets/scss/base/reset";
.result_card {
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  padding: 16px;
  width: 360px;
  border-radius: 10px;
  margin: 0 auto;
  margin-bottom: 16px;

  .card_image {
    img {
      width: 100%;
    }
  }

  .card_content {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .title {
      flex-basis: 60%;
      align-self: center;
      text-align: start;
      h3 {
        font-size: 18px;
        margin: 0;
      }
      p {
        font-size: 12px;
        text-align: start;
        color: black;
      }
    }
    .content {
      flex-basis: 40%;
      font-size: 12px;
      &_icon {
        background: url("@/assets/images/Vector拷貝.png") no-repeat;

        display: inline-block;
        height: 19px;
        width: 16px;
      }
      &_place {
        display: inline-block;
        color: black;
      }
      &_price {
        background: #be875c;
        color: white;
        border-radius: 4px;
      }
    }
  }
}
</style>
