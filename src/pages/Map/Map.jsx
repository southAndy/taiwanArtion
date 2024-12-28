import React, { useEffect, useState } from 'react'
import Header from '../../container/Header/Header'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

const containerStyle = {
   width: '100%',
   height: '100vh',
   marginTop: '-56px', //抵銷Header高度
}

const MapPage = () => {
   // 取得使用者位置
   const [userLocation, setUserLocation] = useState(null)
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
   return (
      <>
         <Header />
         <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={userLocation} zoom={15}>
               <Marker position={userLocation} />
            </GoogleMap>
         </LoadScript>
      </>
   )
}

export default MapPage
