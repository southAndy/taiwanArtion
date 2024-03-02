import React from 'react'
import { useState, useEffect } from 'react'
import StyledInput from '../../components/StyledInput'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import axios from 'axios'

const firstStep = ({ setStatus }) => {
   const [isSent, setSent] = useState(false)
   const [countdown, setCountdown] = useState(10)
   const [userPhone, setUserPhone] = useState('')
   const [userCode, setUserCode] = useState('')
   let content = '發送驗證碼'
   const schema = yup.object().shape({
      userPhone: yup.string().required().max(10, '手機號碼長度不正確'),
      userCode: yup.string().required().max(6, '驗證碼長度不正確'),
   })
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })

   const showContent = () => {
      if (isSent) {
         return (
            <>
               <p className='text-medium mb-6 text-sm h-[40px]'>
                  已發送手機驗證碼至{userPhone}手機,請輸入手機驗證碼並送出驗證。
               </p>
               <h3 className='mb-5 font-bold text-lg'>{content}</h3>
               <form className='flex gap-2' onSubmit={handleSubmit()}>
                  <StyledInput
                     {...register('userCode')}
                     size={'12px 16px'}
                     shape={'12px'}
                     placeholder={'請輸入驗證碼'}
                     onChange={(e) => {
                        setUserCode(e.target.value)
                        setStatus((n) => [true, ...n.slice(1)])
                        handleSubmit()
                     }}
                     value={userCode}
                  />
                  <Button
                     content={`${countdown}秒後重新發送`}
                     setClick={setSent}
                     disabled={countdown !== 0}
                  />
               </form>
            </>
         )
      } else {
         return (
            <>
               <p className='text-medium mb-6 text-sm h-[40px]'>
                  為了確保是你本人，我們將會寄送一封驗證簡訊到你的手機。
               </p>
               <h3 className='mb-5 font-bold text-lg'>手機號碼</h3>
               <form className='flex gap-2' onSubmit={handleSubmit((data) => data)}>
                  <StyledInput
                     {...register('userPhone')}
                     size={'12px 16px'}
                     shape={'12px'}
                     placeholder={'請輸入手機號碼'}
                     className='flex-initial w-[70px]'
                     onChange={(e) => {
                        setUserPhone(e.target.value)
                     }}
                     value={userPhone}
                  />
                  {errors.userPhone?.message}
                  <Button
                     content={content}
                     setClick={setSent}
                     disabled={userPhone.length !== 10}
                     className='flex-initial w-[30px]'
                  />
               </form>
            </>
         )
      }
   }

   useEffect(() => {
      content = '已寄送驗證碼'
      if (isSent) {
         console.log('sent')
         handleSubmit()
         //todo 加入手機驗證碼API
         // axios.post('https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/auth/phone', {
         //    phone: userPhone,
         // })
      }
   }, [isSent])
   // 重發驗證碼倒數計時
   useEffect(() => {
      if (!isSent) return
      if (countdown === 0) {
         setSent(false)
         setCountdown(10)
         return
      }
      const timer = setTimeout(() => {
         setCountdown((n) => n - 1)
      }, 1000)
      return () => clearTimeout(timer)
   }, [countdown, isSent])

   return <>{showContent()}</>
}

export default firstStep
