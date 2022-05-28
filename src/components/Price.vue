<template>
  <div class="price">
    <div class="price_access">
      <h4>購票方式</h4>
      <p>KKTIX及全台全家便利商店</p>
    </div>
    <div class="price_list">
      <h4>購票資訊</h4>
      <ol>
        <li v-for="list in 4" :key="list">
          <span class="price_list-category">一般票</span
          ><span class="price_list-price">$490</span
          ><span class="price_list-rule"
            >>1. 3歲(含)以上兒童 2.
            本國大專院校以下學生(不含碩博士、空中大學等)，需出示相關有效證件正本</span
          >
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
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
