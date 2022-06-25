<template>
  <nav class="home_menu">
    <OffCanvasVue />
    <li>
      <router-link to="/search">
        <img src="@/assets/images/icon.png" alt="搜尋" />
      </router-link>
    </li>
  </nav>
  <router-view />
</template>
<script>
import OffCanvasVue from "../OffCanvas.vue";
export default {
  components: { OffCanvasVue },
  name: "RouterNavbar",
};
</script>
<style lang="scss" scoped>
.home_menu {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}
</style>
