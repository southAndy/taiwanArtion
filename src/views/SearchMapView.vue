<script>
import L from "leaflet";

export default {
  name: "searchMapView",
  methods: {
    search() {},
  },
  mounted() {
    //設定中心點座標
    var map = L.map("map", {
      center: [22.99975613908633, 120.21350714331682],
      zoom: 19,
    });
    //設定引用圖層來源:openstreet
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    //釘選當前的座標位置
    // L.marker([22.99975613908633, 120.21350714331682]).addTo(map);
  },
};
</script>
<template>
  <div id="map"></div>
</template>
