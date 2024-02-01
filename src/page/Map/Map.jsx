import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet'
import axios from 'axios'

import 'leaflet/dist/leaflet.css'
import './map-page.scss'

export default function mapPage() {
   const [list, setList] = useState([])
   useEffect(() => {
      async function fetchData() {
         try {
            let response = await axios.get(
               'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
            )
            // 近一步處理資料，過濾沒有圖片的展覽
            const hasImageData = response.data.filter(
               (data) => data.showInfo[0].longitude && data.showInfo[0].latitude,
            )
            console.log(hasImageData)
            setList(() => hasImageData)
         } catch (error) {
            console.log(error)
         } finally {
         }
      }
      fetchData()
      // 取得使用者的定位
   }, [])
   useEffect(() => {
      navigator.geolocation.getCurrentPosition((position) => {
         console.log(position)
      })
   }, [])
   return (
      <>
         {
            <MapContainer center={[25.0551042, 121.5331341]} zoom={13} scrollWheelZoom={false}>
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
               >
                  {list.map((item, index) => {
                     return (
                        <Marker
                           key={index}
                           position={[item.showInfo[0].latitude, item.showInfo[0].longitude]}
                        >
                           <Popup>
                              <div className='popup'>
                                 <div className='popup-image'>
                                    <img src={item.imageUrl} />
                                 </div>
                                 <div className='popup-text'>
                                    <p>{item.title}</p>
                                    <p>{item.showInfo[0].location}</p>
                                 </div>
                              </div>
                           </Popup>
                        </Marker>
                     )
                  })}
               </TileLayer>
               {/* <Marker position={[51.505, -0.09]}>
               <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
               </Popup>
            </Marker> */}
            </MapContainer>
         }
      </>
   )
}
