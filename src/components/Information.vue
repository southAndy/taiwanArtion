<template>
  <div class="information">
    <div class="information_date">
      <h4>展覽日期</h4>
      <!-- todo skeleton -->
      <!-- todo 剩下幾天 -->
      <span v-if="withSpecificUIDAPI"
        >{{ withSpecificUIDAPI[0]?.startDate }}-{{
          withSpecificUIDAPI[0]?.endDate
        }}</span
      >
    </div>
    <!-- todo skeleton -->
    <div class="information_address">
      <!-- todo google map link -->
      <h4>地址</h4>
      <p>{{ withSpecificUIDAPI[0]?.showInfo[0].location }}</p>
      <p>{{ withSpecificUIDAPI[0]?.showInfo[0].locationName }}</p>
    </div>
    <!-- todo skeleton -->
    <div class="information_offical">
      <h4>官網</h4>
      <a :href="withSpecificUIDAPI[0]?.sourceWebPromote">{{
        withSpecificUIDAPI[0]?.sourceWebPromote || "無資訊"
      }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: ["withSpecificUIDAPI"],
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
  p {
    margin: 0;
  }
}
</style>
