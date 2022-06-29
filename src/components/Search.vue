<template>
  <section class="search_filter_container">
    <OffCanvasVue />
    <div class="search_filter">
      <input
        class="search_filter_input"
        type="text"
        placeholder="        Search"
        v-model="userInput.keyword"
        @change="detectClick"
        @keyup.enter="sendResult"
      />
      <div class="search_filter_input-icon">
        <img
          v-if="showInputIcon"
          src="@/assets/images/Vector拷貝3.png"
          alt=""
        />
      </div>
    </div>
    <section @click="isExhibitionStart" class="search_filter_select">
      {{ userInput.select || "是否開展" }}
      <div class="search_filter_select-icon">
        <img
          src="@/assets/images/icon拷貝.png"
          alt="裝飾箭頭"
          v-if="showIcon"
        />
      </div>
      <ol class="search_filter_select-menu" v-if="dropMenu">
        <li
          v-for="(option, index) in options"
          :key="index"
          @click="switchContent(option.text)"
        >
          {{ option.text }}
        </li>
      </ol>
    </section>
  </section>
</template>
<script>
import OffCanvasVue from "./OffCanvas.vue";
export default {
  components: { OffCanvasVue },
  name: "SearchButton",
  data() {
    return {
      userInput: {
        keyword: "",
        select: "",
      },
      dropMenu: false,
      options: [{ text: "不限" }, { text: "已開展" }, { text: "尚未開展" }],
      showInputIcon: true,
      selected: "",
      showIcon: true,
      searchList: [],
    };
  },
  computed: {
    detectInputState() {},
  },
  methods: {
    detectClick() {
      this.showInputIcon = !this.showInputIcon;
      this.$emit("isClicked", true);
    },
    isExhibitionStart() {
      this.dropMenu = !this.dropMenu;
    },
    switchContent(content) {
      this.userInput.select = content;
      this.showIcon = false;
    },
    sendResult() {
      this.$store.dispatch("getAPI");
      this.$store.commit("withKeyWord", this.userInput);
      this.$router.push({
        name: "ResultView",
        query: {
          keyword: this.userInput.keyword,
          select: this.userInput.select,
        },
      });
      //
      // this.searchList.push(this.userInput);
      //寫成json
      // let store = json.parse(this.searchList)
      // let store = JSON.parse(this.searchList);
      // console.log(store);
      // localStorage.setItem("useSearch", store);
    },
  },
};
</script>
<style lang="scss" scoped>
.search_filter_container {
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}
.search_filter {
  flex-basis: 60%;
  position: relative;

  &_input {
    color: #b4b4b4;
    background: #f5f5f5;
    border: 1px solid #cdcdcd;
    border-radius: 8px;
    padding: 5px;
    width: 100%;

    &-icon {
      position: absolute;
      top: 4px;
      left: 5%;
    }
  }
  &_select {
    display: flex;
    justify-content: center;

    color: #b4b4b4;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    border-radius: 10px;
    padding: 5px;
    width: 120px;
    cursor: pointer;
    position: relative;

    margin-left: 10px;
    &:active {
      border: 1px solid blue;
    }

    &-icon {
      transform: rotate(270deg);
    }
    &-menu {
      position: absolute;
      top: 105%;
      left: 0%;
      padding: 0;
      z-index: 1;

      li {
        width: 115.9px;
        color: #b4b4b4;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        // border-radius: 8px;
        padding: 5px;
        cursor: pointer;
        &:nth-child(2) {
          border-top: none;
          border-bottom: none;
        }
        &:hover {
          background: #fff5ed;
          color: #be875c;
        }
      }
    }
  }
}
</style>
