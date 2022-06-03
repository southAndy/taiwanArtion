<template>
  <button @click="sendResult" class="send">確定</button>
</template>
<script>
export default {
  name: "SendResult",
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
<style>
.send {
  width: 100%;
  height: 36px;
  border-radius: 4px;
  border: none;
  margin-top: 35px;
}
</style>
