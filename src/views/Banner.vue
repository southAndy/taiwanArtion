<template>
  <div class="banner">
    <div class="loading_container" v-if="!isAnimated">
      <div class="first"></div>
      <div class="second"></div>
      <div class="third"></div>
      <div class="four"></div>
    </div>
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
    <div
      :class="['logo', { mixcolor: isAnimated }, { runicon: !isAnimated }]"
      @click="toHome"
    >
      <img class="mobile" src="@/assets/images/logo-062.png" alt="logo" />
      <img class="desktop" src="@/assets/images/logo-07-web.png" alt="logo" />
    </div>
  </div>
</template>
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

<style lang="scss" scoped>
@use "@/assets/scss/base/breakpoints";
@use "@/assets/scss/base/loading";
.banner {
  display: flex;
  position: relative;

  //   transform  move imaage
  .animate {
    animation: 150s reverse linear 20;
  }
  .mixcolor {
    mix-blend-mode: screen;
  }
  .runicon {
    animation: iconLoading 1.2s ease-in-out infinite;
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
.loading_container {
  display: flex;
  gap: 10px;
  width: 400px;
  justify-content: center;

  margin: 0 auto;
  //mobile
  position: fixed;
  top: 55%;
  left: 1%;
  z-index: 20;
  div {
    width: 60px;
    height: 10px;
  }
  @include breakpoints.desktop {
    left: 35%;
    top: 65%;
  }
  .first {
    border: 1px solid #3333;
    animation: loading 1.2s ease-in-out infinite;
  }
  .second {
    border: 1px solid #3333;
    animation: loading 1.3s ease-in-out infinite;
  }
  .third {
    border: 1px solid #3333;
    animation: loading 1.4s ease-in-out infinite;
  }
  .four {
    border: 1px solid #3333;
    animation: loading 1.5s ease-in-out infinite;
  }
}
</style>
