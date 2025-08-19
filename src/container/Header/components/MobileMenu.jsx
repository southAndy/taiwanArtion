import React, { useState } from 'react'
import styled from '@emotion/styled'
import { headerMenu } from '@assets/images/index'
import { breakpoint } from '@styles/utils/breakpoint'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

const MobileMenu = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)

  const handleMenuClick = () => {
    setIsShowMenu(prev => !prev)
  }

  return (
    <>
      <MobileMenuButton onClick={handleMenuClick}>
        <img className="w-[18px] h-[18px]" src={headerMenu} alt="選單圖樣" />
      </MobileMenuButton>

      {isShowMenu &&
        createPortal(
          <MobileMenuOverlay onClick={() => setIsShowMenu(false)}>
            <MobileMenuContent onClick={e => e.stopPropagation()}>
              <Link
                to="/account"
                className="p-4 w-full block text-center hover:bg-[#a9622a] hover:text-white border-none rounded-b-lg"
              >
                登入 / 註冊
              </Link>
            </MobileMenuContent>
          </MobileMenuOverlay>,
          document.body
        )}
    </>
  )
}

const MobileMenuButton = styled.div`
  cursor: pointer;

  @media (min-width: ${breakpoint.tablet}px) {
    display: none;
  }
`

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
`

const MobileMenuContent = styled.div`
  position: absolute;
  top: 80px; /* Header 高度 */
  left: 0;
  width: 100%;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0 0 16px 16px;
`

export default MobileMenu
