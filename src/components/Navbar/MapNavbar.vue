<script>
import OffCanvas from "@/components/OffCanvas.vue";

export default {
  name: "Map_Navbar",
  components: { OffCanvas },
  data() {
    return {
      //切換active
      navbarState: {
        currentNavbar: 0,
        currentSelect: 0,
      },
      isToggle: false,
      NoUserInput: true,
      list: ["尋找展覽", "尋找地點"],
      select: ["縣市", "日期"],
      //input
      userInput: null,
    };
  },
  methods: {
    toggleList() {
      this.isToggle = !this.isToggle;
    },
    detectInput() {
      console.log("d");
      this.NoUserInput = false;
    },
    stopInput() {
      console.log("up");
      this.NoUserInput = true;
      console.log("up1");
    },
  },
};
</script>
<template>
  <section class="navbar_container">
    <nav class="navbar">
      <OffCanvas />
      <li
        @click="navbarState.currentNavbar = index"
        :class="[{ active: navbarState.currentNavbar === index }]"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </li>
    </nav>
    <li :class="['search']" @click="toggleList">
      <img src="@/assets/images/icon.png" alt="放大鏡🔍" />
    </li>
  </section>
  <div :class="['select']" v-show="isToggle">
    <!-- <pre>{{ userInput }}</pre> -->
    <input
      v-model="userInput"
      @click="detectInput"
      @mouseup="stopInput"
      class="animate__slideInDown"
      type="text"
      placeholder="    search"
    />
    <div class="iss" v-show="NoUserInput">
      <img src="@/assets/images/Vector拷貝3.png" alt="放大鏡圖示" />
    </div>
    <div :class="['select_list']">
      <div
        v-for="(item, index) in select"
        :key="item"
        @click="navbarState.currentSelect = index"
        :class="[
          'select_list_item',
          { active: navbarState.currentSelect === index },
        ]"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar_container {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  height: 10vh;
  box-sizing: border-box;
}
.navbar {
  display: flex;
  gap: 20px;
  padding: 0;
  li:hover {
    cursor: pointer;
  }
}
.search {
  cursor: pointer;
  align-self: center;
}
.select {
  padding: 16px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    padding: 5px 10px;

    position: relative;
  }
  .iss {
    position: absolute;
    left: 20px;
    bottom: 86%;
  }
  &_list {
    margin-right: auto;
    margin-top: 8px;
    &_item {
      display: inline-block;
      background: #f5f5f5;
      width: 65px;
      border-radius: 5px;
      padding: 5px;

      cursor: pointer;
      &:last-child {
        margin-left: 8px;
      }
    }
  }
}
.active {
  background: #be875c;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
</style>
