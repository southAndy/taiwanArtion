<template>
  <div class="master">
    <Selected
      v-for="(unit, index) in masterUnitList"
      :key="index"
      :api="unit"
      @update="updateAPI"
      :class="{ selected: this.selected === unit }"
    >
      {{ unit }}
    </Selected>
  </div>
</template>
<script>
import Selected from "@/components/Buttons/Selected.vue";

export default {
  name: "MasterUnit",
  components: {
    Selected,
  },
  data() {
    return {
      masterUnitList: ["博物館", "民間藝文空間", "美術館", "線上展"],
      selected: null,
    };
  },
  methods: {
    updateAPI(selected) {
      this.selected = selected;
      this.$store.commit("storeUnit", this.selected);
    },
    // todo common methods
    sendResult() {
      console.log("sendResult");
      this.$store.commit("filterSpecificMasterUnit", this.selected);
      this.$router.push({
        name: "ResultView",
        query: { selected: this.selected },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/colors";
.master {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
.selected {
  background-color: colors.$primary-color;
  color: white;
}
</style>
