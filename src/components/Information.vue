<template>
  <div class="information">
    <div class="information_date">
      <h4>展覽日期</h4>
      <span>台北站 | 2022/1月22日-5月2日</span>
    </div>
    <div class="information_address">
      <h4>地址</h4>
      <p>台北花博流行館</p>
    </div>
    <div class="information_offical">
      <h4>官網</h4>
      <p>https://www.firenzeculturex.com/</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "Information",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/fonts";
.information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: start;

  h4 {
    @extend %subtitle;
  }
  &_date,
  &_address,
  &_offical {
    margin-bottom: 16px;
  }
}
</style>
