<script>
export default {
  name: "Home_Banner",
  beforeCreate() {
    this.$store.dispatch("getAPI");
    console.log("beforeCreate");
  },
  computed: {
    recievedAPI() {
      console.log("computed");

      return this.$store.getters?.withImageAPI;
    },
    isAnimated() {
      return this.$store.getters?.withImageAPI.length > 0 ? true : false;
    },
  },
  data() {
    return {
      isAnimate: false,
    };
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
    <div :class="['scroll_container', { animate: isAnimated }]">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "@/assets/scss/base/breakpoints";
.banner {
  display: flex;
  position: relative;

  //   transform  move imaage
  .animate {
    animation: 150s reverse linear 20;
  }
  .scroll_container {
    display: flex;
    height: 100vh;
  }
  .scroll {
    display: flex;
    // flex-wrap: wrap;
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
