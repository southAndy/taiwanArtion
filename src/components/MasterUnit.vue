<template>
  <div class="master">
    <Button v-for="(value, index) in masterUnitList" :key="index">
      {{ value }}
    </Button>
  </div>
</template>
<script>
import Button from "@/components/Button.vue";
export default {
  name: "MasterUnit",
  components: { Button },
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
