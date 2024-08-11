import React, { useRef, useState, useEffect } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

// import required modules
import { Pagination,Navigation } from 'swiper/modules'

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
               slidesPerView={'auto'}
               centeredSlides={true}
               spaceBetween={16}
               navigation={true}
               pagination={true}
               modules={[Pagination,Navigation]}
               className='flex h-[300px] p-5 mb-6 mt-8 tablet:h-auto'
            >
               {data.map((item, index) => {
                  return (
                     <SwiperSlide
                        key={item.UID ?? index}
                        className='flex items-center justify-center text-lg p-4  bg-white w-[300px] rounded-xl shadow-banner tablet:w-[617px] tablet:h-[402px]'
                     >
                        <Link
                           key={item.UID ?? index}
                           to={`/detail/${item.UID}`}
                           className='flex flex-col items-center'
                        >
                           <div className='w-[270px] h-[170px] mb-4 tablet:w-[569px] tablet:h-[280px]'>
                              <img className='rounded-xl w-[100%] h-[100%] object-cover' src={item.imageUrl} alt={item.title} />
                           </div>
                           <h3 className='text-sm font-medium text-[#535353] m-0 mt-2 mb-1 w-[267px] h-[23px] text-ellipsis overflow-hidden tablet:text-[24px] tablet:leading-[34px] tablet:h-[35px] tablet:w-[100%] tablet:mb-2'>
                              {item.title ?? <Skeleton />}
                           </h3>
                           <p className='text-xs text-[#535353] text-start w-[100%]'>2023.03.21 - 04.20</p>
                        </Link>
                     </SwiperSlide>
                  )
               })}
            </Swiper>
         )}
      </>
   )
}
