<template>
  <button @click="sendResult" :class="['send', { selected: this.selected }]">
    確定
  </button>
</template>
<script>
export default {
  name: "SendResult",
  props: ["selected"],
  // props: {
  //   selected: String,
  // },
  // methods: {
  //   sendResult() {
  //     this.$emit("entered", true);
  //   },
  // },
};
</script>
<style lang="scss">
@use "@/assets/scss/base/colors";

.send {
  width: 100%;
  height: 36px;
  border-radius: 4px;
  border: none;
  margin-top: 35px;
}
.selected {
  background-color: colors.$primary-color;
  color: white;
}
</style>
