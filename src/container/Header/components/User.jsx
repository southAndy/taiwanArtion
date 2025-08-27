import React, { useState } from 'react'
import styled from '@emotion/styled'
import { breakpoint } from '@styles/utils/breakpoint'
import Dropdown from '@components/atoms/Dropdown/Dropdown'
import UserMenu from '@container/Header/components/dropdown/UserMenu'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@store/userSlice'
import { useNavigate } from 'react-router-dom'
import { useBreakpoint } from '@hooks/useBreakpoint'
import AuthModal from '@container/Auth/AuthModal'

const User = ({ onLoginClick }) => {
  const { userInfo, userPhotos, isLogin } = useSelector(state => state.user)
  const [isShowMemberMenu, setMemberMenu] = useState(false)
  const [isShowAuthModal, setIsShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isDesktop } = useBreakpoint()

  const handleUserClick = () => {
    setMemberMenu(prev => !prev)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setMemberMenu(false)
  }

  const handleLoginClick = () => {
    if (isDesktop) {
      setAuthMode('login')
      setIsShowAuthModal(true)
    } else {
      onLoginClick()
    }
  }

  const handleRegisterClick = () => {
    if (isDesktop) {
      setAuthMode('register')
      setIsShowAuthModal(true)
    } else {
      navigate('/register')
    }
  }

  if (isLogin) {
    return (
      <>
        <div>
          <StyledUserIcon onClick={handleUserClick}>
            <img src={userPhotos[userInfo?.photoURL || 0]} alt="" />
          </StyledUserIcon>
          <div>{userInfo?.displayName || userInfo?.name || 'User'}</div>
        </div>
        <Dropdown isOpen={isShowMemberMenu} onClose={() => setMemberMenu(false)}>
          <UserMenu userInfo={userInfo} userPhotos={userPhotos} onLogout={handleLogout} />
        </Dropdown>
      </>
    )
  }

  return (
    <>
      <ButtonContainer>
        <LoginButton onClick={handleLoginClick}>登入</LoginButton>
        <RegisterButton onClick={handleRegisterClick}>註冊</RegisterButton>
      </ButtonContainer>

      <AuthModal isShow={isShowAuthModal} setShow={setIsShowAuthModal} initialMode={authMode} />
    </>
  )
}

const StyledUserIcon = styled.div`
  border-radius: 20px;
  width: 32px;
  height: 32px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`

const ButtonContainer = styled.div`
  display: none;
  gap: 8px;

  @media (min-width: ${breakpoint.tablet}px) {
    display: flex;
  }
`

const LoginButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  border: none;
  padding: 8px 20px;
  background: #eeeeee;
  color: #535353;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #be875c;
    color: #fff;
  }
`

const RegisterButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  border: 1px solid #a9622a;
  padding: 8px 20px;
  background: transparent;
  color: #a9622a;
  border-radius: 20px;
  transition: all 0.3s ease;

  &:hover {
    background: #a9622a;
    color: #fff;
  }
`

export default User
