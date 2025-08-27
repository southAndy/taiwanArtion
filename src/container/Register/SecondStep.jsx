import React, { useState, useEffect } from 'react'
import BaseImageBox from '../../styles/base/BaseImageBox'
import Button from '@/components/atoms/Button/Button'
import Input from '@/components/atoms/Input/Input'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {
  registerInfoIcon,
  uncheckIcon,
  warnIcon,
  checkIcon,
  passwordHideIcon,
  passwordShowIcon,
} from '../../assets/images'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../../../firebase.config.js'
import { useDispatch } from 'react-redux'

const secondStep = ({ setStep, setUserInfo }) => {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [score, setScore] = useState(0)
  const [matchTips, setMatchTips] = useState([false, false, false, false])
  const dispatch = useDispatch()

  const ruleList = [
    '至少包含一個小寫字母',
    '至少包含一個大寫字母',
    '長度為 8-16位英、數字',
    '加入至少一個特殊標點符號',
  ]
  const schema = yup.object().shape({
    // account: yup
    //    .string()
    //    .required('此欄位為必填')
    //    .min(4, '帳號長度不足')
    //    .max(21, '帳號長度太長')
    //    .test('test', '帳號格式錯誤', (value) => {
    //       //不能輸入特殊符號
    //       return !value.match(/[^a-zA-Z0-9]/)
    //    }),
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
    email: yup.string().email('請輸入有效的信箱格式').required('此欄位為必填'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema), // 使用 yup 進行欄位驗證
    mode: 'onBlur', // 欄位驗證時機
  })

  async function getUserInfo(uid) {
    try {
      const userDatas = doc(db, 'users', uid)
      const docSnap = await getDoc(userDatas)
      dispatch({ type: 'user/setUserInfo', payload: docSnap.data() })
    } catch (e) {}
  }

  async function actions(data) {
    try {
      // 使用信箱驗證
      const userCredit = await createUserWithEmailAndPassword(auth, data.email, data.password)

      // 將使用者資料存入 firestore
      await setDoc(doc(db, 'users', userCredit.user.uid), {
        email: data.email,
        uid: userCredit.user.uid,
        photoIndex: 0, // 預設大頭貼為第一張
        interests: [], // 興趣標籤
        favorite: [], // 收藏展覽
      })

      // 從 Firestore 取得使用者資料並存入 Redux (推薦做法)
      await getUserInfo(userCredit.user.uid)

      // Firebase Auth 會自動管理登入狀態，不需要手動設置 cookie
      dispatch({ type: 'user/setIsLogin', payload: true })
      // 跳轉到下一步
      setStep(n => n + 1)
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: '此信箱已被註冊',
      })
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit(actions)} className="flex flex-col gap-4 mb-10">
        {/* <div className='flex flex-col'>
               <label htmlFor='email' className='font-medium mb-2 text-[#453434]'>
                  帳號
               </label>
               <StyledInput
                  {...register('account', { required: '帳號必填' })}
                  size={'12px 16px'}
                  shape={'12px'}
                  placeholder={'設定 4-21 碼小寫小寫英文、數字'}
                  onChange={(e) => {
                     try {
                        setAccount(e.target.value)
                     } catch (err) {
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
            </div> */}
        <div>
          <label htmlFor="">電子郵件</label>
          <Input
            placeholder="請輸入電子信箱"
            {...register('email')}
            formState={errors.email ? 'error' : 'normal'}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email ? (
            <StyledErrorBox>
              <BaseImageBox width={'20px'} height={'20px'}>
                <img src={warnIcon} alt="" />
              </BaseImageBox>
              <span className="text-[#D31C1C]">{errors.email?.message}</span>
            </StyledErrorBox>
          ) : (
            ''
          )}
        </div>
        <div className="password flex flex-col">
          <label htmlFor="password" className="mb-2 font-medium text-[#453434]">
            密碼
          </label>
          <div className="password-input">
            <Input
              {...register('password', { required: '密碼必填' })}
              type={isShowPassword ? 'text' : 'password'}
              size={'12px 16px'}
              shape={'12px'}
              placeholder={'6-18位數密碼,請區分大小寫'}
              formState={errors.password ? 'error' : 'normal'}
              onChange={e => {
                setPassword(e.target.value)
              }}
            />
            <BaseImageBox
              width={'24px'}
              height={'24px'}
              className="password-show"
              onClick={() => setIsShowPassword(n => !n)}
            >
              <img src={isShowPassword ? passwordShowIcon : passwordHideIcon} alt="" />
            </BaseImageBox>
          </div>
          {password ? (
            <StyledTipBox>
              <ReminderContainer>
                <BaseImageBox width={'20px'} height={'20px'}>
                  <img src={registerInfoIcon} alt="" />
                </BaseImageBox>
                密碼提示
              </ReminderContainer>
              {ruleList.map((text, index) => (
                <StyledPasswordText key={text} matched={matchTips[index]}>
                  <BaseImageBox width={'16px'} height={'16px'}>
                    <img src={matchTips[index] ? checkIcon : uncheckIcon} alt="" />
                  </BaseImageBox>
                  {text}
                </StyledPasswordText>
              ))}
              {password.length > 0 ? (
                <div>
                  <div className="mt-4 text-[#453434]">密碼強度</div>
                  <StyledProgress value={score} max="100"></StyledProgress>
                </div>
              ) : (
                ''
              )}
            </StyledTipBox>
          ) : (
            ''
          )}
        </div>

        <Button
          buttonType={'submit'}
          disabled={!password || !email}
          margin={'40px 0 0 0'}
          height={'50px'}
        >
          下一步
        </Button>
      </StyledForm>
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
  margin-top: 4px; // 與密碼欄位的間距
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
  padding: 24px;

  .password {
    &-show {
      position: absolute;
      right: 2%;
      top: 25%;
      cursor: pointer;
    }
    &-input {
      position: relative;
    }
  }
`

const ReminderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  color: #453434;
`

const StyledPasswordText = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${props => (props.matched ? '#A9622A' : '#C2C2C2')};
  font-size: 14px;
`

export default secondStep
