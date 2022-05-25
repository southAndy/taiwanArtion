<template>
  <section class="search_filter_container">
    <div class="search_filter">
      <input
        class="search_filter_input"
        type="text"
        placeholder="        Search"
      />
      <div class="search_filter_input-icon">
        <img src="@/assets/images/Vector拷貝3.png" alt="" />
      </div>
    </div>
    <section @click="isExhibitionStart" class="search_filter_select">
      是否已開展
      <div class="search_filter_select-icon">
        <img src="@/assets/images/icon拷貝.png" alt="" />
      </div>
    </section>
    <ol class="search_filter_select-menu" v-if="dropMenu">
      <li v-for="(option, index) in options" :key="index">
        {{ option.text }}
      </li>
    </ol>
  </section>
</template>
<script>
export default {
  name: "SearchButton",
  props: [],
  data() {
    return {
      dropMenu: false,
      options: [{ text: "不限" }, { text: "已開展" }, { text: "尚未開展" }],
    };
  },
  methods: {
    isExhibitionStart() {
      this.dropMenu = !this.dropMenu;
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
    color: #b4b4b4;
    background: #ffffff;
    border: 1px solid #cdcdcd;
    border-radius: 8px 8px 0 0;
    padding: 5px;
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
      top: 8%;
      left: 59%;
      padding: 0;

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
