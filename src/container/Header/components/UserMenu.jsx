import React from 'react'
import { memo } from 'react'
import styled from 'styled-components'
import { breakpoint } from '../../../styles/utils/breakpoint'
import { headerSearch, headerMenu } from '../../../assets/images/index'
import BaseImageBox from '../../../styles/base/BaseImageBox'
import { useNavigate } from 'react-router-dom'

const UserMenu = memo(({ isLogin, setSearchMenu, setMenu }) => {
   const navigate = useNavigate()

   return (
      <>
         <HeaderCategory>
            <BaseImageBox width={'18px'} height={'18px'} onClick={() => setSearchMenu((n) => !n)}>
               <img src={headerSearch} alt='搜尋圖樣' />
            </BaseImageBox>
            <div className='menu-mobile' onClick={() => setMenu((n) => !n)}>
               <img className='w-[18px] h-[18px]' src={headerMenu} alt='選單圖樣' />
            </div>
            {isLogin ? (
               <StyledUserIcon onClick={() => setMemberMenu((n) => !n)}>
                  <img src={UserIcon[user.photoIndex]} alt='' />
               </StyledUserIcon>
            ) : (
               <button
                  className='login'
                  onClick={() => {
                     navigate('/account')
                  }}
               >
                  登入/註冊
               </button>
            )}
         </HeaderCategory>
      </>
   )
})

export default UserMenu

const HeaderCategory = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 20px;
   cursor: pointer;

   img {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

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
