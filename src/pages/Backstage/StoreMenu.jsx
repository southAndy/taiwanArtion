import React from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { notFoundBg } from '../../assets/images/backstage/index'

const StoreMenu = ({ data }) => {
   const [exhibition, setExhibition] = useState([])
   const [isStoreExhibition, setIsStoreExhibition] = useState(false)

   const navigate = useNavigate()

   useEffect(() => {
      // props 資料長度
      if (data.length > 0) {
         setExhibition(true)
      }
   }, [])

   // 沒有收藏展覽的畫面
   const NotStoreExhibition = () => {
      const goSearch = () => {
         navigate('/')
      }

      return (
         <div className='not-found'>
            <BaseImageBox width={'268px'} height={'268px'}>
               <img src={notFoundBg} alt='' />
            </BaseImageBox>
            <h3>目前沒有收藏的展覽</h3>
            <p>去看看現在有什麼最新展覽吧！</p>
            <button onClick={goSearch}>探索展覽</button>
         </div>
      )
   }

   return (
      <>
         <StyledStoreMenu>
            <div>搜尋框框</div>
            {isStoreExhibition ? <div>true</div> : <NotStoreExhibition />}
         </StyledStoreMenu>
      </>
   )
}

// const AllExhibitionCard = ({ data }) => {
//    return (
//       <StyledAllContainer>
//          <Link to={`/detail/${data.UID}`} className='exhibition'>
//             <img src={data?.imageUrl} alt='' className='rounded-lg' />
//             <StyledPositionImageBox
//                position={'absolute'}
//                right={'2%'}
//                top={'2%'}
//                onClick={() => removeExhibition(data.UID)}
//             >
//                <img src={loveIcon} alt='收藏按鈕' />
//             </StyledPositionImageBox>
//          </Link>
//          <div className='comment'>
//             <h3>{data?.title}</h3>
//             <div className='comment-rate'>
//                <p>{'5'}</p>
//                <BaseImageBox height={'16px'} width={'16px'}>
//                   <img src={commentStarIcon} alt='' />
//                </BaseImageBox>
//                <p>{'(123)'}</p>
//             </div>
//          </div>
//          <p className='time'>{data?.startDate}</p>
//          {/* <div className='flex'>
//             <BaseImageBox width={'16px'} height={'16px'} className='w-[16px] h-[16px]'>
//                <img src={locateIcon} alt='縣市地址圖示' />
//             </BaseImageBox>
//             <p className='text-xs '>{data?.showInfo[0]?.City}</p>
//          </div> */}
//       </StyledAllContainer>
//    )
// }

export default StoreMenu

const StyledStoreMenu = styled.main`
   .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;

      h3 {
         margin: 0;
      }
      button {
         width: 100px;
         height: 40px;
         background-color: #a9622a;
         border: none;
         border-radius: 20px;
         font-weight: 600;
         width: 176px;
         color: #fff;
         cursor: pointer;
      }
   }
`
