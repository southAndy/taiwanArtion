import React, { useEffect, useState, useRef } from 'react'
import Header from '../../container/Header/Header'
import {
   GoogleMap,
   LoadScript,
   Autocomplete,
   OverlayView,
   Marker,
   InfoWindow,
} from '@react-google-maps/api'
import styled from 'styled-components'
import { breakpoint } from '../../styles/utils/breakpoint'
import { timeIcon } from '../../assets/images/map/index'

const containerStyle = {
   width: '100%',
   height: '100vh',
   marginTop: '-56px', // 抵销Header高度
}

const libraries = ['places']

const MapPage = () => {
   const [userLocation, setUserLocation] = useState(null)
   const [places, setPlaces] = useState([]) // 用來存放搜尋到的地點
   const [isOpening, setIsOpening] = useState(true) // 用來判斷是否營業中
   const [selectedPlace, setSelectedPlace] = useState(null) // 用來存放用戶選擇的地點
   const [isMapLoaded, setIsMapLoaded] = useState(false)
   const autocompleteRef = useRef(null) // 用來存放Autocomplete的ref
   const mapRef = useRef(null) // 用來存放GoogleMap的ref

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
      if (mapRef.current && userLocation) {
         // 當 userLocation 值改變時，呼叫 fetchNearbyPlaces 函式
         fetchNearbyPlaces(userLocation)
      }
   }, [userLocation])

   // 搜尋功能要包括（可打博物館名稱 / 打關鍵字「博物館」,「美術館」,「展覽」）
   const fetchNearbyPlaces = (location) => {
      const service = new window.google.maps.places.PlacesService(mapRef.current)
      const request = {
         location: location,
         radius: '5000', // 搜索半徑，單位為米
         type: ['museum', 'art_gallery', 'exhibition_center'], // 搜索類型
      }

      service.nearbySearch(request, (results, status) => {
         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            // 挑出需要的數據
            const markerDatas = results.map((place) => ({
               id: place.place_id,
               icon: {
                  url: place.icon, // 使用地點的圖標
                  scaledSize: new window.google.maps.Size(30, 30), // 調整圖標大小
               },
               lat: place.geometry.location.lat(),
               lng: place.geometry.location.lng(),
               title: place.name,
               address: place.vicinity,
               photo: place.photos?.[0].getUrl(), // 地點的照片
            }))
            setPlaces(markerDatas)
         }
      })
   }

   const handlePlaceChanged = () => {
      if (autocompleteRef.current !== null) {
         const place = autocompleteRef.current.getPlace()
         // 當用戶選擇了一個地點並且該地點包含幾何信息（例如經緯度），就更新userLocation
         if (place.geometry) {
            setUserLocation({
               lat: place.geometry.location.lat(),
               lng: place.geometry.location.lng(),
            })
         }
      }
   }
   const onLoad = (autocomplete) => {
      // 將Autocomplete的ref存到 autocompleteRef.current
      autocompleteRef.current = autocomplete
   }
   // 點擊任意地點時，會在下方出現此地點的詳細資訊

   // 點擊時，會在下方出現此展館目前的展覽

   // 當地圖加載完成時執行的函式
   const handleMapLoad = (map) => {
      // 將GoogleMap的ref存到 mapRef.current
      mapRef.current = map
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
                     <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceChanged}>
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
               >
                  {places.map((place) => (
                     <Marker
                        key={place.id}
                        position={{ lat: place.lat, lng: place.lng }}
                        icon={place.icon}
                        onClick={() => setSelectedPlace(place)}
                     />
                  ))}
                  {selectedPlace && (
                     <InfoWindow
                        position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                        onCloseClick={() => setSelectedPlace(null)}
                     >
                        <StyledPlaceBox>
                           <div className='info'>
                              <div className='banner'>
                                 <img src={selectedPlace.photo} alt='' />
                              </div>
                              <div>
                                 <h2>{selectedPlace.title}</h2>
                                 <div className='time'>
                                    <div className='time-icon'>
                                       <img src={timeIcon} alt='' />
                                    </div>
                                    <p className={isOpening ? 'time-opening' : 'time-close'}>
                                       {isOpening ? '營業中' : '已打烊'}
                                    </p>

                                    <p>{'09:00-18:00'}</p>
                                 </div>
                              </div>
                           </div>
                           <div className='option'>
                              <button>規劃路線</button>
                              <button>場館展覽</button>
                           </div>
                        </StyledPlaceBox>
                     </InfoWindow>
                  )}
               </GoogleMap>
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
const StyledPlaceBox = styled.div`
   display: flex;
   flex-direction: column;
   gap: 16px;

   @media (min-width: ${breakpoint.tablet}) {
      width: 289px;
      height: 117px;
   }

   .info {
      display: flex;
      gap: 16px;

      h2 {
         margin: 0;
      }

      .banner {
         width: 42px;
         height: 42px;

         img {
            width: 100%;
            height: 100%;
            object-fit: cover;
         }
      }

      .time {
         display: flex;
         align-items: center;
         gap: 8px;

         &-icon {
            width: 16px;
            height: 16px;

            img {
               width: 100%;
               height: 100%;
               object-fit: cover;
            }
         }
         &-opening {
            color: #4caf50;
            font-weight: 500;
         }

         &-close {
            color: #f44336;
            font-weight: 500;
         }
      }
   }
   .option {
      display: flex;
      justify-content: center;
      gap: 8px;

      button {
         font-weight: 500;
         border: none;
         padding: 8px;
         border-radius: 8px;
         border: 1px solid transparent;
         background-color: #f9f9f9;
         color: #5f5f5f;
         cursor: pointer;

         &:hover {
            border: 1px solid #be8152;
            color: #be8152;
         }
      }
   }
`
