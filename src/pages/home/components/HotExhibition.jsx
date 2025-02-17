import React, { memo } from 'react'
import styled from 'styled-components'
import { breakpoint } from '../../../styles/utils/breakpoint'
import {
   hotestNumber,
   hotestNumber2,
   hotestNumber3,
   hotestNumber4,
   defaultBannerTablet,
   locationIcon,
} from '../../../assets/images'
import { hotBg } from '../../../assets/images'
import FlexCenter from '../../../styles/utils/FlexCenter'
import BaseImageBox from '../../../styles/base/BaseImageBox'

const HotSection = ({ exhibition }) => {
   return (
      <StyledHotSection>
         <h3 className='title'>熱門展覽</h3>
         {exhibition.slice(0, 2).map((data, index) => {
            return <ExhibitionCard data={data} key={index} />
         })}
      </StyledHotSection>
   )
}
const StyledCardContainer = styled.div`
   ${FlexCenter};
   justify-content: start;
   align-items: center;
   gap: 16px;
   background-color: white;
   border-radius: 16px;
   padding: 20px 12px;
   margin-bottom: 6px;
   max-height: 92px;

   .rank {
      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }
   .banner {
      img {
         width: 100%;
         height: 100%;
         object-fit: cover;
      }
   }

   @media (min-width: ${breakpoint.tablet}px) {
      max-height: 170px;

      .description {
         justify-content: flex-start;
         flex-direction: column;
         font-size: 24px;
         font-weight: 700;
         color: #453434;
      }
   }
`
const StyledCardContent = styled.div`
   display: flex;

   max-width: 191px;
   flex-wrap: wrap;
   gap: 4px;
   color: #535353;

   @media (min-width: ${breakpoint.tablet}px) {
      max-width: unset;
      .date {
         color: #535353;
         font-weight: 400;
      }
      .locate {
         color: #535353;
         font-weight: 400;
      }
   }
`
const StyledCardInfo = styled.div`
   ${FlexCenter};
   align-items: center;
   flex-wrap: nowrap;
   font-size: 14px;
   white-space: nowrap;

   p {
      margin-right: 8px;
   }
   .city {
      margin-right: 2px;

      img {
         width: 100%;
         height: 100%;
         object-fit: contain;
      }
   }
`
const StyledCardTitle = styled.h3`
   font-size: 16px;
   font-weight: 500;
   color: #453434;
   text-align: start;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   margin: unset; //移除預設

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 24px;
   }
`

export default memo(HotSection)

const ExhibitionCard = ({ data }) => {
   console.log('card render')

   return (
      <StyledCardContainer>
         <BaseImageBox
            className='rank'
            width={'19px'}
            height={'19px'}
            tabletWidth={'53px'}
            tabletHeight={'31px'}
            desktopWidth={'100px'}
            desktopHeight={'100px'}
         >
            <img src={hotestNumber} alt={data.title} />
         </BaseImageBox>
         <BaseImageBox
            width={'60px'}
            height={'60px'}
            tabletWidth={'120px'}
            tabletHeight={'120px'}
            scale={'contain'}
            className='banner'
         >
            <img src={data.imageUrl ? data.imageUrl : defaultBannerTablet} alt='' />
         </BaseImageBox>
         <StyledCardContent className='description'>
            <StyledCardTitle className='title'>{data.title ?? '展覽名稱'}</StyledCardTitle>
            <StyledCardInfo>
               <p className='date'>{`${data.startDate} - ${data.endDate}`}</p>
               <BaseImageBox width={'16px'} height={'16px'} className='city'>
                  <img src={locationIcon} alt='縣市地址圖示' />
               </BaseImageBox>
               {/* <p className='locate'>{data?.showInfo[0]?.location ?? '尚無資料'}</p> */}
            </StyledCardInfo>
         </StyledCardContent>
      </StyledCardContainer>
   )
}

//  ---- Styled Components  ----

const StyledHotSection = styled.section`
   background-image: url(${hotBg});
   background-size: cover;
   padding: 24px;

   h3 {
      font-weight: 600;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      padding: 40px;

      .title {
         font-size: 16px;
      }
   }
`
