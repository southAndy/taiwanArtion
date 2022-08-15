<template>
  <header >
    <h1 class="logo">
      <router-link v-if="detectScreenSize" to="/home">
        <img src="@/assets/images/Group112.png"/>
      </router-link>
      <OffCanvasVue v-else/>
    </h1>
    <nav class="menu">
      <li class="menu-list" v-if="detectScreenSize">
        <router-link  to="/search">
          早找展覽
        </router-link>
      </li>
      <li class="menu-list" v-if="detectScreenSize">
        <router-link  :to="{name:'SearchMapView'}">
          附近展覽
        </router-link>
      </li>
       <li class="menu-list" v-if="detectScreenSize">
        <router-link  to="/search">
          分享展覽
        </router-link>
      </li>
       <li class="menu-list">
        <router-link  to="/search">
          <img src="@/assets/images/icon.png" alt="搜尋" />
        </router-link>
      </li>
    </nav>
  </header>
  <router-view />
</template>
<script>
import OffCanvasVue from "../OffCanvas.vue";
export default {
  components: { OffCanvasVue },
  name: "RouterNavbar",
  data(){return{
    screenSize:window.innerWidth,
  }},
  computed:{
    detectScreenSize(){
      let tabletScreenSize = 768;
      if(this.screenSize>tabletScreenSize){
        return true
      }else{
        return false
      }
    }
  },
  created(){
  }
};
</script>
<style lang="scss" scoped>
@use "@/assets/scss/base/reset.scss";
@use "@/assets/scss/base/colors.scss";
@use "@/assets/scss/base/breakpoints.scss";

header {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  @include breakpoints.desktop{
    padding:0;
    margin-bottom:40px;
  }

  h1{
    flex-basis: 70%;
    text-align: start;
  }

}
.menu{
  display:flex;
  align-items: center;
  //item's seperate
  gap: 25px;

  a{
    font-size:17px;
    &:hover{
      color:#BE875C;
      font-weight:600; 
      border-bottom:2px solid #BE875C;
    }
  }
}

</style>
