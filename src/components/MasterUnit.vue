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
    <Send @click="sendResult" :selected="this.selected" />
  </div>
</template>
<script>
import Selected from "@/components/Buttons/Selected.vue";
import Send from "@/components/Buttons/Send.vue";

export default {
  name: "MasterUnit",
  components: {
    Selected,
    Send,
  },
  data() {
    return {
      masterUnitList: ["文創園區", "美術館", "博物館", "藝文中心"],
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
