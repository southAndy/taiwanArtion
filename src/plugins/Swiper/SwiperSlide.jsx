import React, { useRef, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

// import required modules
import { EffectCards } from 'swiper/modules'

import { sampleExhibition } from '../../assets/images'

export default function App() {
   return (
      <>
         <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className='flex h-[300px] w-[250px] p-5'
         >
            <SwiperSlide className='flex items-center justify-center text-lg bg-red-50'>
               <div className='flex flex-col items-center'>
                  <div className='w-[270px] h-[170px]'>
                     <img src={sampleExhibition} alt='' />
                  </div>
                  <h3>未來身體——超自然雕像</h3>
                  <p>2021.10.1-2022.1.2</p>
               </div>
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-green-50'>
               Slide 2
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-blue-50'>
               Slide 3
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-yellow-100'>
               Slide 4
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-gray-500'>
               Slide 5
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-yellow-600'>
               Slide 6
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-blue-600'>
               Slide 7
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-green-600'>
               Slide 8
            </SwiperSlide>
            <SwiperSlide className='flex items-center justify-center text-lg bg-red-100'>
               Slide 9
            </SwiperSlide>
         </Swiper>
      </>
   )
}
