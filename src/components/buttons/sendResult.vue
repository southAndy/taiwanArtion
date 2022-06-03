<template>
  <button @click="sendResult" class="send">確定</button>
</template>
<script>
export default {
  name: "SendResult",
  props: {
    selected: String,
  },
  methods: {
    sendResult() {
      this.$router.push({
        name: "ResultView",
        query: { selected: this.selected },
      });
    },
  },
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
