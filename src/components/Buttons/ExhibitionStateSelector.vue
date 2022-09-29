<template>
  <section class="picker-container">
    <div class="picker" @click="openDrop">{{ defaultContent }}</div>
    <div class="picker-list">
      <div
        class="picker-list-item"
        v-show="isDrop"
        v-for="list in stateList"
        :key="list"
        @click="selectExhibitionState(list)"
      >
        {{ list }}
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
let stateList = ref(["不限", "已開展", "未開展"]);
let defaultContent = ref("是否開展");
let isDrop = ref(false);
function openDrop() {
  isDrop.value = !isDrop.value;
}
function selectExhibitionState(selected) {
  defaultContent.value = selected;
  isDrop.value = false;
  //回傳頁面發API
}
</script>
<style lang="scss" scoped>
.picker-container {
  display: flex;
  flex-direction: column;
  width: 110px;
  height: 40px;
  margin: 0 auto;
}
.picker {
  line-height: 40px;
  border: 1px solid #dedede;
  border-radius: 10px;
}
.picker-list {
  width: 100%;
  height: 120px;
  box-shadow: 1px 2px 5px 0px rgb(0 0 0 / 15%);
  border-radius: 10px;
  cursor: pointer;

  &-item:hover {
    background-color: #f5f5f5;
  }
}
</style>
