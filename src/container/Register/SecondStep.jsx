import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import StyledInput from '../../components/StyledInput'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerInfoIcon, uncheckIcon, warnIcon } from '../../assets/images'
import axios from 'axios'

const secondStep = () => {
   const [account, setAccount] = useState('')
   const [password, setPassword] = useState('')
   const [score, setScore] = useState(0)
   const [matchTips, setMatchTips] = useState([false, false, false, false])

   const ruleList = [
      '至少包含一個小寫字母',
      '至少包含一個大寫字母',
      '長度為 8-16位英.數字',
      '加入至少一個特殊標點符號',
   ]
   const schema = yup.object().shape({
      account: yup.string().required(),
      password: yup
         .string()
         .required()
         .test('test', '不符合密碼強度', () => {
            setScore(0)
            //密碼至少包含一個小寫字母
            if (password.match(/[a-z]/)) {
               setScore((n) => n + 25)
               //修改 matchTips index0 的值
               setMatchTips((prev) => {
                  const newTips = [...prev]
                  newTips[0] = true
                  return newTips
               })
            }
            //密碼至少包含一個大寫字母
            if (password.match(/[A-Z]/)) {
               setScore((n) => n + 25)
               //修改 matchTips index1 的值
               // setMatchTips((prev) => {
               //    const newTips = [...prev]
               //    newTips[1] = true
               //    return newTips
               // })
            }
            if (password.length >= 8 && password.length <= 16) {
               setScore((n) => n + 25)
               //修改 matchTips index2 的值
               // setMatchTips((prev) => {
               //    const newTips = [...prev]
               //    newTips[2] = true
               //    return newTips
               // })
            }
            //加入至少一個特殊標點符號
            if (password.match(/[\W_]/)) {
               setScore((n) => n + 25)
               //修改 matchTips index3 的值
               // setMatchTips((prev) => {
               //    const newTips = [...prev]
               //    newTips[3] = true
               //    return newTips
               // })
            }
            return score >= 100
         }),
   })
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      mode: 'all',
   })

   return (
      <>
         <form onSubmit={handleSubmit((data) => {})} className='flex flex-col gap-4 mb-10'>
            <div className='flex flex-col'>
               <label htmlFor='email' className='font-medium mb-2 text-[#453434]'>
                  帳號
               </label>
               <StyledInput
                  {...register('account', { required: '帳號必填' })}
                  size={'12px 16px'}
                  shape={'12px'}
                  placeholder={'4-21碼小寫英文.數字'}
                  onChange={(e) => setAccount(e.target.value)}
               />
               {errors.account ? (
                  <div className='flex gap-1 mt-2'>
                     <div className='w-[20px] h-[20px]'>
                        <img src={warnIcon} alt='' />
                     </div>
                     <span className='text-[#D31C1C]'>{errors.account?.message}</span>
                  </div>
               ) : (
                  ''
               )}
            </div>
            <div className='flex flex-col'>
               <label htmlFor='password' className='mb-2 font-medium text-[#453434]'>
                  密碼
               </label>
               <StyledInput
                  {...register('password', { required: '76' })}
                  setValue={setPassword}
                  size={'12px 16px'}
                  shape={'12px'}
                  placeholder={'6-18位數密碼,請區分大小寫'}
                  onChange={(e) => setPassword(e.target.value)}
               />
               {errors.password ? (
                  <div className='flex gap-1 mt-2'>
                     <div className='w-[20px] h-[20px]'>
                        <img src={warnIcon} alt='' />
                     </div>
                     <span className='text-[#D31C1C]'>{errors.password?.message}</span>
                  </div>
               ) : (
                  ''
               )}
            </div>
         </form>
         <section>
            <h3 className='flex gap-2 items-center font-bold mb-2 text-[#453434]'>
               <div className='w-[20px] h-[20px]'>
                  <img src={registerInfoIcon} alt='' />
               </div>
               密碼提示
            </h3>
            {ruleList.map((text, index) => (
               <div className='flex gap-2 items-center text-[#C2C2C2]' key={text}>
                  <div className='w-[20px] h-[20px]'>
                     <img src={uncheckIcon} alt='' />
                  </div>
                  {text}
               </div>
            ))}
            <div>
               <div className='mt-4 text-[#453434]'>密碼強度</div>
               <progress id='score' className='w-[100%]' value={score} max='100'></progress>
            </div>
         </section>
      </>
   )
}

export default secondStep
