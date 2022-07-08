<template>
  <Map_Navbar />
  <div id="map"></div>
  <section :class="['toggle', { show: showList }]" v-if="getExhibition.length">
    <h4 class="toggle_title" @click="showMenu">
      {{ "顯示列表" }}
    </h4>
    <!-- ?toggle表單 -->
    <div :class="['card']">
      <CardVue
        @click="showItem"
        :class="['card_list', { 'show-item': shwoItem }]"
        v-for="data in getExhibition"
        :key="data.UID"
        :api="data"
      />
    </div>
    <!-- ?定位icon -->
  </section>
  <div class="set" @click="backCenter">
    <img src="@/assets/images/seticon.png" alt="定位" />
  </div>
</template>
<script>
import L from "leaflet";

import Map_Navbar from "@/components/Navbar/MapNavbar.vue";
import CardVue from "@/components/Card.vue";

export default {
  name: "searchMapView",
  components: {
    Map_Navbar,
    CardVue,
  },
  data() {
    return {
      shwoItem: false,
      showList: false,
      defaultLocation: {
        lat: 25.073119414483664,
        lng: 121.52471779799832,
        markers: [],
      },
      openStreetMap: {},
    };
  },
  async mounted() {
    //取得使用者定位
    // this.getCurrentPosition();
    // let map = this.getMap(this.defaultLocation.lat, this.defaultLocation.lng);
    var map = L.map("map").setView(
      [this.defaultLocation.lat, this.defaultLocation.lng],
      15
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    this.openStreetMap = map;
    let marker = L.marker([
      this.defaultLocation.lat,
      this.defaultLocation.lng,
    ]).addTo(map);
    marker.bindPopup("<b>哈囉!</b><br>哩京罵底加!.").openPopup();
  },
  computed: {
    clickedIcon() {
      return L.icon({
        // iconSize: [70, 70],
        // iconUrl: null,
        iconUrl: require("@/assets/images/Vector2.png"),
        iconSize: [70, 70], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });
    },
    normalIcon() {
      return L.icon({
        // iconSize: [70, 70],
        // iconUrl: null,
        iconUrl: require("@/assets/images/icon.png"),
        iconSize: [70, 70], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
      });
    },
    getExhibition() {
      return this.$store.getters.withLatLngAPI;
    },
  },
  methods: {
    showMenu() {
      console.log("testing");
      this.showList = !this.showList;
    },
    mousedown(e) {
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
      let prevY = e.clientY;
      console.log(`現在位置:${prevY}`);

      function mousemove(e) {
        console.log("moving", e.clientY);

        //? where is the mouse now
        const newY = e.clientY;
        let listSize = e.offsetY;
        // const rect = e.target.getBoundingClientRect();
        console.log("now place", prevY, newY, listSize);
        let list = document.querySelector(".toggle");
        let moveDistance = prevY + newY - listSize;
        console.log(114, moveDistance);
        list.style.transform = `translateY(${moveDistance}px)`;
      }
      function mouseup() {
        // remove event listener
        console.log("up");
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      }
    },
    showItem() {
      this.showItem = !this.showItem;
    },
    //取得當前定位
    //todo 解決secure origin
    getCurrentPosition() {
      console.log("getting place");
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };
      function success(pos) {
        var crd = pos.coords;

        console.log("Your current position is:");
        console.log("Latitude : " + crd.latitude);
        console.log("Longitude: " + crd.longitude);
        console.log("More or less " + crd.accuracy + " meters.");
      }
      function error(err) {
        console.warn("ERROR(" + err.code + "): " + err.message);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
    },
    //取得leaflet地圖
    getMap(lat, lng, zoom = 15) {
      //設定中心點座標
      let openStreetMap = L.map("map", {
        center: [lat, lng],
        zoom: zoom,
        //沒有設定,toggle會造成error
        zoomAnimation: false,
        fadeAnimation: true,
        makerZoomAnimation: true,
      });
      //設定引用圖層來源:openstreet
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(openStreetMap);
      this.openStreetMap = openStreetMap;
      return openStreetMap;
    },
    //回去中心
    backCenter() {
      this.openStreetMap
        .setZoom(15)
        .panTo([this.defaultLocation.lat, this.defaultLocation.lng]);
    },
    // update(userInput) {
    //   console.log(userInput);
    //   //將kw存入state
    //   //呼叫篩選
    //   // this.getMap(對應lat, 對應lng);
    //   //渲染card
    // },
    showPlaceInformation(e) {
      console.log(e.target, "clicked");
      //
      // var popup = L.popup();
      // popup
      //   .setLatLng(e.latlng)
      //   .setContent(
      //     `<p>Hello world!<br />This is a nice popup:<br>${e.latlng.toString()}</p>`
      //   )
      //   .openOn(this.openStreetMap);
    },
    //座標顯示內容
    popUp(exhibition) {
      return `
      <div class="exhibitionCard" >
        <h3 class="exhibitionCard_title">${exhibition?.title}</h3>
        <p class="">當前有<b>${6}</b>個展覽</p>
        <a href="##">更多詳情</a>

      </div>
      `;
    },
    openPopup(markers) {
      console.log(markers);
      markers.forEach((marker, index) => {
        if (
          marker._latlng.lat === this.lat &&
          marker._latlng.lng === this.lng
        ) {
          console.log("取到了");
          markers[index].openPopup();
          return;
        }
      });
    },
    markerPosition(api) {
      for (let i = 0; i < api.length; i++) {
        // L.marker([
        //   api[i].showInfo[0].latitude,
        //   api[i].showInfo[0].longitude,
        // ]).addTo(this.openStreetMap);
        let marker = L.marker([
          api[i].showInfo[0].latitude,
          api[i].showInfo[0].longitude,
        ]).addTo(this.openStreetMap);
        marker.bindPopup(this.popUp(api[i])).openPopup();
      }
      //釘選當前的座標位置 1.圖釘
      // let marker = L.marker([lat, lng]).addTo(this.openStreetMap);
      // let showMarker = marker.bindPopup("現在你的所在位置").openPopup();
    },
    setCenter(lat, lng) {
      let center = L.marker([lat, lng], {})
        .on("popupclose", () => console.log("cool"))
        .on("popupopen", () => console.log("open"))
        .addTo(this.openStreetMap);
      center
        .bindPopup("現在位置", {
          closeOnClock: true,
        })
        .openPopup();
    },
    setMarkers(list) {
      //檢測傳入API
      // console.log("got API", list);
      let markers = [];
      //幫選定內容加上marker,class
      list.forEach((api) => {
        let marker = L.marker(
          [api.showInfo[0].latitude, api.showInfo[0].longitude],
          {
            //預設icon
            icon: this.normalIcon,
          }
        ).bindPopup(this.popUp(api), {
          //class
          className: "exhibitionCard",
          closeButton: true,
        });
        //把設定好的marker存入
        markers.push(marker);
      });
      //轉換結果
      // console.log("transfered", markers);
      this.markers = markers;
      for (let i = 0; i < markers.length; i++) {
        markers[i].bindPopup().openPopup();
      }
      //todo error!
      // let markerGroup = L.featureGroup(markers)
      //   .addTo(this.openStreetMap)
      //   .on("popupopen", function (e) {
      //     console.log("who is ", e);
      //     //修改marker
      //     e.layer.setIcon(this.clickedIcon);
      //     console.log("to here?");
      //   })
      //   .on("popupclose", function (e) {
      //     console.log("normal", e);
      //     e.layer.setIcon(this.normalIcon);
      //   });
      // console.log("markerGroup", markerGroup);
      // this.openPopup(markers);
      // return;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/base/leaftlet";
* {
  touch-action: none;
}
#map {
  height: 90vh;
  width: 100vw;
}
.exhibitionCard {
  display: flex;
  background-color: red;

  &_title {
    margin: 0;
  }
}
.toggle {
  display: flex;
  flex-direction: column;
  height: 1000px;
  width: 100vw;
  z-index: 900;
  position: absolute;
  bottom: 0;
  // 預設位置
  transform: translateY(95%);
  background: white;
  border-radius: 20px;

  &:hover {
    // transform: translateY(80%);
    scroll-behavior: smooth;
  }

  &_title {
    font-size: 16px;
    align-self: center;
  }
}
.card {
  overflow: scroll;
  height: 40%;

  &_list {
    margin: 0;
    z-index: 1000;
    &:hover {
      height: 300px;
      flex-shrink: 0;
    }
  }
}
.set {
  position: absolute;
  right: 5%;
  /* top: 12%; */
  bottom: 10%;
  z-index: 800;
}
.show {
  transform: translateY(50%);
}
.show-item {
  height: 300px;
  flex-shrink: 0;
}
</style>
