<template>
  <nav class="home_navbar">
    <div class="home_navbar_menu">
      <div>
        <img src="@/assets/images/Vector2.png" alt="" />
      </div>
      <router-link to="/shared">早找展覽</router-link>
    </div>
    <div class="home_navbar_menu">
      <div>
        <img src="@/assets/images/Vector.png" alt="" />
      </div>
      <router-link to="/shared">附近展覽</router-link>
    </div>
    <div class="home_navbar_menu">
      <div>
        <img src="@/assets/images/Vector拷貝.png" alt="" />
      </div>
      <router-link to="/shared">分享展覽</router-link>
    </div>
    <router-view />
  </nav>
</template>
<script>
export default {
  name: "HomeNavbar",
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset.scss";

.home_navbar {
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  bottom: 30%;
  right: 0;

  border-top: 1px solid rgb(202, 192, 192);
  &_menu {
    display: flex;
    flex-direction: column;
    margin-right: 40px;
    padding: 5px 10px;
    margin: 0 auto;

    a {
      color: gray;
      font-size: 13px;
    }
  }
}
</style>
