<template>
  <swiper
    :modules="modules"
    :slides-per-view="3"
    :space-between="50"
    :breakpoints="breakpoints"
    :pagination="{ clickable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-for="data in selectedAPIs"
      :key="data.UID"
      class="swiper_item"
    >
      <router-link
        :to="{ name: 'DetailView', query: { id: data.UID } }"
        class="item_link"
      >
        <div class="swiper_image">
          <img :src="data.imageUrl" alt="展覽圖片" />
        </div>
        <h3 class="title">{{ data.title }}</h3>
        <time>2022/12/20 - 2022/12/25</time>
      </router-link>
    </swiper-slide>
  </swiper>
</template>
<script>
//vue
import { ref, computed, onMounted } from "vue";
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper";

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Import Swiper styles
export default {
  name: "SwiperComponent",
  props: { api: Object },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(props) {
    let breakpoints = ref({
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },

      771: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    });
    let slidePreView = console.log(props.api);
    let apiCollections = ref(props.api);
    console.log(apiCollections);
    let selectedAPIs = computed(() => {
      let temp = apiCollections.value.slice(0, 6);
      console.log(temp);
      return temp;
    });
    console.log(selectedAPIs);
    onMounted(() => {
      let swiperBullets = document.querySelectorAll(
        ".swiper-pagination-bullet"
      );
      //幫每個bullet掛自訂class
      swiperBullets.forEach((tag) => {
        tag.style.width = "30px";
        tag.style.borderRadius = "0px";
      });
      //無法透過自訂class改
      //adding inline style
      // swiperBullet.style.width = "30px";
      // swiperBullet.style.borderRadius = "0px";
    });

    //doc sample
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, A11y],
      selectedAPIs,
      slidePreView,
      breakpoints,
    };
  },
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/colors";
@use "@/assets/scss/base/reset";

//針對套件本身的設定修改
.swiper {
  height: 480px;
  box-sizing: border-box;
  margin: 0;

  &_image {
    // width: 150px;
    flex-basis: 70%;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-slide {
    background-color: colors.$card_bg;
    border-radius: 10px;
  }
}

//v-for item
.swiper_item {
  height: 430px;
  width: 150px;
  &:hover {
    background-color: colors.$primary_color;
  }

  .item_link {
    width: 100%;
    height: 100%;
    padding: 24px;

    object-fit: contain;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: start;
    &:hover {
      color: colors.$card_bg;
    }
  }

  .title {
    font-size: 24px;
    font-weight: 700;
    margin-top: 17px;
    &:hover {
      color: colors.$card_bg;
    }
  }
}
</style>
