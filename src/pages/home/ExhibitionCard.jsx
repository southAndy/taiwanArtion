import styled from 'styled-components'
import { useState, useEffect } from 'react'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { PositionElement } from '../../styles/base/PositionElement'
import { breakpoint } from '../../styles/utils/breakpoint'
import { loveIcon, loveFullIcon, locationIcon, defaultBannerTablet } from '../../assets/images'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const AllExhibitionCard = ({ data }) => {
   const [isStoreExhibition, setIsStoreExhibition] = useState(false)

   useEffect(() => {
      // 讀取 localStorage
      let storeData = localStorage.getItem('favoriteExhibitions')
      // 如果陣列包含資料，則顯示收藏展覽
      if (storeData) {
         JSON.parse(storeData).forEach((uid) => {
            if (uid === data.UID) {
               setIsStoreExhibition((prev) => !prev)
            }
         })
      }
   }, [])

   function storeExhibition(event) {
      event.preventDefault() // 阻止默認行為
      event.stopPropagation() // 阻止事件冒泡

      // 讀取 localStorage
      let storeData = localStorage.getItem('favoriteExhibitions')
      if (storeData) {
         JSON.parse(storeData).forEach((uid) => {
            if (uid === data.UID) {
               setIsStoreExhibition((prev) => !prev)
            }
         })
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
