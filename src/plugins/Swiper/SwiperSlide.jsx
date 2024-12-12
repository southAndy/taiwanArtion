import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { EffectCards } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
import Flex from '../../styles/utils/FlexCenter'

const StyledContainer = styled.div`
   ${Flex};
   height: 300px;
   padding: 20px;
   overflow: hidden;
`

const StyledSwiperSlide = styled(SwiperSlide)`
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 1.125rem;
`

const StyledLink = styled(Link)`
   display: flex;
   flex-direction: column;
   align-items: center;
`

const Title = styled.h3`
   font-size: 14px;
   text-align: center;
   padding: 8px;
`

export default function SwiperBanner({ data }) {
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
            <Swiper grabCursor={true} slidesPerView={3} spaceBetween={20}>
               <StyledContainer>
                  {data.map((item, index) => {
                     return (
                        <StyledSwiperSlide key={item.UID ?? index}>
                           <StyledLink to={`/detail/${item.UID}`}>
                              <BaseImageBox width={'270px'} height={'170px'}>
                                 <img src={item.imageUrl} alt={item.title} />
                              </BaseImageBox>
                              <Title>{item.title ?? <Skeleton />}</Title>
                           </StyledLink>
                        </StyledSwiperSlide>
                     )
                  })}
               </StyledContainer>
            </Swiper>
         )}
      </>
   )
}
