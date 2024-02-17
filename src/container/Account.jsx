import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { loginBannerMobile, facebookIcon, lineIcon, googleIcon } from '../assets/images/index'
import Header from './Header/Header'
import styled from 'styled-components'

const StyledImageBox = styled.div`
   height: 40px;
   width: 40px;
`
const StyledLoginTitle = styled.h2`
   color: #be8152;
   font-size: 18px;
   font-weight: 500;
`
const StyledLoginLink = styled(Link)`
   border: 2px solid #a9622a;
   border-radius: 20px;
   padding: 16px;
   &:hover {
      background: #a9622a;
      color: #fff;
   }
`
//todo 加入字體

const LoginPage = () => {
   const navigate = useNavigate()

   return (
      <>
         <Header />
         <section>
            <div className='max-h-[220px] h-[200px] w-[100%]'>
               <img src={loginBannerMobile} alt='' />
            </div>
            <div className='p-6 '>
               <StyledLoginTitle>歡迎來到早找展覽</StyledLoginTitle>
               <p className='text-[14px] mt-1'>開始探索下一段展覽之旅吧！</p>
               <div className='login flex flex-col gap-2 mt-10'>
                  <StyledLoginLink to={'/login'}>登入</StyledLoginLink>
                  <StyledLoginLink to={'/register'}>註冊</StyledLoginLink>
               </div>
               <div className='third mt-4 flex flex-col justify-center items-center'>
                  <p className='mb-4'>或者使用以下帳號登入/註冊</p>
                  <div className='flex justify-center items-center gap-6'>
                     <StyledImageBox>
                        <img src={facebookIcon} alt='臉書圖示' />
                     </StyledImageBox>
                     <StyledImageBox>
                        <img src={googleIcon} alt='谷歌圖示' />
                     </StyledImageBox>
                     <StyledImageBox>
                        <img src={lineIcon} alt='Line圖示' />
                     </StyledImageBox>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
export default LoginPage
