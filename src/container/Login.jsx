import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header/Header'
import styled from 'styled-components'
import { hotBg, vectorIcon, facebookIcon, lineIcon, googleIcon } from '../assets/images/index'
import Input from '../components/Input/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'

const StyledLoginBanner = styled.section`
   display: flex;
   align-items: center;
   justify-content: start;
   gap: 90px;
   padding: 20px;
   background-image: url(${hotBg});
   height: 100px;
`
const StyledTitle = styled.h3`
   font-size: 18px;
   font-weight: 700;
`
const StyledContent = styled.section`
   border-radius: 16px;
   padding: 24px;
`
const StyledImageBox = styled.div`
   cursor: pointer;
   height: 40px;
   width: 40px;
`

const Login = () => {
   const navigate = useNavigate()
   const sendLoginRequest = () => {
      console.log('sendLoginRequest')
      const username = 'admin'
      const password = 'admin2'
      try {
         // axios.post('https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/login', {
         //    username: 'admin',
         //    password: 'admin',
         // })
         //成功的話跳轉到後台
         if (username === 'admin' && password === 'admin') {
            //todo  登入狀態改為 true ，並且存入 redux

            navigate(`/backstage/${username}`)
         } else {
            //失敗的話顯示錯誤訊息
            alert('帳號或密碼錯誤')
         }
      } catch (e) {
         console.log(e)
      }
   }
   const loginLine = () => {
      const channel_id = '2003688268'
      const homePage = 'https://64b0-223-137-89-96.ngrok-free.app/'
      const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channel_id}&redirect_uri=${homePage}&state=12345abcde&scope=profile&nonce=09876xyz`
      window.location.href = lineLoginUrl
   }
   return (
      <>
         <Header />
         <StyledLoginBanner>
            <Link to='/account' className='w-[18px] h-[10px]'>
               <img src={vectorIcon} alt='回到上一頁箭頭' />
            </Link>
            <StyledTitle className='text-md'>會員登入</StyledTitle>
         </StyledLoginBanner>
         <StyledContent>
            <form className='flex flex-col gap-4 mb-10'>
               <div className='flex flex-col'>
                  <label htmlFor='email' className='font-medium mb-2'>
                     帳號
                  </label>
                  <Input size={'12px 16px'} shape={'12px'} placeholder={'4-21碼小寫英文.數字'} />
               </div>
               <div className='flex flex-col'>
                  <label htmlFor='password' className='mb-2 font-medium'>
                     密碼
                  </label>
                  <Input
                     size={'12px 16px'}
                     shape={'12px'}
                     placeholder={'6-18位數密碼,請區分大小寫'}
                  />
               </div>
               <Link to='/forget-password' className='text-end text-[#A9622A] cursor-pointer'>
                  忘記密碼？
               </Link>
               {/* <button type='button' onClick={sendLoginRequest}>
                  登入
               </button> */}
               <Button className=' mb-8' content={'登入'} />
            </form>
            <section className='flex flex-col items-center gap-4 '>
               <div>
                  <span>還不是會員？</span>
                  <Link to='/register' className='text-[#A9622A]'>
                     註冊帳號
                  </Link>
               </div>
               <p className=' cursor-pointer'>或者使用以下方式登入</p>
               <div className='flex gap-6'>
                  <StyledImageBox>
                     <img src={facebookIcon} alt='' />
                  </StyledImageBox>
                  <StyledImageBox>
                     <img src={googleIcon} alt='' />
                  </StyledImageBox>
                  <StyledImageBox onClick={loginLine}>
                     <img src={lineIcon} alt='' />
                  </StyledImageBox>
               </div>
            </section>
         </StyledContent>
      </>
   )
}

export default Login