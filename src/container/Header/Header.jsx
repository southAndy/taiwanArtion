import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setIsLogin } from '../../store/memberSlice'
import { logoIcon, headerSearch, headerMenu } from '../../assets/images/index'
import styled from '@emotion/styled'
import Modal from '../../components/Modal'
import Menu from '../Menu/Menu'

const HeaderContainer = styled.header`
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 100vw;
   height: 80px;
   padding: 8px 20px;
   background: #ffffff;
   box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
`

const HeaderCategory = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 20px;
   cursor: pointer;
`

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
   const dispatch = useDispatch()
   const isLogin = useSelector((state) => state.member.isLogin)

   useEffect(() => {
      // 讀取 cookie，判斷是否登入
      const cookie = document.cookie
      // 拆出 isLogin 的值
      const arrayCookie = cookie.split(';')
      const cookieLogin = arrayCookie.find((item) => item.startsWith(' isLogin='))
      console.log(cookieLogin)
      if (cookieLogin) {
         const isLogin = Boolean(cookieLogin.split('=')[1])
         dispatch(setIsLogin(isLogin))
      } else {
         dispatch(setIsLogin(false))
      }
      //狀態存入 redux
      //todo 如果登入狀態改變，就刪減選單的顯示
      if (cookieLogin) {
         const loginMenu = menu.filter((item) => item.title !== '註冊/登入')
         setMenuContent(() => loginMenu)
      } else {
         const logoutMenu = menu.filter((item) => item.title !== '個人頁面')
         setMenuContent(() => logoutMenu)
      }
   }, [isLogin])

   return (
      <HeaderContainer>
         <Link className='h-[40px] w-[120px]' to='/'>
            <img src={logoIcon} alt='網站圖樣' />
         </Link>
         <HeaderCategory>
            <div className='w-[18px] h-[18px]' onClick={() => setIsShowModal((n) => !n)}>
               <img src={headerSearch} alt='搜尋圖樣' />
            </div>
            <div onClick={() => setMenu((n) => !n)}>
               <img className='w-[18px] h-[18px]' src={headerMenu} alt='選單圖樣' />
            </div>
         </HeaderCategory>
         <Modal isShow={isShowModal} setShow={setIsShowModal}>
            <Menu />
         </Modal>
         <Modal isShow={isShowMenu} setShow={setMenu}>
            <div className='flex flex-col items-center gap-6'>
               {menu.map((item, index) => (
                  <Link key={index} to={item.link} keys={index}>
                     {item.title}
                  </Link>
               ))}
            </div>
         </Modal>
      </HeaderContainer>
   )
}

export default Header
