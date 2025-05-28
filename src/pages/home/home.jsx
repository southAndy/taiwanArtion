import React from 'react'
import { useEffect, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import SwiperBanner from '../../plugins/Swiper/SwiperSlide'
import Header from '../../container/Header/Header'
import MonthSelector from './components/MonthSelector.jsx'
import HotExhibition from './components/HotExhibition.jsx'
import fakeMonthList from '../../assets/data/month.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../../store/commonSlice'

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
         <MonthSelector month={monthList} setMonth={setMonth} currentMonth={currentMonth} />
         <HotExhibition exhibition={openData} />
         <StyledFooter>© 2024 ARTION.All rights reserved</StyledFooter>
      </>
   )
}

const StyledFooter = styled.footer`
   background: #7b4d29;
   color: #fff;
   white-space: nowrap;
   padding: 20px 72px;
`

export default HomePage
