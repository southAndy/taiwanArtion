<template>
  <div class="introduction" v-if="withSpecificUIDAPI">
    <!-- todo 排版優化 -->
    <p>
      {{ withSpecificUIDAPI[0]?.descriptionFilterHtml }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["withSpecificUIDAPI"],
  name: "introduction",
  data() {
    return {};
  },
};
</script>
