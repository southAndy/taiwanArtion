import React from 'react'
import Header from '../../container/Header/Header'
import { backstageIcon, UserSamplePhoto } from '../../assets/images'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { successBg, sucessIcon, accountBg } from '../../assets/images'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
BaseImageBox
const Backstage = () => {
   const menu = ['收藏展覽', '展覽月曆', '個人設定']
   // 用 redux 取得 user 資料
   // const user = useSelector((state) => state.member.memberInfo)
   // console.log('讀取使用者資料', user)
   // function handleLogout() {
   //    console.log('logout')
   // }
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
            <StyledFeatureBox></StyledFeatureBox>
         </StyledBackstageContainer>
      </>
   )
}
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
   border-radius: 40px 40px 0 0;
   background-color: white;

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
