<script>
import Card from "@/components/Card.vue";
export default {
  name: "my-carousel",
  components: {
    Card,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <div>
    <div>
      <Card />
    </div>
    <div>
      <button v-for="button in 3" :key="button"></button>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
