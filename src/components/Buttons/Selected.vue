<template>
  <button @click="selectedItems">{{ api }}</button>
</template>
<script>
export default {
  props: ["api"],
  name: "Filter_Button",
  data() {
    return {
      receivedAPI: this.api,
    };
  },
  methods: {
    selectedItems() {
      this.$emit("update", this.receivedAPI);
    },
  },
};
</script>
<style lang="scss" scoped>
@use "../../assets/scss/base/colors.scss";
@use "../../assets/scss/base/breakpoints.scss";

button {
  width: 80px;
  //   height: 18px;
  color: black;
  border: none;
  border-radius: 4px;
  //button space
  margin-right: 5px;
  margin-bottom: 5px;
  &:hover {
    background-color: colors.$primary_color;
    color: white;
  }
}
</style>
