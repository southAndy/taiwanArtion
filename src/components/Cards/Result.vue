<template>
  <div class="result_card">
    <div class="card_image">
      <img src="@/assets/images/Frame89.png" alt="" />
    </div>
    <div class="card_content">
      <div class="title">
        <!-- todo api replace -->
        <h3>會動的文藝復興</h3>
        <p>2020/03/21-4/20</p>
      </div>
      <div class="content">
        <i class="content_icon"></i>
        <p class="content_place">台南市,奇美博物館</p>
        <p class="content_price">$300</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
};
</script>
<style lang="scss" scoped>
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

  .card_content {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;

    .title {
      align-self: center;
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
