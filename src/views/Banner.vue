<script>
export default {
  name: "Home_Banner",
  created() {
    this.$store.dispatch("getAPI");
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
    <div class="text">TaiwanArtion</div>
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

  .text {
    position: fixed;
    align-self: center;
    font-size: 50px;
    width: 100vw;
    mix-blend-mode: screen;
    background-color: white;

    @include breakpoints.desktop {
      font-size: 70px;
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
