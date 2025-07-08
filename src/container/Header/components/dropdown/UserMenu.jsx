import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'

const UserMenu = ({ userInfo, userPhotos, onLogout, onClose }) => {
  const handleLinkClick = () => {
    onClose()
  }

  const handleLogoutClick = () => {
    onLogout()
    onClose()
  }

  return (
    <StyledMemberMenuBox>
      <div className="user">
        <StyledUserIcon width={'38px'} height={'38px'}>
          <img src={userPhotos[userInfo.photoURL || 0]} alt="" />
        </StyledUserIcon>
        <Link to={'/backstage'} className="user-name" onClick={handleLinkClick}>
          <div className="hello">hello!</div>
          <div>Andy</div>
        </Link>
      </div>
      <Link to={'/backstage'} className="profile" onClick={handleLinkClick}>
        個人檔案
      </Link>
      <div className="logout" onClick={handleLogoutClick}>
        登出
      </div>
    </StyledMemberMenuBox>
  )
}

const StyledUserIcon = styled.div`
  border-radius: 20px;
  width: ${props => props.width || '32px'};
  height: ${props => props.height || '32px'};

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`

const StyledMemberMenuBox = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 155px;

  .user {
    display: flex;
    gap: 8px;

    &-name {
      display: flex;
      flex-direction: column;
      .hello {
        font-size: 12px;
        color: #5f5f5f;
      }
    }
  }
  .profile {
    cursor: pointer;
    &:hover {
      color: #bd7e4c;
    }
  }
  .logout {
    cursor: pointer;
    &:hover {
      color: #bd7e4c;
    }
  }
`

export default UserMenu
