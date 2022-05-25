<template>
  <button @click="selectExhibitionTime"><slot></slot>{{ api }}</button>
</template>
<script>
export default {
  props: ["api"],
  name: "Filter_Button",
  data() {
    return {};
  },
  methods: {
    selectExhibitionTime(event) {
      //event points tag self
      let selectTime = event.target.innerText;
      console.log(selectTime);
      //回傳button value
      this.$emit("update", selectTime);
    },
  },
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
