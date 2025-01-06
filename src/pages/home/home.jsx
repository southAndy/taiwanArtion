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
   hotestNumber5,
   defaultBannerTablet,
} from '../../assets/images/index.js'

import {
   // categoryicon1,
   // categoryicon2,
   // categoryicon3,
   // categoryicon4,
   // categoryicon5,
   // categoryicon6,
   // categoryicon7,
   // categoryicon8,
   hotBg,
   locationIcon,
   loveIcon,
   sampleBg,
} from '../../assets/images/index'

const hotNumberList = [hotestNumber, hotestNumber2, hotestNumber3, hotestNumber4, hotestNumber5]

// const categoryList = [
//    { imageUrl: categoryicon1, title: '美術' },
//    { imageUrl: categoryicon2, title: '攝影' },
//    { imageUrl: categoryicon3, title: '音樂' },
//    { imageUrl: categoryicon4, title: '戲劇' },
//    { imageUrl: categoryicon5, title: '舞蹈' },
//    { imageUrl: categoryicon6, title: '綜藝' },
//    { imageUrl: categoryicon7, title: '親子' },
//    { imageUrl: categoryicon8, title: '展覽' },
// ]

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
      const currentMonthData = openData
         .filter((data) => {
            const startDate = dayjs(data.startDate).month() + 1
            const hasImage = Boolean(data.imageUrl) //判斷此筆資料是否有圖片
            // todo 目前月份篩選，會不夠精確，因為只有月份，沒有年份
            return startDate >= currentMonth && hasImage
         })
         .slice(0, 12)
      // 如果當月沒有展覽，就顯示全部展覽
      if (currentMonthData.length === 0) {
         return openData.slice(0, 12)
      } else {
         return currentMonthData
      }
   }, [currentMonth, openData])

   // 最熱門展覽
   const hotData = useMemo(() => {
      // hitRate 代表點擊次數
      return [...openData]
         .filter((data) => data.imageUrl)
         .sort((a, b) => b.hitRate - a.hitRate)
         .slice(0, 5)
   }, [openData])
   return (
      <>
         <Header />
         <StyledMonthWrapper>
            <h3 className='title'>{new Date().getFullYear()}年</h3>
            <StyledMonthBox>
               {monthList.map((month, index) => {
                  return (
                     <StyledMonthText
                        onClick={() => setMonth(() => month.number)}
                        isActive={currentMonth === month.number}
                        key={index}
                     >
                        {month.number}月<br />
                        {month.en}
                     </StyledMonthText>
                  )
               })}
            </StyledMonthBox>
         </StyledMonthWrapper>
         <SwiperBanner data={filterData} />
         {/* <StyledExhibitionTypeBox>
            {categoryList.map((data, index) => {
               return (
                  <div key={index}>
                     <div>
                        <img src={data.imageUrl} alt={data.title} />
                     </div>
                     <p>{data.title}</p>
                  </div>
               )
            })}
         </StyledExhibitionTypeBox> */}
         <StyledHotSection>
            <h3 className='title'>熱門展覽</h3>
            {hotData.map((data, index) => {
               return <ExhibitionCard data={data} rank={index} key={data.UID} />
            })}
         </StyledHotSection>
         <StyledAllExhibitionWrapper>
            <h3 className='title font-medium mb-4 text-xl w-[100%]'>所有展覽</h3>
            <TypeWrapper className='menu'>
               {['最新展覽', '人氣展覽', '評分最高', '最近日期'].map((type, index) => {
                  return <StyledExhibitionType key={index}>{type}</StyledExhibitionType>
               })}
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
const ExhibitionCard = ({ data, rank }) => {
   return (
      <StyledCardContainer to={`/detail/${data.UID}`}>
         <BaseImageBox
            className='rank'
            width={'19px'}
            height={'19px'}
            tabletWidth={'53px'}
            tabletHeight={'31px'}
            desktopWidth={'100px'}
            desktopHeight={'100px'}
         >
            <img src={`${hotNumberList[rank]}`} alt={data.title} />
         </BaseImageBox>
         <BaseImageBox
            width={'60px'}
            height={'60px'}
            tabletWidth={'120px'}
            tabletHeight={'120px'}
            scale={'contain'}
         >
            <img src={data.imageUrl ? data.imageUrl : defaultBannerTablet} alt='' />
         </BaseImageBox>
         <StyledCardContent className='description'>
            <h3 className='description-title'>{data.title ?? '展覽名稱'}</h3>
            <StyledCardInfo>
               <p className='date'>{`${dayjs(data.startDate).format('YYYY.MM.DD')}-${dayjs(
                  data.endDate,
               ).format('MM.DD')}`}</p>
               <BaseImageBox width={'16px'} height={'16px'} className='city'>
                  <img src={locationIcon} alt='縣市地址圖示' />
               </BaseImageBox>
               <p className='locate'>{data?.showInfo[0]?.location.slice(0, 3) ?? '尚無資料'}</p>
            </StyledCardInfo>
         </StyledCardContent>
      </StyledCardContainer>
   )
}

const AllExhibitionCard = ({ data }) => {
   return (
      <StyledAllContainer>
         <BaseImageBox width={'167px'} height={'180px'} className='exhibition'>
            <img
               src={data.imageUrl ? data.imageUrl : defaultBannerTablet}
               alt=''
               className='rounded-lg'
            />
            <StyledPositionImageBox position={'absolute'} right={'2%'} top={'2%'}>
               <img src={loveIcon} alt='收藏按鈕' />
            </StyledPositionImageBox>
         </BaseImageBox>
         <h3>{data.title}</h3>
         <p className='text-xs'>{`${dayjs(data.startDate).format('YYYY.MM.DD')}-${dayjs(
            data.endDate,
         ).format('MM.DD')}`}</p>
         <div className='locate flex'>
            <BaseImageBox width={'16px'} height={'16px'} className='w-[16px] h-[16px]'>
               <img src={locationIcon} alt='縣市地址圖示' />
            </BaseImageBox>
            <p className='location-content text-xs '>{data.showInfo[0].location.slice(0, 3)}</p>
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
   padding: 24px 24px 0 24px;

   .title {
      margin: 0; //移除預設
      margin-bottom: 8px;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 0 40px;
      margin-top: 56px;
   }
`

const StyledCardContainer = styled(Link)`
   ${FlexCenter};
   justify-content: start;
   align-items: center;
   gap: 16px;
   background-color: white;
   border-radius: 16px;
   padding: 20px 12px;
   margin-bottom: 6px;
   max-height: 92px;

   .rank {
      flex-shrink: 0;
      img {
         object-fit: contain;
      }
   }

   @media (min-width: ${breakpoint.tablet}px) {
      max-height: 170px;
   }
`
const StyledCardContent = styled.div`
   overflow: hidden;
   .description {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 4px;

      max-width: 191px;
      font-weight: 700;
      color: #453434;
   }
   & > div {
      flex-shrink: 0;
   }
   .description-title {
      max-width: 100%;
      font-size: 16px;
      font-weight: 500;
      color: #453434;
      text-align: start;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: unset; //移除預設
   }

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 18px;

      max-width: 100%;
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
   display: flex;
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
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   margin: unset; //移除預設
`
const StyledAllContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 4px;
   width: 119px;

   @media (min-width: ${breakpoint.mobile}px) {
      width: 140px;
   }

   .exhibition {
      position: relative;
      border-radius: 16px;

      img {
         border-radius: 16px;
      }
   }
   .locate {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
   }

   h3 {
      margin: 0; //移除預設
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
   }
`

const StyledMonthBox = styled.div`
   display: flex;
   align-items: center;
   text-align: center;
   font-size: 12px;
   gap: 1px;
   overflow: scroll;

   ::-webkit-scrollbar {
      display: none; /* For Chrome, Edge, and Safari */
   }

   scrollbar-width: none;

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 14px;
      justify-content: space-between;
   }
`
const StyledMonthText = styled.p`
   cursor: pointer;
   border-radius: 4px;
   white-space: nowrap;
   width: 100%;
   padding: 8px;
   background: ${(props) => (props.isActive ? '#BE8152' : 'white')};
   color: ${(props) => (props.isActive ? '#fff' : '#000')};
   &:hover {
      background: #be875c;
      color: #fff;
      bordr-radius: 4px;
   }
`

const StyledHotSection = styled.section`
   background-image: url(${hotBg});
   background-size: cover;
   padding: 24px;

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 40px;
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
      justify-content: center;
      gap: 24px;
   }
   .title {
      text-align: start;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      .title {
         font-size: 36px;
         text-align: center;
         margin: 0;
         margin-bottom: 32px;
      }
      .menu {
         justify-content: center;
      }
      .all {
         justify-content: space-between;
      }
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
   cursor: pointer;
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

const StyledExhibitionTypeBox = styled.div`
   display: flex;
   flex-wrap: true;
   gap: 40px;
   max-height: 358px;
   padding: 24px;
   overflow-x: auto;
   //隱藏滾動條 chrome
   &::-webkit-scrollbar {
      display: none;
   }
   //隱藏滾動條 firefox
   scrollbar-width: none;
`

export default HomePage
