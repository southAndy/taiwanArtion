import { useState } from 'react'
import { Link } from 'react-router-dom'
import { logoIcon, searchIcon } from '../../assets/images/index'
import styled from '@emotion/styled'

const HeaderContainer = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100vw;
   height: 80px;
   padding: 8px 20px;
   background: #ffffff;
   box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
`

const HeaderCategory = styled.div`
   display: flex;
   justify-content: space-between;
`

const Header = () => {
   return (
      <HeaderContainer>
         <Link to='/'>
            <img src={logoIcon} alt='' />
         </Link>
         <HeaderCategory>
            <div>
               <img src={searchIcon} alt='' />
            </div>
            <div>{/* <img src={} alt="" /> */}</div>
         </HeaderCategory>
      </HeaderContainer>
   )
}

export default Header
