<template>
  <!-- todo 1. random event -->
  <div class="carousel_box" v-if="api">
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators me-6">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active bg-secondary"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          class="bg-secondary"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          class="bg-secondary"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner container p-0 carousel_layout" v-if="api">
        <router-link :to="{}" class="carousel-item w-100 h-100 active">
          <img
            :src="api[1]?.imageUrl"
            class="d-block w-100"
            alt=""
            v-if="api"
          />
          <p class="title">
            <!-- {{ api[`${Math.floor(Math.random() * 50)}`]?.title }} -->
            {{ api[1]?.title }}
          </p>
          <p>{{ api[1]?.startDate }} - {{ api[1]?.endDate }}</p>
        </router-link>
        <router-link :to="{}" class="carousel-item h-100 w-100">
          <img
            :src="api[2]?.imageUrl"
            class="d-block w-100"
            alt=""
            v-if="api"
          />
          <p class="title">
            <!-- {{ api[`${Math.floor(Math.random() * 50)}`]?.title }} -->
            {{ api[2]?.title }}
          </p>
          <p>{{ api[2]?.startDate }} - {{ api[2]?.endDate }}</p>
        </router-link>
        <router-link :to="{}" class="carousel-item h-100">
          <img
            :src="api[3]?.imageUrl"
            class="d-block w-100 h-100"
            alt=""
            v-if="api"
          />
          <p class="title">
            <!-- {{ api[`${Math.floor(Math.random() * 50)}`]?.title }} -->
            {{ api[3]?.title }}
          </p>
          <p>{{ api[3]?.startDate }} - {{ api[3]?.endDate }}</p>
        </router-link>
      </div>
      <button
        class="carousel-control-prev mx-5"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <!-- <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span> -->
      </button>
      <button
        class="carousel-control-next me-5"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <!-- <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span> -->
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["api"],
  name: "Bs_Carousel",
  data() {
    return {
      homeAPI: this.api,
    };
  },
  computed: {
    // radomSelectAPI() {
    // },
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset";
.carousel_box {
  display: flex;
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 10px;
  // height: 258px;

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    padding: 19px 0 3px 0;
  }
}
.carousel-indicators {
  bottom: -60px;
  justify-content: center;

  button {
    text-align: center;
    marign: 0 auto;
    color: aquamarine;
    &:active {
      background-color: aqua;
    }
  }
}
</style>
