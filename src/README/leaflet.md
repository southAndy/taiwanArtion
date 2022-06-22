# leaflet

## basic

**install**
1. 透過npm
`npm i leaflet`
ps:記得引入js/css

`<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css"
   integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=="
   crossorigin=""/>`

2. js/css都使用cdn引入

**使用**
`import L from "leaflet";`

創建leaflet地圖實例:
`let map = L.map('DOM-id').setView([經緯參數],縮放比)`

新增圖層:
`L.tileLayer('圖層URL',{})`

新增圖釘
`L.marker()./circle().toAdd()`

## custom icon