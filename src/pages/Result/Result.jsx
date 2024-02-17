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

const StyledLoginBanner = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: start;
   gap: 10px;
   padding: 20px;
   background-image: url(${hotBg});
   height: 100px;
`

const StyledTitle = styled.h3`
   display: flex;
   align-items: center;
   justify-content: flex-start;
   font-size: 18px;
`
const StyledExhibitionLink = styled(Link)`
   display: flex;
   flex-direction: column;
   gap: 12px;
   border-radius: 10px;
   margin-bottom: 24px;
`
const StyledFilterText = styled.p`
   font-size: 16px;
   &:hover {
      color: #ffb800;
   }
`

export default function ResultPage() {
   const [total, setTotal] = useState(0)
   const [isShow, setIsShow] = useState(false)
   const [currentType, setCurrentType] = useState('')

   const showModalHandler = () => {
      setIsShow((prev) => !prev)
   }
   return (
      <>
         <Header />
         <StyledLoginBanner>
            <StyledTitle className='text-md whitespace-nowrap'>
               <Link to='/' className='w-[18px] h-[10px]'>
                  <img src={vectorIcon} alt='回到上一頁箭頭' />
               </Link>
               找到共{5}筆展覽資訊
            </StyledTitle>
            <div className='cursor-pointer flex items-center gap-10 text-[#929292]'>
               <div>搜尋結果</div>
               <div>距離最近</div>
               <div className='w-[36px] h-[36px] ml-auto' onClick={showModalHandler}>
                  <img src={filterIcon} alt='進階搜尋圖示' />
               </div>
            </div>
         </StyledLoginBanner>
         <section className=' rounded-xl p-6'>
            {[1, 2, 3, 4].map((item, index) => {
               return (
                  <StyledExhibitionLink key={index} to={'/detail'}>
                     <div className=''>
                        <img src={sampleResult} alt='' />
                     </div>
                     <div className='flex justify-between'>
                        <div>
                           <p className='mb-2 font-medium'>賴威嚴油畫個展</p>
                           <div className='flex gap-4'>
                              <div className='flex items-center gap-2'>
                                 <div className='w-[20px] h-[20px]'>
                                    <img src={calendarIcon} alt='' />
                                 </div>
                                 <p>2023-03-31</p>
                              </div>
                              <div className='flex items-center gap-2'>
                                 <div className='w-[20px] h-[20px]'>
                                    <img src={locateIcon} alt='展覽地點圖示，點即可查看位置' />
                                 </div>
                                 <p>台北市</p>
                              </div>
                           </div>
                        </div>
                        <div className='flex'>
                           <p>5</p>
                           <div className='w-[20px] h-[20px]'>
                              <img src={commentStarIcon} alt='查看評論，外型為星星樣式' />
                           </div>
                           <p>(1234)</p>
                        </div>
                     </div>
                  </StyledExhibitionLink>
               )
            })}
         </section>
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
