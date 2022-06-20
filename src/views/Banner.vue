<script>
export default {
  name: "Home_Banner",
  async created() {
    await this.$store.dispatch("getAPI");
  },
  computed: {
    recievedAPI() {
      return this.$store.getters.withImageAPI;
    },
  },
  methods: {
    toHome() {
      this.$router.push({ name: "HomeView" });
    },
  },
};
</script>
<template>
  <div class="banner">
    <div class="scroll_container">
      <router-link
        :to="{ name: 'DetailView', params: { id: api.UID } }"
        class="scroll"
        v-for="api in recievedAPI"
        :key="api?.UID"
      >
        <img :src="api.imageUrl" alt="展覽海報" />
      </router-link>
    </div>
    <div class="logo" @click="toHome">
      <img class="mobile" src="@/assets/images/logo-062.png" alt="logo" />
      <img class="desktop" src="@/assets/images/logo-07-web.png" alt="logo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/base/breakpoints";
.banner {
  display: flex;
  position: relative;
  //   transform  move imaage
  .scroll_container {
    display: flex;
    // overflow: scroll;
    height: 100vh;
    animation: 200s reverse linear infinite;
  }
  .scroll {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    margin-right: 10px;
    // todo hover effect
    img {
      height: 100%;
    }
  }

  .logo {
    position: fixed;
    align-self: center;
    font-size: 50px;
    width: 100vw;
    mix-blend-mode: screen;
    background: radial-gradient(black, transparent);

    @include breakpoints.desktop {
      font-size: 70px;
    }
    .mobile {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin-bottom: 50%;
      @include breakpoints.tablet {
        display: none;
      }
    }
    .desktop {
      display: none;
      @include breakpoints.tablet {
        display: block;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
      }
    }
  }

  @keyframes reverse {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
}
</style>
