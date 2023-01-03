<template>
  <nav class="menu">
    <li class="menu-list" v-if="detectScreenSize">
      <router-link to="/search"> 早找展覽 </router-link>
    </li>
    <li class="menu-list" v-if="detectScreenSize">
      <router-link :to="{ name: 'SearchMapView' }"> 附近展覽 </router-link>
    </li>
    <li class="menu-list" v-if="detectScreenSize">
      <router-link to="/search"> 分享展覽 </router-link>
    </li>
    <li class="menu-list" v-else>
      <router-link to="/search">
        <img src="@/assets/images/icon.png" alt="搜尋" />
      </router-link>
    </li>
  </nav>
</template>
<script setup>
import { ref } from "vue";
let detectScreenSize = ref(true);
</script>
<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  //item's seperate
  gap: 25px;

  a {
    font-size: 17px;
    &:hover {
      color: #be875c;
      font-weight: 600;
      border-bottom: 2px solid #be875c;
    }
  }
}
</style>
