<template>
  <div class="master">
    <Selected
      v-for="(value, index) in masterUnitList"
      :key="index"
      :api="value"
      @update="updateAPI"
    >
      {{ value }}
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
.master {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
}
</style>
