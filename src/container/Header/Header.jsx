import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoIcon, headerSearch, headerMenu } from '../../assets/images/index'
import { logout } from '../../store/userSlice'
import BaseLink from '../../styles/base/BaseLink'
import BaseImageBox from '../../styles/base/BaseImageBox'
import styled from '@emotion/styled'
import Modal from '../../components/Modal'
import Menu from '../Menu/Menu'
import { breakpoint } from '../../styles/utils/breakpoint'
import {
  userIcon0,
  userIcon1,
  userIcon2,
  userIcon3,
  userIcon4,
  userIcon5,
  userIcon6,
  userIcon7,
  userIcon8,
} from '../../assets/images/backstage'

const Header = () => {
  const [isShowModal, setIsShowModal] = useState(false)
  const [isShowMenu, setMenu] = useState(false)
  const [isShowMemberMenu, setMemberMenu] = useState(false)
  const [menu, setMenuContent] = useState([])
  const menuList = [
    {
      title: '地圖找展覽',
      link: '/map',
    },
    {
      title: '所有展覽',
      link: '/all',
    },
    {
      title: '註冊/登入',
      link: '/account',
    },
    {
      title: '個人頁面',
      link: '/backstage',
    },
  ]
  const navigate = useNavigate()
  const isLogin = useSelector(state => state.user.isLogin)
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const UserIcon = [
    userIcon0,
    userIcon1,
    userIcon2,
    userIcon3,
    userIcon4,
    userIcon5,
    userIcon6,
    userIcon7,
    userIcon8,
  ]

  // switch menu content
  useEffect(() => {
    if (isLogin) {
      // remove login menu
      setMenuContent(menuList.filter(item => item.title !== '註冊/登入'))
    } else {
      // remove register menu
      setMenuContent(menuList.filter(item => item.title !== '個人頁面'))
    }
  }, [isLogin])

  const handleLogout = () => {
    //執行登出功能
    dispatch(logout())
    navigate('/')
    //關閉下拉清單顯示
    setMemberMenu(n => (n = false))
  }

  return (
    <HeaderContainer>
      <BaseLink width={'120px'} height={'40px'} to="/">
        <img src={logoIcon} alt="網站圖樣" />
      </BaseLink>
      <div className="menu">
        {[
          {
            title: '地圖找展覽',
            link: '/map',
          },
          {
            title: '所有展覽',
            link: '/all',
          },
        ].map((item, index) => (
          <Link key={index} to={item.link}>
            {item.title}
          </Link>
        ))}
      </div>
      <HeaderCategory>
        <BaseImageBox width={'18px'} height={'18px'} onClick={() => setIsShowModal(n => !n)}>
          <img src={headerSearch} alt="搜尋圖樣" />
        </BaseImageBox>
        <div className="menu-mobile" onClick={() => setMenu(n => !n)}>
          <img className="w-[18px] h-[18px]" src={headerMenu} alt="選單圖樣" />
        </div>
        {isLogin ? (
          <StyledUserIcon onClick={() => setMemberMenu(n => !n)}>
            <img src={UserIcon[0]} alt="" />
          </StyledUserIcon>
        ) : (
          <button
            className="login"
            onClick={() => {
              navigate('/account')
            }}
          >
            登入/註冊
          </button>
        )}
      </HeaderCategory>
      <Modal isShow={isShowModal} setShow={setIsShowModal} translate={'unset'} overflow={'auto'}>
        <Menu setModlaShow={setIsShowModal} />
      </Modal>
      <Modal
        isShow={isShowMenu}
        setShow={setMenu}
        height={'154px'}
        translate={'unset'}
        overflow={'auto'}
      >
        <StyldMenuBox>
          {menu.map((item, index) => (
            <Link key={index} to={item.link} keys={index}>
              {item.title}
            </Link>
          ))}
        </StyldMenuBox>
      </Modal>
      <Modal
        isShow={isShowMemberMenu}
        setShow={setMemberMenu}
        width={'155px'}
        height={'164px'}
        position={{ r: '1%', t: '0.5%', b: 'unset', l: 'unset' }}
        overflow={'scroll'}
        borderRadius={'20px'}
        translate={'unset'}
      >
        <StyledMemberMenuBox>
          <div className="user">
            <StyledUserIcon width={'38px'} height={'38px'}>
              <img src={UserIcon[user.photoIndex]} alt="" />
            </StyledUserIcon>
            <Link to={'/backstage'} className="user-name">
              <div className="hello">hello!</div>
              <div>Andy</div>
            </Link>
          </div>
          <Link to={'/backstage'} className="profile">
            個人檔案
          </Link>
          <div className="logout" onClick={handleLogout}>
            登出
          </div>
        </StyledMemberMenuBox>
      </Modal>
    </HeaderContainer>
  )
}

const StyledUserIcon = styled.div`
  border-radius: 20px;
  width: 32px;
  height: 32px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`

const StyledLink = styled(Link)`
  width: 120px;
  height: 40px;
`
const StyldMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 8px 20px;
  background: #ffffff;
  box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);

  .menu {
    display: none;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    .menu {
      flex: 2;
      display: flex;
      gap: 20px;
      margin-left: 40px;
      font-weight: 700;

      a {
        font-size: 14px;
        color: #535353;

        &:hover {
          color: #be875c;
        }
      }
    }
  }
`

const HeaderCategory = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  cursor: pointer;

  .login {
    display: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 700;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    .menu-mobile {
      display: none;
    }
    .login {
      display: block;
      padding: 8px 25px;
      background: #eeeeee;
      color: #535353;
      border: none;
      border-radius: 20px;

      &:hover {
        background: #be875c;
        color: #fff;
      }
    }
  }
  @media (min-width: ${breakpoint.desktop}px) {
  }
`

const StyledMemberMenuBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

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

export default Header
