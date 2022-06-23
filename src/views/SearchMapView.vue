<script>
import L from "leaflet";

import Map_Navbar from "@/components/Navbar/MapNavbar.vue";

export default {
  name: "searchMapView",
  components: {
    Map_Navbar,
  },
  mounted() {
    //設定中心點座標
    var map = L.map("map", {
      center: [22.99975613908633, 120.21350714331682],
      zoom: 15,
    });
    //設定引用圖層來源:openstreet
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    //釘選當前的座標位置 1.圖釘
    let marker = L.marker([22.99975613908633, 120.21350714331682]).addTo(map);
    let showMarker = marker.bindPopup("test poup").openPopup();

    //2.circle
    let circle = L.circle([22.99975613908633, 120.21350714331682], {
      //border
      color: "green",
      //background
      fillColor: "#3333",
      fillOpacity: 0.5,
      radius: 50,
    }).addTo(map);
    function getPlaceLatLng(e) {
      //取得lat,lng(經緯)
      console.log("clicked", e.latlng, e.latlng.lat, e.latlng.lng);

      alert("this place latlng is:", e.latlng);
    }
    map.on("click", showLatLng);
    // var popup = L.popup({ keepInView: true });
    var popup = L.popup();

    console.log(typeof popup);

    function showLatLng(e) {
      popup
        .setLatLng(e.latlng)
        .setContent(
          `<p>Hello world!<br />This is a nice popup:<br>${e.latlng.toString()}</p>`
        )
        .openOn(map);
    }
    //幫特定位置加上內容
    //1.圖釘
    // marker.bindPopup("<b>Hello world!</b><br>現在所在位置").openPopup();
    //2.圓圈
    // circle.bindPopup("I am a circle.");
    // map.on("click", this.clickPlace);

    // let popup = L.popup()
    //   .setLatLng([22.99975613908633, 120.21350714331682])
    //   .setContent("I am a standalone popup.")
    //   .openOn(map);
  },
  methods: {
    clickPlace() {
      // marker.setLatLng(e.latlng);
      console.log("clicked");
    },
  },
};
</script>
<template>
  <Map_Navbar />
  <div id="map"></div>
</template>
<style lang="scss" scoped>
#map {
  height: 80vh;
  width: 100vw;
}
</style>
