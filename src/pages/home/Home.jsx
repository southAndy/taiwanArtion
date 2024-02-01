import { useEffect, useState, useMemo } from 'react'
import React from 'react'

//third-part
import axios from 'axios'
import dayjs from 'dayjs'
import SwiperSlide from '../../plugins/Swiper/swiper-slide'
import styled from '@emotion/styled'

//component
import Header from '../../container/Header/Header'
import Card from '../../component/Card/Card'
import Modal from '../../component/modal/Modal'
import { Link } from 'react-router-dom'

import './home.scss'
const StyledMonthBox = styled.div`
   display: flex;
   align-items: center;
   text-align: center;
   gap: 1px;
`
const StyledMonthText = styled.p`
   cursor: pointer;
   box-sizing: border-box;
   width: 100%;
   padding: 10px;
   background-color: ${(props) => (props.isActive ? '#be875c' : '#986f4f;')};
   color: #ffffff;
   &:hover {
      background: #be875c;
   }
`
const HomePage = () => {
   const monthList = [
      { name: '一月', value: 1 },
      { name: '二月', value: 2 },
      { name: '三月', value: 3 },
      { name: '四月', value: 4 },
      { name: '五月', value: 5 },
      { name: '六月', value: 6 },
      { name: '七月', value: 7 },
      { name: '八月', value: 8 },
      { name: '九月', value: 9 },
      { name: '十月', value: 10 },
      { name: '十一月', value: 11 },
      { name: '十二月', value: 12 },
   ]

   //global-state
   let [exhibitionList, setList] = useState([])
   const [isLoading, setLoading] = useState(true)
   const [currentMonth, setMonth] = useState(new Date().getMonth() + 1)
   const [isShowModal, setModal] = useState(false)
   const [isClick, setClick] = useState(false)

   useEffect(() => {
      async function fetchData() {
         try {
            const response = await axios.get(
               'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
            )
            setList(() => (exhibitionList = response.data))
            //todo
            //從 firestore 取出資料，並存入 state 中, firestore 資料架構：data.docs[0]._document.data.value.mapValue.fields => 單筆資料
            // let data = await getDocs(collection(db, "exhibitions"));
            // setList(() => (exhibitionList = data.docs));
         } catch (error) {
            console.log(error)
         } finally {
            setLoading((state) => (state = false))
         }
      }
      fetchData()
   }, [])

   //?監測資料狀態
   useEffect(() => {
      // console.log(`updated: ${currentMonth}`);
      // console.log(selectedExhibition);
      // console.log(isLoading);
   }, [currentMonth, isLoading])

   //? 展覽資料處理
   const selectedExhibition = useMemo(() => {
      if (exhibitionList.length === 0) {
         //? 預設顯示展覽數量
         return [{}, {}, {}, {}, {}]
      } else {
         //? 篩選展覽日期
         const currentDate = `${new Date().getFullYear()}-${currentMonth}`
         const formatDate = dayjs(currentDate).format('YYYY-MM')
         return exhibitionList.filter((data) => {
            const beginMonth = dayjs(formatDate)
            if (beginMonth.isBefore(data.startDate, 'month')) {
               return data
            }
         })
      }
   }, [exhibitionList, currentMonth])
   return (
      <>
         <Modal isClick={isClick} setClick={setClick} />
         <Header setClick={setClick} exhibitionList={exhibitionList} />
         <StyledMonthBox>
            {monthList.map((month, index) => (
               <StyledMonthText
                  onClick={() => setMonth(month.value)}
                  isActive={currentMonth === month.value}
                  key={index}
               >
                  {month.name}
               </StyledMonthText>
            ))}
         </StyledMonthBox>
         <SwiperSlide data={selectedExhibition} isLoading={isLoading} />
         <main className='content'>
            <section className='exhibition'>
               <div>
                  <h3>熱門展覽</h3>
               </div>
               <div className='exhibition-card'>
                  {selectedExhibition.map((item, index) => {
                     return (
                        <Link to={`/detail/${item.UID}`} key={index}>
                           <Card key={item.UID} data={item} isLoading={isLoading} />
                        </Link>
                     )
                  })}
               </div>
            </section>
            <section className='result'>
               <h4>所有展覽</h4>
               <section>
                  {selectedExhibition.map((item, index) => {
                     return <Card key={index} data={item} isLoading={isLoading} />
                  })}
               </section>
            </section>
         </main>
      </>
   )
}

export default HomePage
