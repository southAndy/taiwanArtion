<template>
  <div class="card">
    <div class="card_image">
      <img src="@/assets/images/icon.png" alt="" />
    </div>
    <div>
      <h3>會動的文藝復興</h3>
      <span>2020/03/21 - 4/20</span>
      <span>臺南市,奇美博物館</span>
    </div>
    <span>$300</span>
  </div>
</template>
<script>
export default {
  name: "Extension_Card",
};
</script>
<style lang="scss" scoped>
.card {
  display: flex;
  border-radius: 20px;
  &_image {
    width: 107px;
    height: 87px;
  }
}
</style>
