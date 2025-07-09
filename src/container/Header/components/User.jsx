import React from 'react'
import styled from '@emotion/styled'
import { breakpoint } from '@styles/utils/breakpoint'
import Dropdown from '@components/Dropdown/Dropdown'
import UserMenu from '@container/Header/components/dropdown/UserMenu'

const User = ({
  isLogin,
  onLoginClick,
  isShowMemberMenu,
  setMemberMenu,
  userInfo,
  handleLogout,
}) => {
  if (isLogin) {
    return (
      <Dropdown isShow={isShowMemberMenu} setShow={setMemberMenu} trigger={<UserMenu />}>
        <UserMenu userInfo={userInfo} userPhotos={userInfo.photoURL} onLogout={handleLogout} />
      </Dropdown>
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
