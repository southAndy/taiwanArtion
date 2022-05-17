<template>
  <button>不限</button>
</template>
<script>
export default {
  name: "Filter_Button",
};
</script>
<style lang="scss" scoped>
@use "../assets/scss/base/colors.scss";
@use "../assets/scss/base/breakpoints.scss";

button {
  width: 80px;
  //   height: 18px;
  color: black;
  border: none;
  border-radius: 20px;
  &:hover {
    background-color: colors.$primary_color;
    color: white;
  }
}
</style>
