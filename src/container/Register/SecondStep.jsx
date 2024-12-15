import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import StyledInput from '../../components/StyledInput'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { registerInfoIcon, uncheckIcon, warnIcon, checkIcon } from '../../assets/images'
import axios from 'axios'
import BaseImageBox from '../../styles/base/BaseImageBox'

const secondStep = ({ setStep, setUserInfo }) => {
   const [account, setAccount] = useState('')
   const [password, setPassword] = useState('')
   const [score, setScore] = useState(0)
   const [matchTips, setMatchTips] = useState([false, false, false, false])

   const ruleList = [
      '至少包含一個小寫字母',
      '至少包含一個大寫字母',
      '長度為 8-16位英、數字',
      '加入至少一個特殊標點符號',
   ]
   const schema = yup.object().shape({
      account: yup
         .string()
         .required('此欄位為必填')
         .min(4, '帳號長度不足')
         .test('test', '帳號格式錯誤', (value) => {
            //不能輸入特殊符號
            return !value.match(/[^a-zA-Z0-9]/)
         }),
      // todo
      // .test('帳號已存在', '此帳號已被使用', async (value, context) => {
      //    try {
      //       const res = await axios.post(
      //          'https://zhao-zhao-zhan-lan-hou-duan-ce-shi-fu-wu.onrender.com/auth/account',
      //          {
      //             account: value,
      //          },
      //       )
      //       if (!res.data.isExist) {
      //          // 手動使用 clearErrors 更新錯誤狀態
      //          clearErrors('account')
      //       }
      //       return res.data.isExist
      //    } catch (err) {
      //       console.log(err)
      //    }
      // }),
      password: yup
         .string()
         .required('此欄位為必填')
         .test('test', '不符合密碼強度', () => {
            let localScore = 0
            let localMatchTips = [false, false, false, false]
            setMatchTips(localMatchTips)
            //密碼至少包含一個小寫字母
            if (password.match(/[a-z]/)) {
               localScore += 25
               localMatchTips[0] = true
            }
            //密碼至少包含一個大寫字母
            if (password.match(/[A-Z]/)) {
               localScore += 25
               localMatchTips[1] = true
            }
            if (password.length >= 8 && password.length <= 16) {
               localScore += 25
               localMatchTips[2] = true
            }
            //加入至少一個特殊標點符號
            if (password.match(/[\W_]/)) {
               localScore += 25
               localMatchTips[3] = true
            }
            setScore(localScore)
            setMatchTips(localMatchTips)
            return localScore >= 100
         }),
      //非同步,
   })

   const {
      register,
      handleSubmit,
      formState: { errors },
      clearErrors,
   } = useForm({
      resolver: yupResolver(schema),
      mode: 'onBlur',
   })

   // 當帳密皆有輸入時且符合規則時，將按鈕設為可點擊
   // useEffect(() => {
   //    if (account && password && score === 100) {
   //       setStep((n) => {
   //          const newState = [...n]
   //          newState[1] = true
   //          return newState
   //       })
   //    } else {
   //       setStep((n) => {
   //          const newState = [...n]
   //          newState[1] = false
   //          return newState
   //       })
   //    }
   // }, [account, password, score])

   function actions() {
      setStep((n) => n + 1)
      setUserInfo((data) => {
         return { ...data, account: account, password: password }
      })
   }

   return (
      <>
         <StyledForm onSubmit={handleSubmit((data) => {})} className='flex flex-col gap-4 mb-10'>
            <div className='flex flex-col'>
               <label htmlFor='email' className='font-medium mb-2 text-[#453434]'>
                  帳號
               </label>
               <StyledInput
                  {...register('account', { required: '帳號必填' })}
                  size={'12px 16px'}
                  shape={'12px'}
                  placeholder={'4-21碼小寫英文.數字'}
                  onChange={(e) => {
                     try {
                        setAccount(e.target.value)
                     } catch (err) {
                        console.log(err)
                     }
                  }}
               />
               {errors.account ? (
                  <StyledErrorBox>
                     <BaseImageBox width={'20px'} height={'20px'}>
                        <img src={warnIcon} alt='' />
                     </BaseImageBox>
                     <span className='text-[#D31C1C]'>{errors.account?.message}</span>
                  </StyledErrorBox>
               ) : (
                  ''
               )}
            </div>
            <div className='flex flex-col'>
               <label htmlFor='password' className='mb-2 font-medium text-[#453434]'>
                  密碼
               </label>
               <StyledInput
                  {...register('password', { required: '密碼必填' })}
                  type={'password'}
                  setValue={setPassword}
                  size={'12px 16px'}
                  shape={'12px'}
                  placeholder={'6-18位數密碼,請區分大小寫'}
                  onChange={(e) => {
                     setPassword(e.target.value)
                  }}
               />
               <StyledErrorBox>
                  {errors.password ? (
                     <>
                        <BaseImageBox width={'20px'} height={'20px'}>
                           <img src={warnIcon} alt='是否符合密碼條件圖樣' />
                        </BaseImageBox>
                        <span className='text-[#D31C1C]'>{errors.password?.message}</span>
                     </>
                  ) : (
                     ''
                  )}
               </StyledErrorBox>
            </div>
         </StyledForm>
         <StyledTipBox>
            <ReminderContainer>
               <BaseImageBox width={'20px'} height={'20px'}>
                  <img src={registerInfoIcon} alt='' />
               </BaseImageBox>
               密碼提示
            </ReminderContainer>
            {ruleList.map((text, index) => (
               <StyledPasswordText key={text} matched={matchTips[index]}>
                  <BaseImageBox width={'16px'} height={'16px'}>
                     <img src={matchTips[index] ? checkIcon : uncheckIcon} alt='' />
                  </BaseImageBox>
                  {text}
               </StyledPasswordText>
            ))}
            {password.length > 0 ? (
               <div>
                  <div className='mt-4 text-[#453434]'>密碼強度</div>
                  <StyledProgress value={score} max='100'></StyledProgress>
               </div>
            ) : (
               ''
            )}
         </StyledTipBox>
         <Button
            actions={actions}
            disabled={
               errors.account?.message ||
               errors.password?.message ||
               account.length <= 4 ||
               password.length <= 6
            }
            content={'下一步'}
            margin={'40px 0 0 0'}
         >
            下一步
         </Button>
      </>
   )
}

const StyledErrorBox = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   margin-top: 4px;
`

const StyledTipBox = styled.section`
   display: flex;
   flex-direction: column;
   gap: 8px;
`
const StyledProgress = styled.progress`
   width: 100%;
   border-radius: 16px;
`

const StyledForm = styled.form`
   display: flex;
   flex-direction: column;
   gap: 16px;
   margin-bottom: 24px;
`

const ReminderContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 8px;
   font-weight: 700;
   margin-bottom: 8px;
   color: #453434;
`

const StyledPasswordText = styled.div`
   display: flex;
   gap: 8px;
   align-items: center;
   color: ${(props) => (props.matched ? '#A9622A' : '#C2C2C2')};
   font-size: 14px;
`

export default secondStep
