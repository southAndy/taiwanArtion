<script>
export default {
  name: "ResultView",
};
</script>
<template>
  <div>
    Result page
    <router-link :to="{ name: 'DetailView' }">Card</router-link>
    <router-view></router-view>
  </div>
</template>
