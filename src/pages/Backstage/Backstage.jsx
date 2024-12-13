import React from 'react'
import Header from '../../container/Header/Header'
import { backstageIcon, UserSamplePhoto } from '../../assets/images'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import BaseImageBox from '../../styles/base/BaseImageBox'
BaseImageBox
const Backstage = () => {
   // 用 redux 取得 user 資料
   // const user = useSelector((state) => state.member.memberInfo)
   // console.log('讀取使用者資料', user)
   // function handleLogout() {
   //    console.log('logout')
   // }
   return (
      <>
         <StyledUserInfo>
            <BaseImageBox width={'60px'} height={'60px'}>
               <img src={UserSamplePhoto} alt='' />
            </BaseImageBox>
         </StyledUserInfo>
      </>
   )
}

const StyledUserInfo = styled.div`
   display: flex;
`

export default Backstage
