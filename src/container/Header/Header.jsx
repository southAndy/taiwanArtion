import { useState } from 'react'
import { Link } from 'react-router-dom'
import { logoIcon, searchIcon } from '../../assets/images/index'
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
`

const Header = () => {
   const [isShowModal, setIsShowModal] = useState(false)

   return (
      <HeaderContainer>
         <Link to='/'>
            <img src={logoIcon} alt='' />
         </Link>
         <HeaderCategory>
            <div onClick={() => setIsShowModal((n) => !n)}>
               <img src={searchIcon} alt='' />
            </div>
            <div>{/* <img src={} alt="" /> */}</div>
         </HeaderCategory>
         <Modal isShow={isShowModal} setShow={setIsShowModal}>
            <Menu />
         </Modal>
      </HeaderContainer>
   )
}

export default Header
