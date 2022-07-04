<template>
  <button
    @click="sendResult"
    :disabled="!calSelectedLength"
    :class="['send', { selected: calSelectedLength }]"
  >
    確定
  </button>
</template>
<script>
export default {
  name: "SendResult",
  props: ["selected"],
  computed: {
    //偵查使用者點選狀態
    calSelectedLength() {
      return Object.keys(this.$store.state.selectedList).length;
    },
  },
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
