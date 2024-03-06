import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setIsLogin } from '../store/memberSlice'
import Header from './Header/Header'
import styled from 'styled-components'
import { hotBg, vectorIcon, facebookIcon, lineIcon, googleIcon } from '../assets/images/index'
import Input from '../components/Input/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { auth, provider } from '../../firebase.config'
import { signInWithPopup } from 'firebase/auth'
import { normalLogin } from '../store/memberSlice'

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
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   //todo 調整 button 元件 props
   const [isLogin, setIsLogin] = useState(false)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const sendLoginRequest = async () => {
      try {
         const res = await axios.post(
            'https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/login',
            {
               username: username,
               password: password,
            },
         )
         //成功的話跳轉到後台
         if (res.data.status === 200) {
            alert('登入成功!')
            Dispatch(normalLogin({ username: username, password: password }))
            //todo 從資料庫取得使用者資料存入 redux
            // 等待3秒後跳轉到後台
            setTimeout(() => {
               navigate('/backstage')
            }, 3000)
         } else {
            alert('登入失敗!請檢查帳號密碼是否正確')
         }
      } catch (e) {
         console.log(e)
      }
   }
   const loginLine = () => {
      const channel_id = '2003812489'
      const homePage = 'https://2439-111-241-166-18.ngrok-free.app/?isLogin=true'
      const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channel_id}&redirect_uri=${homePage}&state=12345abcde&scope=profile&nonce=09876xyz`

      //登入成功後，將登入狀態改為 true ，並且存入 redux
      dispatch(setIsLogin(true))
      window.location.href = lineLoginUrl
      //將登入成功存入 cookie
      document.cookie = 'isLogin=true'
   }
   const loginGoogle = async () => {
      try {
         const result = await signInWithPopup(auth, provider)
         const user = result.user
         console.log(user)
         // todo 增加成員的處理
         navigate('/')
      } catch (e) {
         console.log(e)
      }
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
                  <Input
                     setValue={setUsername}
                     size={'12px 16px'}
                     shape={'12px'}
                     placeholder={'4-21碼小寫英文.數字'}
                  />
               </div>
               <div className='flex flex-col'>
                  <label htmlFor='password' className='mb-2 font-medium'>
                     密碼
                  </label>
                  <Input
                     setValue={setPassword}
                     type={'password'}
                     size={'12px 16px'}
                     shape={'12px'}
                     placeholder={'6-18位數密碼,請區分大小寫'}
                  />
               </div>
               <Link to='/forget-password' className='text-end text-[#A9622A] cursor-pointer'>
                  忘記密碼？
               </Link>
               {/* <Button setClick={setIsLogin} className=' mb-8' content={'登入'} /> */}
               <button type='button' onClick={sendLoginRequest}>
                  登入
               </button>
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
                  <StyledImageBox onClick={loginGoogle}>
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
