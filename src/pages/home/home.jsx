import { useEffect, useState, useMemo } from 'react'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import FlexCenter from '../../styles/utils/FlexCenter'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { PositionElement } from '../../styles/base/PositionElement'
import SwiperBanner from '../../plugins/Swiper/SwiperSlide'
import Header from '../../container/Header/Header'
import fakeMonthList from '../../assets/data/month.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/commonSlice'
import { breakpoint } from '../../styles/utils/breakpoint'
import {
   hotestNumber,
   hotestNumber2,
   hotestNumber3,
   hotestNumber4,
} from '../../assets/images/index.js'

import {
   categoryicon1,
   categoryicon2,
   categoryicon3,
   categoryicon4,
   categoryicon5,
   categoryicon6,
   categoryicon7,
   categoryicon8,
   hotBg,
   locationIcon,
   loveIcon,
   sampleBg,
} from '../../assets/images/index'

const categoryList = [
   { imageUrl: categoryicon1, title: '美術' },
   { imageUrl: categoryicon2, title: '攝影' },
   { imageUrl: categoryicon3, title: '音樂' },
   { imageUrl: categoryicon4, title: '戲劇' },
   { imageUrl: categoryicon5, title: '舞蹈' },
   { imageUrl: categoryicon6, title: '綜藝' },
   { imageUrl: categoryicon7, title: '親子' },
   { imageUrl: categoryicon8, title: '展覽' },
]

const HomePage = () => {
   const monthList = fakeMonthList
   const [currentMonth, setMonth] = useState(new Date().getMonth() + 1)
   const { openData } = useSelector((state) => state.common)
   const dispatch = useDispatch()

   // 初次載入去抓資料
   useEffect(() => {
      dispatch(fetchData())
   }, [])

   // 當月份改變時篩選資料
   const filterData = useMemo(() => {
      console.log('切換當前月份', currentMonth)
      const currentMonthData = openData.filter((data) => {
         const startDate = dayjs(data.startDate).month() + 1
         return startDate === currentMonth
      })
      if (currentMonthData.length === 0) {
         return openData
      } else {
         return currentMonthData
      }
   }, [currentMonth, openData])

   return (
      <>
         <Header />
         <SwiperBanner data={filterData} />
         <StyledMonthWrapper>
            <h3 className='pb-2'>{new Date().getFullYear()}年</h3>
            <StyledMonthBox>
               {monthList.map((month, index) => {
                  return (
                     <div key={index}>
                        <StyledMonthText
                           onClick={() => setMonth(() => month.number)}
                           isActive={currentMonth === month.value}
                           key={index}
                        >
                           {month.number}月<br />
                           {month.en}
                        </StyledMonthText>
                     </div>
                  )
               })}
            </StyledMonthBox>
         </StyledMonthWrapper>
         <StyledContent className='flex  flex-wrap justify-center max-h-[358px] gap-10  py-6 px-6'>
            {categoryList.map((data, index) => {
               return (
                  <div key={index} className='flex flex-col items-center'>
                     <div>
                        <img src={data.imageUrl} alt={data.title} />
                     </div>
                     <p>{data.title}</p>
                  </div>
               )
            })}
         </StyledContent>
         <StyledHotSection>
            <h3 className='title'>熱門展覽</h3>
            {openData.slice(0, 2).map((data) => {
               return <ExhibitionCard data={data} />
            })}
         </StyledHotSection>
         <StyledAllExhibitionWrapper>
            <h3 className='font-medium mb-4 text-xl w-[100%]'>所有展覽</h3>
            <TypeWrapper className='flex gap-2 overflow-scroll mb-6'>
               <StyledExhibitionType>最新展覽</StyledExhibitionType>
               <StyledExhibitionType>人氣展覽</StyledExhibitionType>
               <StyledExhibitionType>評分最高</StyledExhibitionType>
               <StyledExhibitionType>最近日期</StyledExhibitionType>
            </TypeWrapper>
            <div className='all'>
               {openData.map((data, index) => {
                  return <AllExhibitionCard key={index} data={data} />
               })}
            </div>
         </StyledAllExhibitionWrapper>
         <StyledFooter>© 2024 ARTION.All rights reserved</StyledFooter>
      </>
   )
}
const ExhibitionCard = ({ data }) => {
   return (
      <StyledCardContainer>
         <BaseImageBox
            width={'19px'}
            height={'19px'}
            tabletWidth={'53px'}
            tabletHeight={'31px'}
            desktopWidth={'100px'}
            desktopHeight={'100px'}
         >
            <img src={hotestNumber} alt={data.title} />
         </BaseImageBox>
         <BaseImageBox
            width={'60px'}
            height={'60px'}
            tabletWidth={'120px'}
            tabletHeight={'120px'}
            scale={'contain'}
         >
            <img src={data.imageUrl || categoryicon1} alt='' className='rounded-md' />
         </BaseImageBox>
         <StyledCardContent className='description flex flex-wrap gap-1'>
            <StyledCardTitle className='font-medium text-[14px] basic-[100%] w-[100%] text-base'>
               {data.title ?? '展覽名稱'}
            </StyledCardTitle>
            <StyledCardInfo>
               <p className='date'>{`${data.startDate} - ${data.endDate}`}</p>
               <BaseImageBox width={'16px'} height={'16px'} className='city'>
                  <img src={locationIcon} alt='縣市地址圖示' />
               </BaseImageBox>
               <p className='locate'>{data?.showInfo[0]?.location ?? '尚無資料'}</p>
            </StyledCardInfo>
         </StyledCardContent>
      </StyledCardContainer>
   )
}

const AllExhibitionCard = ({ data }) => {
   return (
      <StyledAllContainer>
         <BaseImageBox width={'167px'} height={'180px'} className='exhibition'>
            <img src={data.imageUrl} alt='' className='rounded-lg' />
            <StyledPositionImageBox position={'absolute'} right={'2%'} top={'2%'}>
               <img src={loveIcon} alt='收藏按鈕' />
            </StyledPositionImageBox>
         </BaseImageBox>
         <h3>{data.title}</h3>
         <p className='text-xs'>{data.startDate}</p>
         <div className='flex'>
            <BaseImageBox width={'16px'} height={'16px'} className='w-[16px] h-[16px]'>
               <img src={locationIcon} alt='縣市地址圖示' />
            </BaseImageBox>
            <p className='text-xs '>{data.showInfo[0].location}</p>
         </div>
      </StyledAllContainer>
   )
}

const StyledPositionImageBox = styled(PositionElement)`
   width: 20px;
   height: 20px;
`

const StyledMonthWrapper = styled.section`
   display: flex;
   flex-direction: column;
   padding: 0 24px;

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 0 40px;
   }
`

const StyledCardContainer = styled.div`
   ${FlexCenter};
   justify-content: start;
   align-items: center;
   gap: 16px;
   background-color: white;
   border-radius: 16px;
   padding: 20px 12px;
   margin-bottom: 6px;
   max-height: 92px;

   @media (min-width: ${breakpoint.tablet}px) {
      max-height: 170px;

      .description {
         justify-content: flex-start;
         font-size: 18px;
         font-weight: 700;
         color: #453434;
      }
   }
`
const StyledCardContent = styled.div`
   max-width: 191px;
   ${FlexCenter};
   flex-wrap: wrap;
   gap: 4px;
   color: #535353;

   @media (min-width: ${breakpoint.tablet}px) {
      .date {
         color: #535353;
         font-weight: 400;
      }
      .locate {
         color: #535353;
         font-weight: 400;
      }
   }
`
const StyledCardInfo = styled.div`
   ${FlexCenter};
   flex-wrap: nowrap;
   font-size: 14px;
   white-space: nowrap;

   p {
      margin-right: 8px;
   }
   .city {
      margin-right: 2px;
   }
`
const StyledCardTitle = styled.h3`
   font-size: 16px;
   font-weight: 500;
   color: #453434;
   text-align: start;
   margin: unset; //移除預設
`
const StyledAllContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 4px;
   width: 167px;

   .exhibition {
      position: relative;
      border-radius: 16px;
   }

   h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
   }
`

const StyledMonthBox = styled.div`
   display: flex;
   align-items: center;
   text-align: center;
   font-size: 12px;
   gap: 1px;
   overflow: scroll;
   scrollbar-width: none;

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 14px;
      justify-content: space-between;
   }
`
const StyledMonthText = styled.p`
   cursor: pointer;
   box-sizing: border-box;
   white-space: nowrap;
   width: 100%;
   padding: 10px;
   &:hover {
      background: #be875c;
      color: #fff;
   }
`

const StyledHotSection = styled.section`
   background-image: url(${hotBg});
   background-size: cover;
   padding: 24px;

   h3 {
      font-weight: 600;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 40px;

      .title {
         font-size: 36px;
      }
   }
`

const StyledAllExhibitionWrapper = styled.div`
   display: flex;
   flex-direction: column;
   padding: 24px;
   width: 100%;
   background: #f9f9f9;

   .all {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
   }
`

const TypeWrapper = styled.div`
   display: flex;
   margin-bottom: 24px;
   gap: 8px;
   overflow: scroll;
   &::-webkit-scrollbar {
      display: none;
   }
`

const StyledExhibitionType = styled.div`
   max-height: 35px;
   border-radius: 10px;
   font-size: 14px;
   padding: 8px 16px;
   text-align: center;
   white-space: nowrap;
   color: ${(props) => (props.isActive ? '#BE8152' : '#000')};
   background: ${(props) => (props.isActive ? '#BE8152' : '#eeee')};
   &:hover {
      background: #be875c;
      color: #fff;
   }
`

const StyledFooter = styled.footer`
   background: #7b4d29;
   color: #fff;
   white-space: nowrap;
   padding: 20px 72px;
`

const StyledContent = styled.div`
   ${FlexCenter};
   flex-wrap: true;
   gap: 40px;
   max-height: 358px;
   padding: 24px;
`

export default HomePage
