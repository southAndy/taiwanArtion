import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Link } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
import {
  defaultBannerTablet,
  calendarIcon,
  locationIcon,
  rightArrow,
  leftArrow,
} from '../../assets/images'
import Flex from '../../styles/utils/FlexCenter'
import { breakpoint } from '../../styles/utils/breakpoint'

export default function SwiperBanner({ data }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
  }, [data])

  return (
    <>
      {isLoading ? (
        <Skeleton height={'300px'} />
      ) : (
        <StyledSwiper
          modules={[Pagination, Navigation]}
          centeredSlides={true}
          slidesPerView={1}
          initialSlide={1}
          loop={true} // 啟用循環滑動
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.5,
            },
            992: {
              slidesPerView: 2,
            },
            1440: {
              slidesPerView: 3.5,
            },
            1920: {
              slidesPerView: 3.5,
            },
          }}
        >
          <StyledContainer>
            {data.map(item => (
              <StyledSwiperSlide key={item.UID}>
                <StyledLink to={`/detail/${item.UID}`}>
                  <StyledBannerImage>
                    <img
                      src={item.imageUrl ? item.imageUrl : defaultBannerTablet}
                      alt={item.title}
                    />
                  </StyledBannerImage>
                  <h3 className="title">{item.title ?? <Skeleton />}</h3>
                  <div className="info">
                    <div className="info-date">
                      <StyledIcon>
                        <img src={calendarIcon} alt="" />
                      </StyledIcon>
                      <span>{item?.startDate}</span>
                    </div>
                    <div className="info-locate">
                      <StyledIcon>
                        <img src={locationIcon} alt="" />
                      </StyledIcon>
                      <span>{item?.showInfo[0].locationName}</span>
                    </div>
                  </div>
                </StyledLink>
              </StyledSwiperSlide>
            ))}
          </StyledContainer>
          <PreviousButton className="swiper-button-prev">
            <img src={leftArrow} alt="" />
          </PreviousButton>
          <NextButton className="swiper-button-next">
            <img src={rightArrow} alt="" />
          </NextButton>
        </StyledSwiper>
      )}
    </>
  )
}

const PreviousButton = styled.div.attrs({
  className: 'swiper-button-prev',
})`
  position: absolute;
  left: 5%;
  top: 50%;
  width: 24px;
  height: 24px;
  z-index: 200;
  cursor: pointer;

  @media (min-width: ${breakpoint.tablet}px) {
    height: 35px;
    width: 35px;
  }
  @media (min-width: ${breakpoint.desktop}px) {
    left: 30%;
    height: 40px;
    width: 40px;
  }
`
const NextButton = styled.div`
  position: absolute;
  right: 5%;
  top: 50%;
  width: 24px;
  height: 24px;
  z-index: 200;
  cursor: pointer;

  @media (min-width: ${breakpoint.tablet}px) {
    height: 35px;
    width: 35px;
  }
  @media (min-width: ${breakpoint.desktop}px) {
    right: 30%;
    height: 40px;
    width: 40px;
  }
`

const StyledContainer = styled.div`
  ${Flex};
  padding: 20px;
  overflow: hidden;

  @media (min-width: ${breakpoint.tablet}px) {
    height: 617px;
  }
`
const StyledSwiper = styled(Swiper)`
  position: relative;
  padding: 16px;
  height: auto;

  .swiper-slide-prev,
  .swiper-slide-next {
    opacity: 0.6;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    height: 470px;

    .swiper-slide-active {
      &:hover {
        scale: 1.1;
        transition: all 0.5s;
      }
    }
  }
`
const StyledIcon = styled.div`
  width: 16px;
  height: 16px;
`

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      font-family: Noto Sans TC;
      font-size: 14px;
      font-weight: 400;
      line-height: 18.2px;
      text-align: left;
      text-underline-position: from-font;
      text-decoration-skip-ink: none;
    }
    &-locate {
      display: none;
    }
  }
  .title {
    font-size: 16px;
    text-align: center;
    padding: 8px;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 267px;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    align-items: flex-start;

    .title {
      font-size: 24px;
      max-width: 448px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media (min-width: 992px) {
  }
  @media (min-width: ${breakpoint.desktop}px) {
  }
`

const StyledBannerImage = styled.div`
  height: 170px;
  width: 100%;
  border-radius: 8px;

  img {
    border-radius: 8px;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    height: 280px;
  }
  @media (min-width: ${breakpoint.desktop}px) {
    height: 300px;
    min-width: 475px;
  }
`
