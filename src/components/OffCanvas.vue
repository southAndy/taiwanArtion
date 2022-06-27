<template>
  <div
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasWithBothOptions"
    aria-controls="offcanvasWithBothOptions"
    style="align-self: center"
  >
    <img src="@/assets/images/↳Color.png" alt="" />
  </div>
  <div
    class="offcanvas offcanvas-start customize_setting"
    data-bs-scroll="true"
    tabindex="-1"
    id="offcanvasWithBothOptions"
    aria-labelledby="offcanvasWithBothOptionsLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">選單</h5>

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body customize_setting_body">
      <div class="item" v-for="(list, index) in navbarList" :key="index">
        <router-link
          :to="{ name: list.routerName }"
          :class="[{ developing: list.state }]"
          >{{ list.value }}</router-link
        >
        <span v-if="list.state">{{ "(尚未開放)" }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Off-Canvas",
  data() {
    return {
      navbarList: [
        {
          value: "首頁",
          routerName: "HomeView",
          state: false,
          iconPath: "@/assets/images/",
        },
        {
          value: "早找展覽",
          routerName: "SearchView",
          state: false,
          iconPath: "@/assets/images/",
        },
        {
          value: "早找地圖",
          routerName: "SearchMapView",
          state: false,
          iconPath: "@/assets/images/",
        },
        {
          value: "分享展覽",
          routerName: "",
          state: true,
          iconPath: "@/assets/images/",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset";
@use "@/assets/scss/base/colors";
.customize_setting {
  cursor: pointer;
  width: 250px;

  &_body {
    padding: 0;

    .item {
      &:hover {
        background-color: colors.$primary_color;
      }
    }
  }
}

.developing {
  color: gray;
}
</style>
