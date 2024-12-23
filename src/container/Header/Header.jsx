import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogin } from '../../store/memberSlice'
import { logoIcon, headerSearch, headerMenu } from '../../assets/images/index'
import BaseLink from '../../styles/base/BaseLink'
import BaseImageBox from '../../styles/base/BaseImageBox'
import styled from '@emotion/styled'
import Modal from '../../components/Modal'
import Menu from '../Menu/Menu'
import { breakpoint } from '../../styles/utils/breakpoint'

const Header = () => {
   const [isShowModal, setIsShowModal] = useState(false)
   const [isShowMenu, setMenu] = useState(false)
   const [menu, setMenuContent] = useState([
      {
         title: '附近展覽',
         link: '/nearby',
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
   ])
   const isLogin = useSelector((state) => state.member.isLogin)

   // 判斷是否登入，改變選單內容
   useEffect(() => {
      if (!isLogin) {
         const loginMenu = menu.filter((item) => item.title !== '個人頁面')
         setMenuContent(() => loginMenu)
      } else {
         const logoutMenu = menu.filter((item) => item.title !== '註冊/登入')
         setMenuContent(() => logoutMenu)
      }
   }, [isLogin])

   return (
      <HeaderContainer>
         <BaseLink width={'120px'} height={'40px'} to='/'>
            <img src={logoIcon} alt='網站圖樣' />
         </BaseLink>
         <div className='menu'>
            {[
               {
                  title: '附近展覽',
                  link: '/nearby',
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
            <BaseImageBox width={'18px'} height={'18px'} onClick={() => setIsShowModal((n) => !n)}>
               <img src={headerSearch} alt='搜尋圖樣' />
            </BaseImageBox>
            <div className='menu-mobile' onClick={() => setMenu((n) => !n)}>
               <img className='w-[18px] h-[18px]' src={headerMenu} alt='選單圖樣' />
            </div>
            {/* todo 重做共用元件 */}
            <button className='login'>登入/註冊</button>
         </HeaderCategory>
         <Modal isShow={isShowModal} setShow={setIsShowModal}>
            <Menu />
         </Modal>
         <Modal isShow={isShowMenu} setShow={setMenu} position={{ t: '1%' }} height={'210px'}>
            <StyldMenuBox>
               {menu.map((item, index) => (
                  <Link key={index} to={item.link} keys={index}>
                     {item.title}
                  </Link>
               ))}
            </StyldMenuBox>
         </Modal>
      </HeaderContainer>
   )
}

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
   margin-bottom: 56px; // 推開下方內容

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

export default Header
