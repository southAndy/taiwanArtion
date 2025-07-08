// src/container/Header/components/MobileMenu.jsx
import React from 'react'
import styled from '@emotion/styled'
import { headerMenu } from '@assets/images/index'
import { breakpoint } from '@styles/utils/breakpoint'

const MobileMenu = ({ onToggle }) => {
  return (
    <MobileMenuButton onClick={onToggle}>
      <img className="w-[18px] h-[18px]" src={headerMenu} alt="選單圖樣" />
    </MobileMenuButton>
  )
}

const MobileMenuButton = styled.div`
  cursor: pointer;

  @media (min-width: ${breakpoint.tablet}px) {
    display: none;
  }
`

export default MobileMenu
