import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBreakpoint } from '@hooks/useBreakpoint'
import styled from '@emotion/styled'
import Logo from '@container/Header/components/Logo'
import Navigation from '@container/Header/components/Navigation'
import LoginModal from '@container/Header/components/LoginModal'
import SearchBar from './components/search/SearchBar'
import Dropdown from '@components/Dropdown/Dropdown'
import HeaderSearchMenu from './components/search/Menu'

const Header = () => {
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('city')
  const navigate = useNavigate()
  const { isMobile } = useBreakpoint()

  const handleLoginClick = () => {
    if (isMobile) {
      navigate('/account')
    } else {
      setIsShowLoginModal(true)
    }
  }

  const handleSearchSectionClick = tabId => {
    if (tabId) {
      setActiveTab(tabId) // 設定要顯示的頁籤
    }
    setIsSearchMenuOpen(true) // 打開下拉選單
  }

  return (
    <HeaderContainer>
      <Logo />
      <Dropdown
        trigger={<SearchBar onSearch={handleSearchSectionClick} />}
        isOpen={isSearchMenuOpen}
        onClose={() => setIsSearchMenuOpen(false)}
        placement="bottom-center"
      >
        <HeaderSearchMenu activeTabId={activeTab} setModlaShow={setIsSearchMenuOpen} />
      </Dropdown>
      <Navigation onLoginClick={handleLoginClick} />

      <LoginModal
        isShow={isShowLoginModal}
        setShow={setIsShowLoginModal}
        onClose={() => setIsShowLoginModal(false)}
      />
    </HeaderContainer>
  )
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 8px 20px;
  background: #ffffff;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
`
export default Header
