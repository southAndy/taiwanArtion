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
  <div class="banner animation" @click="toHome">
    <div class="scroll_container">
      <div class="scroll" v-for="iamge in recievedAPI" :key="iamge?.UID">
        <img :src="iamge.imageUrl" alt="" />
      </div>
    </div>
    <div class="circle">TaiwanArtion</div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  display: flex;
  position: absolute;
  background-color: antiquewhite;
  position: relative;
  //   transform  move imaage
  .scroll_container {
    display: flex;
    overflow: scroll;
  }
  .scroll {
    display: flex;
    flex-wrap: wrap;
    height: 390px;
    width: 100%;
    animation: scroll 1s 1s 3 alternate ease-in;

    img {
      height: 100%;
      witdth: 100%;
    }
  }

  .circle {
    position: fixed;
    align-self: center;
    font-size: 50px;
    height: 10vh;
    width: 100vw;
    mix-blend-mode: screen;
    background-color: white;
  }
  @keyframes scroll {
    0% {
      transform: translateX(-50%);
    }
    50% {
      transform: translateX(-100%);
    }
    75% {
      transform: translateX(-150%);
    }
  }
}
</style>
