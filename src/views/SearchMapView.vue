<template>
  <Map_Navbar @update="update" />
  <div id="map">
    <section class="toggle">
      <h4 class="toggle_title">
        {{ "顯示列表" }}
      </h4>
      <!-- todo <card/> -->
    </section>
  </div>
</template>
<script>
import L from "leaflet";

import Map_Navbar from "@/components/Navbar/MapNavbar.vue";

export default {
  name: "searchMapView",
  components: {
    Map_Navbar,
  },
  data() {
    return {
      defaultLocation: {
        lat: 25.073119414483664,
        lng: 121.52471779799832,
        markers: [],
      },
      openStreetMap: {},
    };
  },
  beforeCreate() {
    //載入API
    // this.$store.dispatch("getAPI");
  },
  async mounted() {
    this.getMap(this.defaultLocation.lat, this.defaultLocation.lng);
    await this.$store.dispatch("getAPI");
    this.setCenter(this.defaultLocation.lat, this.defaultLocation.lng);
    this.markerPosition(
      this.defaultLocation.lat,
      this.defaultLocation.lng,
      this.$store.getters.withLatLngAPI
    );
    // this.setMarkers(this.$store.getters.withLatLngAPI);
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
  },
  methods: {
    update(userInput) {
      console.log(userInput);
      //將kw存入state
      //呼叫篩選
      // this.getMap(對應lat, 對應lng);
      //渲染card
    },
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
    markerPosition(lat, lng, api) {
      for (let i = 0; i < api.length; i++) {
        let marker = L.marker([
          api[i].showInfo[0].latitude,
          api[i].showInfo[0].longitude,
        ]).addTo(this.openStreetMap);
        let showMarker = marker.bindPopup(this.popUp(api[i])).openPopup();
      }
      //釘選當前的座標位置 1.圖釘
      // let marker = L.marker([lat, lng]).addTo(this.openStreetMap);
      // let showMarker = marker.bindPopup("現在你的所在位置").openPopup();
    },
    setCenter(lat, lng) {
      let center = L.marker([lat, lng]).addTo(this.openStreetMap);
      center.bindPopup("現在位置").openPopup();
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
    //取得leaflet地圖
    getMap(lat, lng, zoom = 15) {
      //設定中心點座標
      this.openStreetMap = L.map("map", {
        center: [lat, lng],
        zoom: zoom,
        zoomControl: true,
      });
      //設定引用圖層來源:openstreet
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20,
      }).addTo(this.openStreetMap);
      console.log(this.openStreetMap);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/base/leaftlet";
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
  position: fixed;
  z-index: 9999;
  bottom: 0;
  //預設位置
  transform: translateY(95%);
  background: white;
  border-radius: 20px;

  &:hover {
    transform: translateY(80%);
    scroll-behavior: smooth;
  }

  &_title {
    font-size: 16px;
    align-self: center;
  }
}
</style>
