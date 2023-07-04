import { Navigation, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// customer css
import './Swipers.scss'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

type Props = {
   isLoading: boolean
   data: object
}

export default ({ isLoading, data }) => {
   return (
      <Swiper
         className='swipers'
         modules={[Navigation, A11y]}
         spaceBetween={50}
         slidesPerView={3}
         navigation={!isLoading}
         loop={true}
      >
         {data.map((list: { id: string; imageUrl: string }, index: number) => {
            return (
               <SwiperSlide key={index} className='slide'>
                  <Link
                     className={isLoading ? 'skeleton' : 'slide-image'}
                     to={`/detail/${list?.id}`}
                  >
                     <img
                        src={list.imageUrl || ''}
                        className={isLoading ? 'hide' : 'slide-image'}
                     />
                  </Link>
               </SwiperSlide>
            )
         })}
      </Swiper>
   )
}
