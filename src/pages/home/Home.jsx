import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

//third-part
import axios from 'axios'
import dayjs from 'dayjs'
import SwiperSlide from '../../plugins/Swiper/swiper-slide'
import styled from '@emotion/styled'

//component
import Header from '../../container/Header/Header'
import Card from '../../component/Card/Card'
import Modal from '../../component/modal/Modal'

//assets
import './home.scss'
import fakeMonthList from '../../assets/data/month.json'
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
   const monthList = fakeMonthList

   const [exhibitionList, setList] = useState([])
   const [isLoading, setLoading] = useState(true)
   const [currentMonth, setMonth] = useState(new Date().getMonth() + 1)
   const [isShowModal, setModal] = useState(false)
   const [isClick, setClick] = useState(false)

   // 初次載入去抓資料
   useEffect(() => {
      async function fetchData() {
         try {
            let response = await axios.get(
               'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
            )
            // 近一步處理資料，過濾沒有圖片的展覽
            const hasImageData = response.data.filter((data) => data.imageUrl !== '')
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
