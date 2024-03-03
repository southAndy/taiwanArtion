import React from 'react'
import Header from '../../container/Header/Header'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const Success = () => {
   useEffect(() => {
      // cookie 新增登入的狀態
      document.cookie = 'isLogin=true'
   }, [])
   return (
      <>
         <section className=' bg-slate-200'>
            <Header />
            <div>
               <img src='' alt='' />
            </div>
            <section className='flex gap-2 flex-col justify-center items-center h-[calc(100vh-80px)]'>
               <h1 className='text-[#A9622A] font-bold text-xl'>註冊成功</h1>
               <p className='text-sm mb-10'>恭喜您,已完成註冊！</p>
               <StyledPersonalLink to={'/backstage'}>開始填寫個人檔案</StyledPersonalLink>
               <StyledHomeLink to={'/'}>回到首頁</StyledHomeLink>
            </section>
         </section>
      </>
   )
}
export default Success
