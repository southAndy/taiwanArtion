<template>
  <div class="price">
    <div class="price_access">
      <h4>購票方式</h4>
      <p>KKTIX及全台全家便利商店</p>
    </div>
    <div class="price_list">
      <h4>購票資訊</h4>
      <ol>
        <li v-for="list in withSpecificUIDAPI" :key="list">
          <span class="price_list-category">{{
            withSpecificUIDAPI[0].showInfo[0].onSales === "Y"
              ? "需要購票"
              : "不需要購票"
          }}</span
          ><span class="price_list-rule">{{
            withSpecificUIDAPI[0].showInfo[0].price
          }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  props: ["withSpecificUIDAPI"],
  name: "Detail_Price",
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/fonts";
// %subtitle {
//   color: #cdcdcd;
//   font-size: 12px;
// }

.price {
  h4 {
    @extend %subtitle;
  }
  &_list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: start;

    ol {
      padding: 0;

      li {
        display: flex;
        gap: 20px;
        border-bottom: 1px solid #f5f5f5;
        padding: 10px 0;
        &-price {
          flex-basis: 10%;
        }
        span {
          &:first-child {
            flex-shrink: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  &_access {
    text-align: start;
  }
}
</style>
