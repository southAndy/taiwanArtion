<template>
  <section class="search_filter_container">
    <div class="search_filter">
      <input
        class="search_filter_input"
        type="text"
        placeholder="        Search"
        v-model="userInput"
        @click="detectClick"
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
      {{ selected || "是否已開展" }}
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
export default {
  name: "SearchButton",
  props: [],
  data() {
    return {
      userInput: "",
      dropMenu: false,
      options: [{ text: "不限" }, { text: "已開展" }, { text: "尚未開展" }],
      showInputIcon: true,
      selected: "",
      showIcon: true,
      searchList: [],
    };
  },
  methods: {
    detectClick() {
      console.log("clicked");
      this.showInputIcon = !this.showInputIcon;
      this.$emit("isClicked", true);
    },
    isExhibitionStart() {
      this.dropMenu = !this.dropMenu;
    },
    switchContent(content) {
      this.selected = content;
      this.showIcon = false;
    },
    sendResult() {
      console.log("search:", this.userInput);
      this.searchList.push(this.userInput);
      let store = JSON.parse(this.searchList);
      console.log(store);

      localStorage.setItem("useSearch", store);
    },
  },
};
</script>
<style lang="scss" scoped>
.search_filter_container {
  display: flex;
  justify-content: center;
}
.search_filter {
  position: relative;
  &_input {
    color: #b4b4b4;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    border-radius: 8px;
    padding: 5px;

    &-icon {
      position: absolute;
      top: 4px;
      left: 10%;
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
