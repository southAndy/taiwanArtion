import { useEffect, useState, useMemo } from 'react'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import SwiperBanner from '../../plugins/Swiper/SwiperSlide'
import Header from '../../container/Header/Header'
import './home.scss'
import fakeMonthList from '../../assets/data/month.json'

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

const StyledMonthWrapper = styled.section`
   display: flex;
   flex-direction: column;
   padding-left: 24px;
`

const StyledMonthBox = styled.div`
   display: flex;
   align-items: center;
   text-align: center;
   font-size: 12px;
   gap: 1px;
   overflow: scroll;
   &::-webkit-scrollbar {
      display: none;
   }
   scrollbar-width: none;
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

const HotSection = styled.section`
   background-image: url(${hotBg});
   background-size: cover;
   padding: 24px;
`

const StyledAllExhibitionWrapper = styled.div`
   display: flex;
   flex-direction: column;
   padding: 24px;
   width: 100%;
   background: #f9f9f9;
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

const ExhibitionCard = ({ data }) => {
   return (
      <div className='flex items-center gap-4 bg-white rounded-xl py-5 px-3 max-h-[92px] mb-2'>
         <div className='number text-[#BE8152] font-bold'>01</div>
         <div className='rounded-md h-[60px] w-[60px]'>
            <img src={data.imageUrl || categoryicon1} alt='' className='rounded-md' />
         </div>
         <div className='description flex flex-wrap gap-1'>
            <h3 className='font-medium text-[14px] basic-[100%] w-[100%] text-base'>
               {data.title ?? '展覽名稱'}
            </h3>
            <p className='text-xs	'>2023.03.21 - 4.20</p>
            <div className='w-[16px] h-[16px]'>
               <img src={locationIcon} alt='縣市地址圖示' />
            </div>
            <p className='text-xs'>{data.showInfo?.location ?? '尚無資料'}</p>
         </div>
      </div>
   )
}

const AllExhibitionCard = ({ data }) => {
   return (
      <div className='flex flex-col gap-1'>
         <div className='relative w-[167px] h-[180px] rounded-lg'>
            <img src={data.imageUrl} alt='' className='rounded-lg' />
            <div className='absolute right-2 top-2 h-[20px] w-[20px]'>
               <img src={loveIcon} alt='收藏按鈕' />
            </div>
         </div>
         <h3>{data.title}</h3>
         <p className='text-xs'>{data.startDate}</p>
         <div className='flex'>
            <div className='w-[16px] h-[16px]'>
               <img src={locationIcon} alt='縣市地址圖示' />
            </div>
            <p className='text-xs '>{data.showInfo[0].location}</p>
         </div>
      </div>
   )
}

const HomePage = () => {
   const monthList = fakeMonthList
   const [exhibitionList, setList] = useState([])
   const [ownAPI, setOwnAPI] = useState([])
   const [isLoading, setLoading] = useState(true)
   const [currentMonth, setMonth] = useState(new Date().getMonth() + 1)
   const [isShowModal, setModal] = useState(false)
   const [isClick, setClick] = useState(false)
   const [isShow, setShow] = useState(false)

   // 初次載入去抓資料
   useEffect(() => {
      async function fetchData() {
         try {
            // const response = await axios.post(
            //    'https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/exhibition',
            //    {
            //       keyword: 'taipei',
            //    },
            // )
            const openResponse = await axios.get(
               'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
            )
            const openData = openResponse.data

            console.log('合併結果', openResponse)
            const hasImageData = openData.filter((data) => {
               return data.imageUrl !== ''
            })

            setList(() => hasImageData)
         } catch (error) {
            console.log(error)
         } finally {
            //終止載入效果
            setLoading(() => false)
         }
      }
      fetchData()
   }, [])
   // 當月份改變時篩選資料
   const filterData = useMemo(() => {
      console.log('切換當前月份', currentMonth)
      const currentMonthData = exhibitionList.filter((data) => {
         const startDate = dayjs(data.startDate).month() + 1
         return startDate === currentMonth
      })
      if (currentMonthData.length === 0) {
         console.log('當月無展覽')
         return exhibitionList
      } else {
         return currentMonthData
      }
   }, [currentMonth, exhibitionList])

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
         <section className='flex  flex-wrap justify-center max-h-[358px] gap-10  py-6 px-6'>
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
         </section>
         <HotSection>
            <h3 className='font-medium mb-6 text-xl'>熱門展覽</h3>
            <ExhibitionCard data={exhibitionList} />
         </HotSection>
         <StyledAllExhibitionWrapper>
            <h3 className='font-medium mb-4 text-xl w-[100%]'>所有展覽</h3>
            <TypeWrapper className='flex gap-2 overflow-scroll mb-6'>
               <StyledExhibitionType>最新展覽</StyledExhibitionType>
               <StyledExhibitionType>人氣展覽</StyledExhibitionType>
               <StyledExhibitionType>評分最高</StyledExhibitionType>
               <StyledExhibitionType>最近日期</StyledExhibitionType>
            </TypeWrapper>
            <div className='flex gap-2 overflow-hidden'>
               {exhibitionList.map((data, index) => {
                  return <AllExhibitionCard key={index} data={data} />
               })}
            </div>
         </StyledAllExhibitionWrapper>
         <StyledFooter>© 2024 ARTION.All rights reserved</StyledFooter>
      </>
   )
}

export default HomePage
