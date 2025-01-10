import React from 'react'
import { useState, useEffect, useRef } from 'react'
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
   searchIcon,
} from '../../assets/images'
import {
   selectPhotoIcon,
   userIcon0,
   userIcon1,
   userIcon2,
   userIcon3,
   userIcon4,
   userIcon5,
   userIcon6,
   userIcon7,
   userIcon8,
} from '../../assets/images/backstage'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
import StoreMenu from './StoreMenu'
import CalendarMenu from './CalendarMenu'
import ProfileMenu from './ProfileMenu'
import { PositionElement } from '../../styles/base/PositionElement'
import { useSelector } from 'react-redux'
import { db } from '../../../firebase.config'
import { updateDoc, doc, getDoc, arrayRemove } from 'firebase/firestore'
import axios from 'axios'
import Modal from '../../components/Modal'
import { breakpoint } from '../../styles/utils/breakpoint'

const Backstage = () => {
   const [favoriteData, setFavoriteData] = useState([])
   let [exhibition, setExhibition] = useState([])
   const [currentMenu, setCurrentMenu] = useState(0)
   const [currentPhoto, setCurrentPhoto] = useState(2)
   const initialPhoto = useRef(currentPhoto)
   const [userPhoto, setUserPhoto] = useState([
      userIcon0,
      userIcon1,
      userIcon2,
      userIcon3,
      userIcon4,
      userIcon5,
      userIcon6,
      userIcon7,
      userIcon8,
   ])
   const [isShowPhotoMenu, setIsShowPhotoMenu] = useState(false)
   const { openData } = useSelector((store) => store.common)
   const menu = ['收藏展覽', '展覽月曆', '個人設定']

   let favoriteDatas = []
   //讀取 firestore 的資料
   useEffect(() => {
      // getExhibition()
      getUserInfo()
      const data = JSON.parse(localStorage.getItem('favoriteExhibitions')) || []
      const storedExhibitions = openData.filter((exhibition) => data.includes(exhibition.UID))
      setExhibition((data) => (data = storedExhibitions))
   }, [])

   // 解除收藏的展覽
   function removeExhibition(id) {
      console.log('removed')

      const userData = doc(db, 'users', '9Jx7yrqhjuoM4VxrmSCh') //todo 根據會員回傳資料存入
      updateDoc(userData, {
         favorite: arrayRemove(id),
      })
   }
   const handleSave = async () => {
      try {
         const userDoc = doc(db, 'users', '9Jx7yrqhjuoM4VxrmSCh') // 替換為你的用戶文檔 ID
         await updateDoc(userDoc, {
            photoIndex: currentPhoto,
         })
         initialPhoto.current = currentPhoto // 更新初始相片索引
         setIsShowPhotoMenu(false)
      } catch (error) {
         console.error('Error updating document: ', error)
      }
   }
   const handleCancel = () => {
      setCurrentPhoto(initialPhoto.current)
      setIsShowPhotoMenu(false)
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
         console.log(docSnap.data())
      } catch (e) {
         console.log(e)
      }
   }

   function renderMenu() {
      switch (currentMenu) {
         case 0:
            return <StoreMenu data={exhibition} />
         case 1:
            return <CalendarMenu />
         case 2:
            return <ProfileMenu />
      }
   }

   return (
      <>
         <Header />
         <StyledBackstageContainer>
            <StyledUserInfo>
               <BaseImageBox
                  width={'60px'}
                  height={'60px'}
                  tabletWidth={'122px'}
                  tabletHeight={'122px'}
                  className='photo'
               >
                  <img src={userPhoto[currentPhoto]} alt='' />
                  <StyledPositionImageBox
                     bottom={'0'}
                     right={'5%'}
                     position={'absolute'}
                     width={'16px'}
                     height={'16px'}
                     tabletWidth={'32px'}
                     tabletHeight={'32px'}
                     onClick={() => {
                        console.log('click')
                        setIsShowPhotoMenu(true)
                     }}
                  >
                     <img src={selectPhotoIcon} alt='' />
                  </StyledPositionImageBox>
               </BaseImageBox>
               <p className='name'>{'Andy'}</p>
            </StyledUserInfo>
            <StyledMenuBox>
               {menu.map((data, index) => {
                  return (
                     <div
                        className={`option ${currentMenu === index ? 'active' : ''}`}
                        key={index}
                        onClick={() => setCurrentMenu(index)}
                     >
                        {data}
                     </div>
                  )
               })}
            </StyledMenuBox>
         </StyledBackstageContainer>
         <StyledFeatureBox>{renderMenu()}</StyledFeatureBox>
         <Modal
            isShow={isShowPhotoMenu}
            setShow={setIsShowPhotoMenu}
            height={'640px'}
            width={'540px'}
            borderRadius={'20px'}
            padding={'40px'}
            position={{ t: '50%', l: '50%', b: 'unset', r: 'unset' }}
            translate={'-50% -50%'}
         >
            <StyledPhotoMenuBox>
               <p>大頭照</p>
               <p>選擇你喜歡的頭像或上傳你的照片</p>
               <div className='option'>
                  {userPhoto.map((data, index) => {
                     return (
                        <BaseImageBox
                           key={index}
                           width={'141px'}
                           height={'120px'}
                           className={`photo ${currentPhoto === index ? 'active' : ''}`}
                           onClick={() => {
                              setCurrentPhoto(index)
                           }}
                        >
                           <img src={data} alt='' />
                        </BaseImageBox>
                     )
                  })}
               </div>
               <div className='operator'>
                  <div className='operator-cancel' onClick={handleCancel}>
                     取消
                  </div>
                  <div className='operator-save' onClick={handleSave}>
                     儲存
                  </div>
               </div>
            </StyledPhotoMenuBox>
         </Modal>
      </>
   )
}

export default Backstage

const StyledPositionImageBox = styled(PositionElement)`
   width: ${({ width }) => width || '20px'};
   height: ${({ height }) => height || '20px'};
   cursor: pointer;
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
   display: flex;
   flex-direction: column;
   gap: 40px;
   background-image: url(${accountBg});
   padding: 40px 24px;

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 40px;
   }
`

const StyledUserInfo = styled.div`
   display: flex;
   justify-content: flex-start;
   gap: 24px;
   .name {
      color: #7b4d29;
      font-size: 24px;
   }
   .photo {
      position: relative;
      border-radius: 60px;

      img {
         border-radius: 60px;
      }
   }
   @media (min-width: ${breakpoint.tablet}px) {
      .name {
         font-size: 36px;
      }
   }
`
const StyledFeatureBox = styled.div`
   display: flex;
   flex-direction: column;
   border-radius: 40px 40px 0 0;
   background-color: white;
   padding: 40px 24px;

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 40px;
   }
`
const StyledMenuBox = styled.div`
   display: flex;
   gap: 24px;
   cursor: pointer;
   .option {
      color: #929292;
   }
   .active {
      color: #a9622a;
      border-bottom: 2px solid #a9622a;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      justify-content: flex-start;
      padding-top: 40px;
   }
`
const StyledPhotoMenuBox = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 8px;

   .option {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 18px;

      .photo {
         cursor: pointer;
         &:hover {
            opacity: 0.5;
         }
      }
      .active {
         outline: 5px solid #a9622a;
         opacity: 0.5;
      }
   }
   .operator {
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      margin-top: 40px;
      width: 100%;

      &-cancel {
         background: #eeeeee;
         padding: 10px;
         border-radius: 10px;
         cursor: pointer;
      }
      &-save {
         background: #be8152;
         color: white;
         padding: 10px;
         border-radius: 10px;
         cursor: pointer;
      }
   }
`
const StyledUserIcon = styled(BaseImageBox)`
   outline: 5px solid red;
   border-radius: 2px;
   opacity: ${(isActive) => (opacity ? opacity : '')};
`
