import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Input from '../../components/Input/Input'
import Button from '../../components/Button'
import axios from 'axios'
const firstStep = () => {
   const [isSent, setSent] = useState(false)
   const [userPhone, setUserPhone] = useState(null)
   let content = '發送驗證碼'

   const showContent = () => {
      if (isSent) {
         return (
            <h3 className='text-medium mb-6 text-sm'>
               已發送手機驗證碼至{userPhone}手機,請輸入手機驗證碼並送出驗證。
            </h3>
         )
      } else {
         return (
            <p className='text-medium mb-6 text-sm'>
               為了確保是你本人，我們將會寄送一封驗證簡訊到你的手機。
            </p>
         )
      }
   }
   useEffect(() => {
      content = '已寄送驗證碼'
      console.log('isSent:', isSent)
      if (isSent) {
         console.log('送出手機號碼:')
         axios.post('https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/auth/phone', {
            phone: userPhone,
         })
      }
   }, [isSent])

   return (
      <>
         {showContent()}
         <h3 className='mb-5 font-bold text-lg'>手機驗證碼</h3>
         <section className='flex gap-2'>
            <Input
               size={'12px 16px'}
               shape={'12px'}
               placeholder={'請輸入手機號碼'}
               setValue={setUserPhone}
               className='flex-initial w-[70px]'
            />
            <Button
               content={content}
               isClick={isSent}
               setClick={setSent}
               className='flex-initial w-[30px]'
            />
         </section>
      </>
   )
}

export default firstStep
