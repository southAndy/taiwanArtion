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
   commentStarIcon,
} from '../../assets/images'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { PositionElement } from '../../styles/base/PositionElement'
import BasicDateCalendar from '../../plugins/Calendar'
import { db } from '../../../firebase.config'
import { updateDoc, doc, getDoc, arrayRemove } from 'firebase/firestore'

import axios from 'axios'

BasicDateCalendar
BaseImageBox
const Backstage = () => {
   const [favoriteData, setFavoriteData] = useState([])
   let [exhibition, setExhibition] = useState([])
   const [currentMenu, setCurrentMenu] = useState(0)
   const menu = ['收藏展覽', '展覽月曆', '個人設定']
   let favoriteDatas = []

   //讀取 firestore 的資料
   useEffect(() => {
      getExhibition()
   }, [])

   // 解除收藏的展覽
   function removeExhibition(id) {
      console.log('removed')

      const userData = doc(db, 'users', '9Jx7yrqhjuoM4VxrmSCh') //todo 根據會員回傳資料存入
      updateDoc(userData, {
         favorite: arrayRemove(id),
      })
   }

   const StoreMenu = () => {
      return (
         <>
            {exhibition.map((data) => (
               <AllExhibitionCard data={data} key={data.UID} />
            ))}
         </>
      )
   }

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
         const userDatas = doc(db, 'users', '9Jx7yrqhjuoM4VxrmSCh')
         const docSnap = await getDoc(userDatas)
         favoriteDatas = [...docSnap.data().favorite]
         console.log(favoriteDatas)
      } catch (e) {
         console.log(e)
      }
   }

   const AllExhibitionCard = ({ data }) => {
      return (
         <StyledAllContainer>
            <Link to={`/detail/${data.UID}`} className='exhibition'>
               <img src={data?.imageUrl} alt='' className='rounded-lg' />
               <StyledPositionImageBox
                  position={'absolute'}
                  right={'2%'}
                  top={'2%'}
                  onClick={() => removeExhibition(data.UID)}
               >
                  <img src={loveIcon} alt='收藏按鈕' />
               </StyledPositionImageBox>
            </Link>
            <div className='comment'>
               <h3>{data?.title}</h3>
               <div className='comment-rate'>
                  <p>{'5'}</p>
                  <BaseImageBox height={'16px'} width={'16px'}>
                     <img src={commentStarIcon} alt='' />
                  </BaseImageBox>
                  <p>{'(123)'}</p>
               </div>
            </div>
            <p className='time'>{data?.startDate}</p>
            {/* <div className='flex'>
               <BaseImageBox width={'16px'} height={'16px'} className='w-[16px] h-[16px]'>
                  <img src={locateIcon} alt='縣市地址圖示' />
               </BaseImageBox>
               <p className='text-xs '>{data?.showInfo[0]?.City}</p>
            </div> */}
         </StyledAllContainer>
      )
   }

   function renderMenu() {
      console.log('hi')

      switch (currentMenu) {
         case 0:
            return <StoreMenu data={exhibition} />
         case 1:
            return <CalendarMenu />
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
                     <div className='option' key={index} onClick={() => setCurrentMenu(index)}>
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

const CalendarMenu = () => {
   return (
      <>
         <BasicDateCalendar />
         <h3>即將到來的展覽</h3>
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
      width: 327px;
      height: 180px;
   }

   .comment {
      display: flex;
      flex-wrap: nowrap;
      align-itemd: center;
      justify-content: space-between;
      width: 100%;
      margin: 16px 0 8px 0;

      h3 {
         max-width: 213px;
         white-space: nowrap;
         font-size: 16px;
         overflow: hidden;
         text-overflow: ellipsis;
         margin: 0;
      }

      &-rate {
         display: flex;
         align-itemd: center;
         gap: 2px;
      }
   }
   .time {
      font-size: 14px;
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
