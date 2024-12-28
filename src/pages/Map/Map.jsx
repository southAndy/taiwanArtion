import React, { useEffect, useState, useRef } from 'react'
import Header from '../../container/Header/Header'
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api'
import styled from 'styled-components'

const containerStyle = {
   width: '100%',
   height: '100vh',
   marginTop: '-56px', // 抵销Header高度
}

const libraries = ['places']

const MapPage = () => {
   const [userLocation, setUserLocation] = useState(null)
   const userLocationRef = useRef(null) // 用來監聽userLocation的變化
   const [isMapLoaded, setIsMapLoaded] = useState(false)

   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position) => {
            setUserLocation({
               lat: position.coords.latitude,
               lng: position.coords.longitude,
            })
         })
      }
   }, [])

   // 監聽userLocation的變化
   useEffect(() => {
      userLocationRef.current = userLocation
   }, [userLocation])

   // 搜尋功能要包括（可打博物館名稱 / 打關鍵字「博物館」,「美術館」,「展覽」）
   // 點擊時，會在下方出現此展館目前的展覽

   // 當地圖加載完成時執行的函式
   const handleMapLoad = () => {
      setIsMapLoaded(true)
   }

   return (
      <>
         <Header />
         <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
            libraries={libraries}
         >
            <div style={{ position: 'relative', height: '100vh' }}>
               {isMapLoaded && (
                  <StyledMenBox>
                     <Autocomplete onPlaceChanged={() => console.log('hi')}>
                        <input type='text' placeholder='搜尋展覽（例如：故宮' className='search' />
                     </Autocomplete>
                     <div className='option'>
                        <div className='option-hot'>熱門</div>
                        <div className='option-end'>即將結束</div>
                        <div className='option-free'>免費</div>
                     </div>
                  </StyledMenBox>
               )}
               <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={userLocation}
                  zoom={15}
                  options={{
                     mapTypeControl: false, // 禁用地圖類型控制
                     zoomControl: false, // 禁用縮放控件
                     fullscreenControl: false, // 可選：禁用全屏控件
                     streetViewControl: false, // 可選：禁用街景控件
                  }}
                  onLoad={handleMapLoad}
               ></GoogleMap>
            </div>
         </LoadScript>
      </>
   )
}

export default MapPage

const StyledMenBox = styled.div`
   display: flex;
   gap: 8px;
   padding: 8px 40px;

   position: absolute;
   top: 2px;
   left: 50%;
   transform: translateX(-50%);

   width: 100%;
   background-color: white;
   border-radius: 8px;
   boxshadow: 0 4px 6px rgba(0, 0, 0, 0.1);
   z-index: 1000;

   .option {
      display: flex;
      gap: 8px;

      &-hot {
         border-radius: 12px;
         padding: 8px;
         background-color: #f9f9f9;
         color: #5f5f5f;
         cursor: pointer;

         &:hover {
            background-color: #5f5f5f;
            color: white;
         }
      }
      &-end {
         border-radius: 12px;
         padding: 8px;
         background-color: #f9f9f9;
         color: #5f5f5f;

         cursor: pointer;
         &:hover {
            background-color: #5f5f5f;
            color: white;
         }
      }
      &-free {
         border-radius: 12px;
         padding: 8px;
         background-color: #f9f9f9;
         color: #5f5f5f;
         cursor: pointer;
         &:hover {
            background-color: #5f5f5f;
            color: white;
         }
      }
   }
   .search {
      border-radius: 12px;
      border: 1px solid #5f5f5f;
      padding: 0 8px;
   }
`
