<script>
import Price from "@/components/Price.vue";
import Introduce from "@/components/Introduce.vue";
import Information from "@/components/Information.vue";

export default {
  name: "detailView",
  components: {
    Price,
    Introduce,
    Information,
  },
  data() {
    return {
      imageList: [
        require("@/assets/images/Rectangle10.png"),
        require("@/assets/images/Rectangle11.png"),
        require("@/assets/images/Rectangle12.png"),
        require("@/assets/images/Rectangle13.png"),
      ],
      currentMenu: "Introduce",
    };
  },
  methods: {
    changePage(page) {
      this.currentMenu = page;
    },
  },
};
</script>
<template>
  <div class="detail">
    <div class="detail_banner">
      <img src="@/assets/images/Frame89拷貝.png" alt="" />
    </div>
    <a
      class="detail_calendar"
      href="https://calendar.google.com/calendar/u/0/r/eventedit?text=5/31+%E9%80%99%E4%B8%80%E6%AC%A1%EF%BC%8C%E6%8F%9B%E8%80%81%E9%97%86%E7%B0%A1%E5%A0%B1%E7%B5%A6%E4%BD%A0%E8%81%BD%EF%BC%81%E2%80%94%E2%80%94+Speed+Interview+Summer+2022&dates=20220531T013000Z/20220531T090000Z&details=https://meetjobs.kktix.cc/events/si2022-summer&location&trp=true&sprop=https://meetjobs.kktix.cc/events/si2022-summer&sprop=name:KKTIX&sf=true"
    >
      <img src="@/assets/images/calendar.png" alt="calendar-icon" />
    </a>
    <div class="detail_header">
      <h2 class="detail_header-title">會動的文藝復興</h2>
      <span class="detail_header-onsale">開賣中</span>
    </div>
    <div class="detail_gallery">
      <div class="detail_gallery-item" v-for="image in imageList" :key="image">
        <img :src="image" alt="image" />
      </div>
    </div>
    <div class="detail_menu">
      <button @click="changePage('Information')">展覽資訊</button>
      <button @click="changePage('Price')">票價</button>
      <button @click="changePage('Introduce')">展覽介紹</button>
    </div>
    <div class="detail_content">
      <component :is="currentMenu" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset";

.detail {
  position: relative;
  &_calendar {
    background: white;
    position: absolute;
    top: 5%;
    right: 13%;
    padding: 1px 4px;
    border-radius: 10px;
  }
  &_header {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding: 0 15px;
    h2 {
      color: #be875c;
    }

    &-onsale {
      background: #7d3e35;
      color: white;
      border-radius: 4px;
      padding: 1px 2px;
      align-self: center;
    }
  }
  &_gallery {
    display: flex;
    padding: 16px;
    &-item {
      margin-right: 10px;
      &:last-child {
        margin: 0;
      }
    }
  }
  &_menu {
    display: flex;
    padding: 16px;
    justify-content: flex-start;
    gap: 24px;

    button {
      border: none;
      background: white;
      font-size: 16px;
      color: #cdcdcd;
    }
  }
  &_content {
    padding: 16px;
  }
}
</style>
