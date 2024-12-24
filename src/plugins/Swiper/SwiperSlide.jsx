import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { EffectCards } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { defaultBannerTablet, calendarIcon, locationIcon } from '../../assets/images'
import Flex from '../../styles/utils/FlexCenter'
import { breakpoint } from '../../styles/utils/breakpoint'

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
            <StyledSwiper
               grabCursor={true}
               centeredSlides={true}
               slidesPerView={1}
               initialSlide={1}
               loop={true}
               navigation={true}
               pagination={true}
               breakpoints={{
                  320: {
                     slidesPerView: 1,
                  },
                  768: {
                     slidesPerView: 1.5,
                  },
                  1024: {
                     slidesPerView: 1.5,
                  },
                  1440: {
                     slidesPerView: 3,
                     spaceBetween: 30,
                  },
               }}
            >
               <StyledContainer>
                  {data.map((item, index) => {
                     return (
                        <StyledSwiperSlide key={item.UID ?? index}>
                           <StyledLink to={`/detail/${item.UID}`}>
                              <StyledBannerImage>
                                 <img src={defaultBannerTablet} alt={item.title} />
                              </StyledBannerImage>
                              <Title>{item.title ?? <Skeleton />}</Title>
                              <div className='info'>
                                 <div className='info-date'>
                                    <StyledIcon>
                                       <img src={calendarIcon} alt='' />
                                    </StyledIcon>
                                    <span>{item?.startDate}</span>
                                 </div>
                                 <div className='info-locate'>
                                    <StyledIcon>
                                       <img src={locationIcon} alt='' />
                                    </StyledIcon>
                                    <span>{item?.showInfo[0].locationName}</span>
                                 </div>
                              </div>
                           </StyledLink>
                        </StyledSwiperSlide>
                     )
                  })}
               </StyledContainer>
            </StyledSwiper>
         )}
      </>
   )
}

const StyledContainer = styled.div`
   ${Flex};
   height: 300px;
   padding: 20px;
   overflow: hidden;

   @media (min-width: ${breakpoint.tablet}px) {
      height: 617px;
   }
`
const StyledSwiper = styled(Swiper)`
   height: 300px;
   position: relative;

   // 當前選中的 slide 效果
   .swiper-slide-active {
      &:hover {
         scale: 1.1;
         transition: all 0.5s;
      }
   }
   .swiper-slide-prev,
   .swiper-slide-next {
      opacity: 0.6;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      height: 470px;
   }
`
const StyledIcon = styled.div`
   width: 16px;
   height: 16px;
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
   align-items: flex-start;
   padding: 24px;
   box-shadow: 0px 1px 8px 2px #0000001a;
   border-radius: 12px;

   .info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;

      &-date {
         display: flex;
      }
      &-locate {
         display: flex;
      }
   }
   @media (min-width: ${breakpoint.tablet}px) {
      width: 458px;
   }
   @media (min-width: 992px) {
      width: 617px;
   }
   @media (min-width: ${breakpoint.desktop}px) {
      width: 617px;
   }
`

const StyledBannerImage = styled.div`
   width: 270px;
   height: 170px;

   @media (min-width: ${breakpoint.tablet}px) {
      width: 400px;
      height: 280px;
   }
   @media (min-width: 992px) {
      width: 569px;
   }
   @media (min-width: ${breakpoint.desktop}px) {
      width: 569px;
      height: 300px;
   }
`

const Title = styled.h3`
   font-size: 14px;
   text-align: center;
   padding: 8px;

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 24px;
      max-width: 448px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
`
