import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { PositionElement } from '../../styles/base/PositionElement'
import { breakpoint } from '../../styles/utils/breakpoint'
import { loveIcon, loveFullIcon, locationIcon, defaultBannerTablet } from '../../assets/images'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { db } from '../../../firebase.config'

const AllExhibitionCard = ({ data }) => {
   const [isStoreExhibition, setIsStoreExhibition] = useState(false)
   const { isLogin, memberInfo } = useSelector((slice) => slice.member)
   const dispatch = useDispatch()

   // 判斷是否為收藏展覽
   useEffect(() => {
      if (isLogin && memberInfo.favorite.length > 0) {
         memberInfo.favorite.forEach((storeUID) => {
            if (storeUID === data.UID) setIsStoreExhibition((prev) => (prev = true))
         })
      } else {
         setIsStoreExhibition((prev) => (prev = false))
      }
   }, [isStoreExhibition])

   async function storeExhibition(event) {
      event.preventDefault() // 阻止默認行為
      event.stopPropagation() // 阻止事件冒泡

      const userRef = doc(db, 'users', memberInfo.uid)

      // 檢查當前的 favorite 是否已包含 data.UID
      const isFavorite = memberInfo.favorite.includes(data.UID)

      try {
         if (isFavorite) {
            // redux 先更新
            dispatch({
               type: 'member/setMemberInfo',
               payload: {
                  ...memberInfo,
                  favorite: memberInfo.favorite.filter((item) => item !== data.UID),
               },
            })
            // 移除收藏
            await updateDoc(userRef, {
               favorite: arrayRemove(data.UID),
            })
            setIsStoreExhibition(false) // 更新狀態
         } else {
            // redux 先更新
            dispatch({
               type: 'member/setMemberInfo',
               payload: {
                  ...memberInfo,
                  favorite: [...memberInfo.favorite, data.UID],
               },
            })
            // 添加收藏
            await updateDoc(userRef, {
               favorite: arrayUnion(data.UID),
            })
            setIsStoreExhibition(true) // 更新狀態
         }
      } catch (error) {
         console.error('更新 Firestore 失敗:', error)
      }
   }

   return (
      <StyledLink to={`/detail/${data.UID}`}>
         <BaseImageBox
            width={'100%'}
            height={'180px'}
            tabletHeight={'202px'}
            className='exhibition'
         >
            <img
               src={data.imageUrl ? data.imageUrl : defaultBannerTablet}
               alt=''
               className='rounded-lg'
            />
            <StyledPositionImageBox
               onClick={storeExhibition}
               position={'absolute'}
               right={'2%'}
               top={'5%'}
            >
               <img src={isStoreExhibition ? loveFullIcon : loveIcon} alt='收藏按鈕' />
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
      </StyledLink>
   )
}

export default AllExhibitionCard

const StyledPositionImageBox = styled(PositionElement)`
   width: 20px;
   height: 20px;
`

const StyledLink = styled(Link)`
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   gap: 4px;
   overflow: hidden;

   .exhibition {
      position: relative;
      border-radius: 16px;
   }
   .locate {
      display: flex;
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
      width: 100%;
   }
   @media (min-width: ${breakpoint.tablet}px) {
      flex-direction: row;
   }
`
