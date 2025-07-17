import React from 'react'
import { useState, useEffect } from 'react'
import StyledInput from '../../components/StyledInput'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { warnIcon } from '../../assets/images'
import styled from '@emotion/styled'
import BaseImageBox from '../../styles/base/BaseImageBox'

const thirdStep = ({ setStepStatus }) => {
   const [isCanSent, setCanSent] = useState(false)
   const [countdown, setCountdown] = useState(60)
   const [userEmail, setUserEmail] = useState('')
   const schema = yup.object().shape({
      email: yup.string().email('請輸入有效的信箱格式').required('此欄位為必填'),
   })
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(schema),
      mode: 'all',
   })
   //倒數計時
   useEffect(() => {
      let timer
      if (countdown > 0) {
         timer = setTimeout(() => {
            setCountdown(countdown - 1)
         }, 1000)
      }
      return () => {
         clearTimeout(timer)
      }
   }, [countdown])
   //發送驗證碼
   useEffect(() => {
      if (countdown === 0) {
         setCanSent(true)
         setCountdown(60)
      }
   }, [countdown])
   useEffect(() => {
      if (isCanSent) {
         setStepStatus((n) => {
            const newState = [...n]
            newState[2] = true
            return newState
         })
      }
   }, [isCanSent])
   return (
      <>
         <p className='mb-6 text-sm'>為了確保是你本人，我們將會寄送一封驗證信件到你的電子信箱。</p>
         <h3 className='mb-5 font-medium'>電子信箱</h3>
         <StyledValidateBox className='flex gap-2'>
            <StyledInput
               placeholder='請輸入電子信箱'
               {...register('email')}
               onChange={(e) => {
                  setUserEmail(e.target.value)
               }}
            />
            <Button content={'送出驗證'} disabled={errors.email} setClick={setCanSent} />
         </StyledValidateBox>
         <div className=''>
            {errors.email ? (
               <StyledErrorBox>
                  <BaseImageBox width={'20px'} height={'20px'}>
                     <img src={warnIcon} alt='' />
                  </BaseImageBox>
                  <span className='text-[#D31C1C]'>{errors.email?.message}</span>
               </StyledErrorBox>
            ) : (
               ''
            )}
         </div>
      </>
   )
}

const StyledValidateBox = styled.div`
   display: flex;
   gap: 8px;
`

const StyledErrorBox = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-top: 8px;
`

export default thirdStep
