import React, { memo } from 'react'
import styled from 'styled-components'
import { PositionElement } from '../../../styles/base/PositionElement'
import { breakpoint } from '../../../styles/utils/breakpoint'

const Exhibition = ({ openData }) => {
   return (
      <StyledAllExhibitionWrapper>
         <h3 className='title font-medium mb-4 text-xl w-[100%]'>所有展覽</h3>
         <TypeWrapper className='menu'>
            {['最新展覽', '人氣展覽', '評分最高', '最近日期'].map((type, index) => {
               return <StyledExhibitionType key={index}>{type}</StyledExhibitionType>
            })}
         </TypeWrapper>
         <div className='all'>
            {openData.map((data, index) => {
               return <AllExhibitionCard key={index} data={data} />
            })}
         </div>
      </StyledAllExhibitionWrapper>
   )
}
const StyledAllExhibitionWrapper = styled.div`
   display: flex;
   flex-direction: column;
   padding: 24px;
   width: 100%;
   background: #f9f9f9;

   .all {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
   }
   .title {
      text-align: start;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      .title {
         font-size: 36px;
         text-align: center;
         margin: 0;
         margin-bottom: 32px;
      }
      .menu {
         justify-content: center;
      }
      .all {
         justify-content: space-between;
      }
   }
`

const TypeWrapper = styled.div`
   display: flex;
   margin-bottom: 24px;
   gap: 8px;
   overflow: scroll;
   &::-webkit-scrollbar {
      display: none;
   }
`

export default memo(Exhibition)

const AllExhibitionCard = ({ data }) => {
   return (
      <StyledAllContainer>
         <BaseImageBox width={'167px'} height={'180px'} className='exhibition'>
            <img
               src={data.imageUrl ? data.imageUrl : defaultBannerTablet}
               alt=''
               className='rounded-lg'
            />
            <StyledPositionImageBox position={'absolute'} right={'2%'} top={'2%'}>
               <img src={loveIcon} alt='收藏按鈕' />
            </StyledPositionImageBox>
         </BaseImageBox>
         <h3>{data.title}</h3>
         <p className='text-xs'>{data.startDate}</p>
         <div className='locate flex'>
            <BaseImageBox width={'16px'} height={'16px'} className='w-[16px] h-[16px]'>
               <img src={locationIcon} alt='縣市地址圖示' />
            </BaseImageBox>
            <p className='location-content text-xs '>{data.showInfo[0].location}</p>
         </div>
      </StyledAllContainer>
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
   width: 155px;

   .title {
   }

   .exhibition {
      position: relative;
      border-radius: 16px;

      img {
         border-radius: 16px;
      }
   }
   .locate {
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
   }
`
