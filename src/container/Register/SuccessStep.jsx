import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { successBg, sucessIcon } from '../../assets/images'
import styled from 'styled-components'

const Success = () => {
   useEffect(() => {
      // cookie 新增登入的狀態
      document.cookie = 'isLogin=true'
   }, [])
   return (
      <>
         <StyledBanner className=' bg-slate-200'>
            <div className='h-[200px] w-[390px]'>
               <img src={sucessIcon} alt='' />
            </div>
            <section className='content flex gap-2 flex-col justify-center items-center '>
               <h1 className='text-[#A9622A] font-bold text-xl'>註冊成功</h1>
               <p className='text-sm mb-10'>恭喜您,已完成註冊！</p>
               <StyledPersonalLink to={'/backstage'}>開始填寫個人檔案</StyledPersonalLink>
               <StyledHomeLink to={'/'}>回到首頁</StyledHomeLink>
            </section>
         </StyledBanner>
      </>
   )
}

const StyledPersonalLink = styled(Link)`
   display: block;
   color: #fff;
   width: 330px;

   text-align: center;
   background: #a9622a;
   padding: 8px 0;
   border-radius: 20px;
   font-weight: 700;
`
const StyledHomeLink = styled(Link)`
   display: block;
   width: 330px;
   text-align: center;
   background: #fff;
   color: #a9622a;
   border: 1px solid #a9622a;
   padding: 8px 0;
   border-radius: 20px;
   font-weight: 700;
`
const StyledBanner = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100vh;
   background-image: url(${successBg});
   background-size: contain;
   background-position: center;
   background-color: #fdfaef;

   .content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      h1 {
         color: #a9622a;
         font-weight: 600;
         font-size: 18px;
         text-align: center;
         margin: unset;
      }
      p {
         font-size: 14px;
         margin-bottom: 32px;
         text-align: center;
      }
   }
`

export default Success
