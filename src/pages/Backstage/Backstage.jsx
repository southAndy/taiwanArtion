import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import Header from '../../container/Header/Header'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import {
   backstageIcon,
   UserSamplePhoto,
   successBg,
   sucessIcon,
   accountBg,
   loveIcon,
   locateIcon,
} from '../../assets/images'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { PositionElement } from '../../styles/base/PositionElement'
import BasicDateCalendar from '../../plugins/Calendar'
import { db } from '../../../firebase.config'
import { getDoc, doc } from 'firebase/firestore'
import axios from 'axios'

BasicDateCalendar
BaseImageBox
const Backstage = () => {
   const [favoriteData, setFavoriteData] = useState([])
   let [exhibition, setExhibition] = useState([])
   const [currentMenu, setCurrentMenu] = useState(0)
   const menu = ['收藏展覽', '展覽月曆', '個人設定']
   const menuComponent = []
   let favoriteDatas = []

   //讀取 firestore 的資料
   useEffect(() => {
      getExhibition()
   }, [])

   async function getExhibition() {
      try {
         await getUserInfo()
         const res = await axios.get(
            'https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6',
         )
         const data = res.data
         console.log('fa', favoriteDatas)

         const filteredExhibition = data.filter((item, index) => favoriteDatas.includes(item.UID))

         setExhibition((n) => (n = filteredExhibition))
         console.log(exhibition)
      } catch (e) {
         console.log(e)
      }
   }

   async function getUserInfo() {
      try {
         // const actions = new Promise.all([])
         const userDatas = doc(db, 'users', '9Jx7yrqhjuoM4VxrmSCh')
         const docSnap = await getDoc(userDatas)
         favoriteDatas = [...docSnap.data().favorite]
         console.log(favoriteDatas)
      } catch (e) {
         console.log(e)
      }
   }

   function renderMenu() {
      switch (menu) {
         case 0:
            ;<StoreMenu data={exhibition} />
         case 1:
            ;<CalendarMenu />
         // case 2:
         //    <ProfileMenu/>
      }
   }

   return (
      <>
         <Header />
         <StyledBackstageContainer>
            <StyledUserInfo>
               <BaseImageBox width={'60px'} height={'60px'}>
                  <img src={UserSamplePhoto} alt='' />
               </BaseImageBox>
               <p className='name'>{'Andy'}</p>
            </StyledUserInfo>
            <StyledMenuBox>
               {menu.map((data, index) => {
                  return (
                     <div className='option' key={index}>
                        {data}
                     </div>
                  )
               })}
            </StyledMenuBox>
            <StyledFeatureBox>{renderMenu()}</StyledFeatureBox>
         </StyledBackstageContainer>
      </>
   )
}
const AllExhibitionCard = ({ data }) => {
   return (
      <StyledAllContainer>
         <BaseImageBox width={'327px'} height={'180px'} className='exhibition'>
            <img src={data?.imageUrl} alt='' className='rounded-lg' />
            <StyledPositionImageBox position={'absolute'} right={'2%'} top={'2%'}>
               <img src={loveIcon} alt='收藏按鈕' />
            </StyledPositionImageBox>
         </BaseImageBox>
         <h3>{data?.title}</h3>
         <p className='text-xs'>{data?.startDate}</p>
         <div className='flex'>
            <BaseImageBox width={'16px'} height={'16px'} className='w-[16px] h-[16px]'>
               <img src={locateIcon} alt='縣市地址圖示' />
            </BaseImageBox>
            <p className='text-xs '>{data?.showInfo[0]?.location}</p>
         </div>
      </StyledAllContainer>
   )
}

const CalendarMenu = () => {
   ;<>
      <BasicDateCalendar />
      <h3>即將到來的展覽</h3>
   </>
}

const StoreMenu = (data) => {
   return (
      <>
         {data.map((data) => (
            <AllExhibitionCard data={data} key={data.UID} />
         ))}
      </>
   )
}

const StyledPositionImageBox = styled(PositionElement)`
   width: 20px;
   height: 20px;
`

const StyledAllContainer = styled.div`
   display: flex;
   flex-wrap: wrap;
   gap: 4px;
   margin-bottom: 16px;

   .exhibition {
      position: relative;
      border-radius: 16px;
   }

   h3 {
      white-space: nowrap;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
   }
`

const StyledBackstageContainer = styled.main`
   background-image: url(${accountBg});
`

const StyledUserInfo = styled.div`
   display: flex;
   justify-content: start;
   gap: 24px;
   padding: 40px 24px;
   .name {
      color: #7b4d29;
      font-size: 24px;
   }
`
const StyledFeatureBox = styled.div`
   display: flex;
   flex-direction: column;
   border-radius: 40px 40px 0 0;
   background-color: white;
   padding: 40px 24px;

   box-shadow: 0px 3px 10px 0px #dadada;
   height: 100vh;
`
const StyledMenuBox = styled.div`
   display: flex;
   justify-content: space-around;
   padding: 40px 24px;
   gap: 24px;

   .option {
      color: #929292;

      &:active {
         color: #be8152;
      }
   }
`

export default Backstage
