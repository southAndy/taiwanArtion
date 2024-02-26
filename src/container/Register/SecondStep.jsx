import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerInfoIcon, uncheckIcon } from '../../assets/images'
const secondStep = () => {
   const ruleList = [
      '至少一個小寫字母',
      '至少一個大寫字母',
      '8-16位英.數字',
      '僅能使用英文.數字或特殊標點符號',
   ]
   const schema = yup.object().shape({
      account: yup.string().required(),
      password: yup.string().required(),
   })
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
   })
   return (
      <>
         <form
            onSubmit={handleSubmit((data) => {
               console.log(data)
            })}
            className='flex flex-col gap-4 mb-10'
         >
            <div className='flex flex-col'>
               <label htmlFor='email' className='font-medium mb-2'>
                  帳號
               </label>
               <Input
                  {...register('account', { required: '帳號必填' })}
                  size={'12px 16px'}
                  shape={'12px'}
                  placeholder={'4-21碼小寫英文.數字'}
               />
               <p className='text-red-500'>{errors?.account?.message}</p>
            </div>
            <div className='flex flex-col'>
               <label htmlFor='password' className='mb-2 font-medium'>
                  密碼
               </label>
               <Input
                  {...register('password', { required: '76' })}
                  size={'12px 16px'}
                  shape={'12px'}
                  placeholder={'6-18位數密碼,請區分大小寫'}
                  formState={'error'}
               />
               <p className='text-red-500'>{errors?.password?.message}</p>
            </div>

            <button type='submit'>click</button>
         </form>
         <section>
            <h3 className='flex gap-2 items-center font-bold mb-2'>
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
            {/* <div className='mt-4'>密碼強度</div> */}
         </section>
      </>
   )
}

export default secondStep
