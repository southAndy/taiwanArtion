import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { logoIcon } from '../../../assets/images/index'
import { memo } from 'react'

const LogoBox = styled(Link)`
   display: flex;
   align-items: center;
`

const LogoImg = styled.img`
   height: 40px;
`

const Logo = memo(() => {
   return (
      <LogoBox to='/'>
         <LogoImg src={logoIcon} alt='logo' />
      </LogoBox>
   )
})

Logo.displayName = 'Logo'

export default Logo
