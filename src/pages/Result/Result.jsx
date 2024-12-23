import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../container/Header/Header'
import Modal from '../../components/Modal'
import styled from 'styled-components'
import {
   hotBg,
   vectorIcon,
   sampleResult,
   locateIcon,
   calendarIcon,
   filterIcon,
   commentStarIcon,
} from '../../assets/images/index'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { breakpoint } from '../../styles/utils/breakpoint'
import FlexCenter from '../../styles/utils/FlexCenter'

export default function ResultPage() {
   const [total, setTotal] = useState(0)
   const [isShow, setIsShow] = useState(false)
   const [currentType, setCurrentType] = useState('')

   useEffect(() => {
      // 讀取資料總比數
   }, [total])

   const showModalHandler = () => {
      setIsShow((prev) => !prev)
   }
   return (
      <>
         <Header />
         <StyledLoginBanner>
            <StyledTitle>
               <StyledPageLink to='/'>
                  <img src={vectorIcon} alt='回到上一頁箭頭' />
               </StyledPageLink>
               找到共{total}筆展覽資訊
            </StyledTitle>
            <div className='menu'>
               <div>搜尋結果</div>
               <div>距離最近</div>
            </div>
            {/* <BaseImageBox width={'36px'} height={'36px'} onClick={showModalHandler}>
               <img src={filterIcon} alt='進階搜尋圖示' />
            </BaseImageBox> */}
         </StyledLoginBanner>
         <StyledResultListBox>
            {[1, 2, 3, 4].map((item, index) => {
               return (
                  <StyledExhibitionLink key={index} to={'/detail/123'}>
                     <BaseImageBox tabletWidth={'331px'} tabletHeight={'200px'}>
                        <img src={sampleResult} alt='' />
                     </BaseImageBox>
                     <p className='title mb-2 font-medium'>
                        賴威嚴油畫個展
                        <StyledExhibitionRate to={`/detail/${item.UID}`}>
                           <p>5</p>
                           <BaseImageBox width={'20px'} height={'20px'}>
                              <img src={commentStarIcon} alt='查看評論，外型為星星樣式' />
                           </BaseImageBox>
                           <p>(1234)</p>
                        </StyledExhibitionRate>
                     </p>
                     <div className='info flex gap-4'>
                        <div className='date'>
                           <BaseImageBox
                              width={'20px'}
                              height={'20px'}
                              tabletWidth={'24px'}
                              tabletHeight={'24px'}
                           >
                              <img src={calendarIcon} alt='' />
                           </BaseImageBox>
                           <p>2023-03-31</p>
                        </div>
                        <div className='locate flex items-center gap-2'>
                           <BaseImageBox
                              width={'16px'}
                              height={'16px'}
                              tabletWidth={'16px'}
                              tabletHeight={'16px'}
                              className='w-[20px] h-[20px]'
                           >
                              <img src={locateIcon} alt='展覽地點圖示，點即可查看位置' />
                           </BaseImageBox>
                           <p>台北市</p>
                        </div>
                     </div>
                  </StyledExhibitionLink>
               )
            })}
         </StyledResultListBox>
         <Modal
            isShow={isShow}
            setShow={setIsShow}
            position={{ t: '25%' }}
            size={{ w: '100%', h: '125px' }}
            shape={'10px'}
         >
            <div className='flex flex-col items-center gap-3 cursor-pointer'>
               <StyledFilterText>熱門搜尋</StyledFilterText>
               <StyledFilterText>最多人收藏</StyledFilterText>
            </div>
         </Modal>
      </>
   )
}

const StyledPageLink = styled(Link)`
   width: 8px;
   height: 16px;

   @media (min-width: ${breakpoint.tablet}px) {
      width: 8px;
      height: 16px;
   }
`

const StyledLoginBanner = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: start;
   gap: 10px;
   padding: 20px;
   background-image: url(${hotBg});
   margin-top: -54px;

   .menu {
      display: flex;
      align-items: center;
      gap: 40px;
      color: #929292;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
   }

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 24px;
      padding: 24px 32px;
   }
`

const StyledTitle = styled.h3`
   display: flex;
   justify-content: flex-start;
   gap: 10px;
   font-size: 18px;
   font-weight: 500;
   color: #535353;

   @media (min-width: ${breakpoint.tablet}px) {
      font-size: 24px;
   }
`
const StyledExhibitionLink = styled(Link)`
   display: flex;
   flex-direction: column;
   gap: 12px;
   border-radius: 10px;
   margin-bottom: 24px;

   .title {
      position: relative;
   }
   .info {
      display: flex;
      gap: 12px;
      .date {
         display: flex;
         align-items: center;
      }

      .locate {
         display: flex;
         align-items: center;
      }
   }
`

const StyledExhibitionRate = styled(Link)`
   display: flex;
   position: absolute;
   top: 0;
   right: 0;
`

const StyledFilterText = styled.p`
   font-size: 16px;
   &:hover {
      color: #ffb800;
   }
`
const StyledResultListBox = styled.section`
   display: flex;
   justify-content: center;
   flex-wrap: wrap;
   border-radius: 40px;
   padding: 24px;

   @media (min-width: ${breakpoint.tablet}px) {
      gap: 25px;
      padding: 40px;
   }
`
