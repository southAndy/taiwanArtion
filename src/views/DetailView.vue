<script>
import Price from "@/components/Price.vue";
import Introduce from "@/components/Introduce.vue";
import Information from "@/components/Information.vue";

import addEventToCalendar from "@/service/getCalendar";

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
      addEvent: "",
    };
  },
  computed: {
    withSpecificUIDAPI() {
      return this.$store.getters?.withSpecificUIDAPI;
    },
  },
  methods: {
    changePage(page) {
      this.currentMenu = page;
    },
    addCalendarEvent(selecedAPI) {
      console.log(selecedAPI);
      let eventTitle = selecedAPI.title;
      console.log(eventTitle);

      function transferTime(time) {
        console.log(time);
        let timeStore = "";
        for (let begin = 0; begin < time.length; begin++) {
          if (time[begin] !== "/") {
            console.log(time[begin]);
            timeStore = timeStore + time[begin];
          }
        }
        return timeStore;
      }
      let startDate = transferTime(selecedAPI.startDate);
      let endDate = transferTime(selecedAPI.endDate);

      this.addEvent = addEventToCalendar(
        encodeURI(eventTitle),
        startDate,
        endDate
      );
    },
  },
  created() {
    this.$store.commit("receivedUID", this.$route.query.id);
    this.$store.dispatch("getAPI");
  },
};
</script>
<template>
  <div class="detail">
    <div class="detail_banner" v-if="withSpecificUIDAPI">
      <img
        :src="withSpecificUIDAPI[0]?.imageUrl || this.$store.state.defaultImage"
        alt="展覽海報"
      />
    </div>
    <a
      class="detail_calendar"
      @click="addCalendarEvent(withSpecificUIDAPI[0])"
      :href="addEvent"
    >
      <img src="@/assets/images/calendar.png" alt="calendar-icon" />
    </a>
    <div class="detail_header">
      <!-- todo skeleton -->
      <h2 class="detail_header-title" v-if="withSpecificUIDAPI">
        {{ withSpecificUIDAPI[0]?.title }}
      </h2>
      <!-- todo through price to judment -->
      <span class="detail_header-onsale">開賣中</span>
    </div>
    <!-- todo 有資料可以使用 -->
    <!-- <div class="detail_gallery">
      <div class="detail_gallery-item" v-for="image in imageList" :key="image">
        <img :src="image" alt="image" />
      </div>
    </div> -->
    <div class="detail_menu">
      <button @click="changePage('Information')">展覽資訊</button>
      <button @click="changePage('Price')">票價</button>
      <button @click="changePage('Introduce')">展覽介紹</button>
    </div>
    <div class="detail_content">
      <component :is="currentMenu" :withSpecificUIDAPI="withSpecificUIDAPI" />
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
  &_banner {
    img {
      width: 100%;
    }
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
