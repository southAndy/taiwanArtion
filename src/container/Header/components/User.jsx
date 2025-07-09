import React from 'react'
import styled from '@emotion/styled'
import { breakpoint } from '@styles/utils/breakpoint'
import { useState } from 'react'
import Dropdown from '@components/Dropdown/Dropdown'
import UserMenu from '@container/Header/components/dropdown/UserMenu'
import { useSelector } from 'react-redux'
import { logout } from '@store/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const User = ({ onLoginClick }) => {
  const { userInfo, userPhotos, isLogin } = useSelector(state => state.user)
  const [isShowMemberMenu, setMemberMenu] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUserClick = () => {
    setMemberMenu(prev => !prev)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    setMemberMenu(false)
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

  return <LoginButton onClick={onLoginClick}>登入/註冊</LoginButton>
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

const LoginButton = styled.button`
  display: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  border: none;
  background: transparent;

  @media (min-width: ${breakpoint.tablet}px) {
    display: block;
    padding: 8px 25px;
    background: #eeeeee;
    color: #535353;
    border-radius: 20px;

    &:hover {
      background: #be875c;
      color: #fff;
    }
  }
`

export default User
