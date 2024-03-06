import React from 'react'
import Header from '../../container/Header/Header'
import { backstageIcon } from '../../assets/images'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Backstage = () => {
   // 用 redux 取得 user 資料
   const user = useSelector((state) => state.member.memberInfo)
   console.log('讀取使用者資料', user)
   function handleLogout() {
      console.log('logout')
   }
   return (
      <>
         <Header />
         <h1>hi {'已登入會員'}</h1>
         <section className='flex flex-col items-center gap-3'>
            <div className='w-[50%] h-[100%] m-auto'>
               <img src={backstageIcon} alt='' />
            </div>
            <Link to='/'>開始探索</Link>
         </section>
         {/* <button className=' absolute right-5' onClick={handleLogout}>
            登出
         </button> */}
      </>
   )
}

export default Backstage
