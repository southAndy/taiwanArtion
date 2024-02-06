import { useState } from 'react'
import { Link } from 'react-router-dom'
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
               <Link>附近展覽</Link>
               <Link>所有展覽</Link>
               <Link to={'/login'}>註冊/登入</Link>
            </div>
         </Modal>
      </HeaderContainer>
   )
}

export default Header
