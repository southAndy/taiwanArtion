<template>
  <nav class="home_menu">
    <li>
      <img src="@/assets/images/↳Color.png" alt="點擊選單" />
    </li>
    <div class="menu_desktop">
      <li>
        <router-link to="/search-map">附近展覽</router-link>
      </li>
      <li>
        <router-link to="/search-map">分享展覽</router-link>
      </li>
    </div>
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
@use "@/assets/scss/base/breakpoints";

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
  @include breakpoints.desktop {
    justify-content: flex-end;
    gap: 15px;
  }
  .menu_desktop {
    @include breakpoints.desktop {
      display: flex;
    }
  }
  a {
    color: black;
  }
}
</style>
