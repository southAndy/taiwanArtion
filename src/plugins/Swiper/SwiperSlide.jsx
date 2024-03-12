import React, { useRef, useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

// import required modules
import { EffectCards } from 'swiper/modules'

import { sampleExhibition } from '../../assets/images'
import { Link } from 'react-router-dom'
import { Skeleton } from '@mui/material'

export default function SwiperBanner({ data }) {
   //當data為空時，顯示Skeleton
   const [isLoading, setIsLoading] = useState(true)
   useEffect(() => {
      console.log('data:', data)
      if (data.length > 0) {
         setIsLoading(() => false)
      } else {
         setIsLoading(() => true)
      }
   }, [data])
   return (
      <>
         {isLoading ? (
            <Skeleton height={'300px'} />
         ) : (
            <Swiper
               effect={'cards'}
               grabCursor={true}
               modules={[EffectCards]}
               className='flex h-[300px] p-5'
            >
               {data.map((item, index) => {
                  return (
                     <SwiperSlide
                        key={item.UID ?? index}
                        className='flex items-center justify-center text-lg bg-red-50'
                     >
                        <Link
                           key={item.UID ?? index}
                           to={`/detail/${item.UID}`}
                           className='flex flex-col items-center'
                        >
                           <div className='w-[270px] h-[170px]'>
                              <img src={item.imageUrl} alt={item.title} />
                           </div>
                           <h3 className='text-[14px] text-center p-2 '>
                              {item.title ?? <Skeleton />}
                           </h3>
                        </Link>
                     </SwiperSlide>
                  )
               })}
            </Swiper>
         )}
      </>
   )
}
