import { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import SwiperBanner from '../../plugins/Swiper/SwiperSlide'
import Header from '../../container/Header/Header'
import Footer from '../../container/Footer/Footer'
import fakeMonthList from '../../assets/data/month.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/commonSlice'
import { breakpoint } from '../../styles/utils/breakpoint'
import AllExhibitionCard from './ExhibitionCard.jsx'
import ExhibitionCard from './HotCard.jsx'

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
} from '../../assets/images/index'

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
            <div className='content'>
               {/* <div className='highlight'>
                  {hotData.length > 0 && <ExhibitionCard data={hotData[0]} rank={0} />}
               </div> */}
               <div>
                  {hotData.map((data, index) => {
                     return <ExhibitionCard data={data} rank={index} key={data.UID} />
                  })}
               </div>
            </div>
         </StyledHotSection>
         <StyledAllExhibitionWrapper>
            <h3 className='title font-medium mb-4 text-xl w-[100%]'>所有展覽</h3>
            <TypeWrapper className='menu'>
               {['最新展覽', '人氣展覽', '評分最高', '最近日期'].map((type, index) => {
                  return <StyledExhibitionType key={index}>{type}</StyledExhibitionType>
               })}
            </TypeWrapper>
            <div className='all'>
               {filterData.map((data, index) => {
                  return <AllExhibitionCard key={index} data={data} />
               })}
            </div>
         </StyledAllExhibitionWrapper>
         <Footer />
      </>
   )
}

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

// const StyledCardTitle = styled.h3`
//    font-size: 16px;
//    font-weight: 500;
//    color: #453434;
//    text-align: start;
//    white-space: nowrap;
//    overflow: hidden;
//    text-overflow: ellipsis;
//    margin: unset; //移除預設
// `

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
   display: flex;
   flex-direction: column;
   gap: 24px;

   .content {
      .highlight {
         display: none;
         gap: 24px;
      }
   }

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 40px;
   }
   @media (min-width: ${breakpoint.desktop}px) {
      padding: 40px 120px;

      .content {
         .highlight {
            display: flex;
         }
      }
   }

   .top {
      display: none;
   }
`

const StyledAllExhibitionWrapper = styled.div`
   display: flex;
   flex-direction: column;
   padding: 24px;
   width: 100%;
   background: #f9f9f9;

   .all {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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

// const StyledExhibitionTypeBox = styled.div`
//    display: flex;
//    flex-wrap: true;
//    gap: 40px;
//    max-height: 358px;
//    padding: 24px;
//    overflow-x: auto;
//    //隱藏滾動條 chrome
//    &::-webkit-scrollbar {
//       display: none;
//    }
//    //隱藏滾動條 firefox
//    scrollbar-width: none;
// `

export default HomePage
