import { useState, useEffect, useMemo, useCallback, Suspense } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Modal from '../../components/Modal/Modal'
import Logo from './components/Logo'
import Menu from './components/Menu'
import UserMenu from './components/UserMenu'
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
   const navigate = useNavigate()
   const isLogin = useSelector((state) => state.member.isLogin)
   const user = useSelector((state) => state.member.memberInfo)
   const dispatch = useDispatch()

   const menuList = useMemo(() => {
      return [
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
   }, [])
   const userIcon = useMemo(() => {
      return [
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
   }, [])

   const modal = useMemo(() => {
      // 每個物件都是 Modal 元件所需的 props 值跟架構
      return [
         {
            isShow: isShowModal,
            setShow: setIsShowModal,
            translate: 'unset',
            overflow: 'auto',
            children: <Menu setModlaShow={setIsShowModal} />,
         },
         {
            isShow: isShowMenu,
            setShow: setMenu,
            height: '154px',
            translate: 'unset',
            overflow: 'auto',
            children: (
               <StyldMenuBox>
                  {menu.map((item, index) => (
                     <Link key={index} to={item.link} keys={index}>
                        {item.title}
                     </Link>
                  ))}
               </StyldMenuBox>
            ),
         },
         {
            isShow: isShowMemberMenu,
            setShow: setMemberMenu,
            width: '155px',
            height: '164px',
            position: { r: '1%', t: '0.5%', b: 'unset', l: 'unset' },
            overflow: 'scroll',
            borderRadius: '20px',
            translate: 'unset',
            children: (
               <StyledMemberMenuBox>
                  <div className='user'>
                     <StyledUserIcon width={'38px'} height={'38px'}>
                        <img src={userIcon[user?.photoIndex]} alt='' />
                     </StyledUserIcon>
                     <Link to={'/backstage'} className='user-name'>
                        <div className='hello'>hello!</div>
                        <div className='name'>{user.name || '預設使用者ssssss'}</div>
                     </Link>
                  </div>
                  <Link to={'/backstage'} className='profile'>
                     個人檔案
                  </Link>
                  <div className='logout' onClick={logout}>
                     登出
                  </div>
               </StyledMemberMenuBox>
            ),
         },
         {},
      ]
   }, [isShowModal, isShowMenu, isShowMemberMenu])

   const showMenu = useCallback(() => {
      let menu = []
      if (!isLogin) {
         menu = menuList.filter((item) => item.title !== '個人頁面')
      } else {
         menu = menuList.filter((item) => item.title !== '註冊/登入')
      }
      setMenuContent(menu)
   }, [isLogin])

   useEffect(() => {
      showMenu()
   }, [showMenu])

   // todo 不知是否有優化空間
   function logout() {
      //執行登出功能
      dispatch({ type: 'member/setLogout', payload: false })
      navigate('/')
      //關閉下拉清單顯示
      setMemberMenu(false)
   }

   return (
      <HeaderContainer>
         <Logo />
         <Menu />
         <UserMenu isLogin={isLogin} setSearchMenu={setIsShowModal} setMenu={setMenu} />
         <Suspense fallback={null}>
            {modal.map((modal, index) => {
               return (
                  <Modal key={index} {...modal}>
                     {modal.children}
                  </Modal>
               )
            })}
         </Suspense>
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
         overflow: hidden;
         width: 70px;

         .name {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
         }

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
