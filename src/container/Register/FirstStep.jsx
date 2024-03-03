import React from 'react'
import { useState, useEffect } from 'react'
import StyledInput from '../../components/StyledInput'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { warnIcon } from '../../assets/images'
// import axios from 'axios'

const firstStep = ({ setStatus }) => {
   const [isSent, setSent] = useState(false)
   const [countdown, setCountdown] = useState(60)
   const [userPhone, setUserPhone] = useState('')
   const [userCode, setUserCode] = useState('')
   let content = '發送驗證碼'
   const schema = yup.object().shape({
      userPhone: yup
         .string()
         .required('此欄位為必填')
         .length(10, '手機號碼長度不正確')
         .test('phone-rule', '請輸入正確的手機格式', (value) => {
            if (value) {
               console.log(value)
               return value.startsWith('09')
            } else {
               return false
            }
         }),
      userCode: yup.string().required().max(6, '驗證碼長度不正確'),
   })
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      mode: 'onBlur',
   })

   const showContent = () => {
      if (isSent) {
         return (
            <form onSubmit={handleSubmit()}>
               <p className='text-medium mb-6 text-sm h-[40px]'>
                  已發送手機驗證碼至{userPhone}手機,請輸入手機驗證碼並送出驗證。
               </p>
               <h3 className='mb-5 font-bold text-lg'>{content}</h3>
               <section className='flex gap-2' onSubmit={handleSubmit()}>
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
                     maxLength='6'
                  />
                  <Button
                     content={`${countdown}秒後重新發送`}
                     setClick={setSent}
                     disabled={countdown !== 0}
                  />
               </section>
            </form>
         )
      } else {
         return (
            <form onSubmit={handleSubmit()}>
               <p className='text-medium mb-6 text-sm h-[40px]'>
                  為了確保是你本人，我們將會寄送一封驗證簡訊到你的手機。
               </p>
               <h3 className='mb-5 font-bold text-lg'>手機號碼</h3>
               <section className='flex gap-2'>
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
                     maxLength='10'
                  />
                  <Button
                     content={content}
                     setClick={setSent}
                     disabled={errors.userPhone || userPhone.length !== 10}
                     className='flex-initial w-[30px]'
                  />
               </section>
               {errors.userPhone ? (
                  <div className='flex gap-1 mt-2'>
                     <div className='w-[20px] h-[20px]'>
                        <img src={warnIcon} alt='' />
                     </div>
                     <span className='text-[#D31C1C]'>{errors.userPhone?.message}</span>
                  </div>
               ) : (
                  ''
               )}
            </form>
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
