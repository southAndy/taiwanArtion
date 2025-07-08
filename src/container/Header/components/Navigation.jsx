// src/container/Header/components/Navigation.jsx
import React from 'react'
import styled from '@emotion/styled'
import DesktopMenu from './DesktopMenu'
import MobileMenu from './MobileMenu'
import User from './User'

const Navigation = ({
  isLogin,
  userInfo,
  userPhotos,
  onLoginClick,
  onMemberMenuToggle,
  onMobileMenuToggle,
}) => {
  return (
    <HeaderCategory>
      {/* 桌面版導航 */}
      <DesktopMenu />

      {/* 手機版選單按鈕 */}
      <MobileMenu onToggle={onMobileMenuToggle} />

      {/* 用戶區塊 */}
      <User
        isLogin={isLogin}
        userInfo={userInfo}
        userPhotos={userPhotos}
        onLoginClick={onLoginClick}
        onMemberMenuToggle={onMemberMenuToggle}
      />
    </HeaderCategory>
  )
}

const HeaderCategory = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`

export default Navigation
