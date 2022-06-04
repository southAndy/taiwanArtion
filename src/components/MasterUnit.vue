<template>
  <div class="master">
    <Selected v-for="(value, index) in masterUnitList" :key="index">
      {{ value }}
    </Selected>
  </div>
</template>
<script>
import Selected from "@/components/Buttons/Selected.vue";
export default {
  name: "MasterUnit",
  components: { Selected },
  data() {
    return {
      masterUnitList: ["不限", "文創園區", "美術館", "藝文中心"],
    };
  },
};
</script>
<style lang="scss" scoped>
.master {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
</style>
