import { useEffect, useState, useMemo } from 'react'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import SwiperBanner from '../../plugins/Swiper/SwiperSlide'
import Header from '../../container/Header/Header'
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
   const [currentType, setType] = useState(0) // 0:最新展覽 1:人氣展覽 2:評分最高 3:最近日期
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
         <main className='flex flex-col pl-6'>
            <h3 className='pb-2'>{new Date().getFullYear()}年</h3>
            <section className='selector flex items-center gap-[1px] text-xs overflow-scroll'>
               {monthList.map((month, index) => {
                     return (
                        <div key={index}>
                           <p className=' cursor-pointer whitespace-nowrap w-[100%] p-[10px] hover:bg-[#be875c] hover:text-white'>
                              {month.number}月<br />{month.en}
                           </p>
                          
                        </div>
                     )
                  })}
            </section>
         </main>
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
         <section className='exhibition-hot bg-hot bg-cover p-6'>
            <h3 className='font-medium mb-6 text-xl'>熱門展覽</h3>
            <ExhibitionCard data={exhibitionList} />
         </section>
         <section className='exhibition-all flex flex-col p-6 w-[100%] bg-[#f9f9f9f9]'>
            <h3 className='font-medium mb-4 text-xl'>所有展覽</h3>
            <div className='type flex gap-2 mb-6 overflow-scroll  '>
               {['最新展覽', '人氣展覽', '評分最高', '最近日期'].map((type, index) => {
                  return (
                     <div onClick={()=>setType(index)} className={`${currentType === index ?'text-[#eee]':'text-[#000]'} ${currentType===index? 'bg-[#BE8152]':'bg-[#eeee]'} hover:bg-[#be875c] hover:text-white max-h-[35px] rounded-[10px] text-sm text-center whitespace-nowrap cursor-pointer py-2 px-4`}>最新展覽</div>
                  )
               })}
            </div>
            
            <div className='flex gap-2'>
               {exhibitionList.map((data, index) => {
                  return <AllExhibitionCard key={index} data={data} />
               })}
            </div>
         </section>
         <footer className='bg-[#7b4d29] text-white whitespace-nowrap py-5 px-[72px]'>© 2024 ARTION.All rights reserved</footer>
      </>
   )
}

export default HomePage
