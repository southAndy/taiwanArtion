<template>
  <nav class="home_menu">
    <li>
      <img src="@/assets/images/↳Color.png" alt="點擊選單" />
    </li>
    <li>
      <router-link to="/search">
        <img src="@/assets/images/icon.png" alt="搜尋" />
      </router-link>
    </li>
  </nav>
  <router-view />
</template>

<style lang="scss">
@use "@/assets/scss/base/reset.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.home_menu {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}
</style>
