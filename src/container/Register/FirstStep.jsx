import React from 'react'
import { useState, useEffect } from 'react'
import Input from '@/components/atoms/Input/Input'
import Button from '@/components/atoms/Button/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { warnIcon } from '../../assets/images'
import styled from '@emotion/styled'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '../../../firebase.config'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { useDispatch } from 'react-redux'

const firstStep = ({ setStep, setUserInfo }) => {
  const dispatch = useDispatch()
  const [isSent, setSent] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [confirmResult, setConfirmResult] = useState('')
  let content = '寄送驗證碼'
  const schema = yup.object().shape({
    userPhone: yup
      .string()
      .required('此欄位為必填')
      .length(10, '手機號碼長度不正確')
      .test('phone-rule', '請輸入正確的手機格式', value => {
        // 手機號碼需以09開頭，且都是數字
        if (value.startsWith('09') && value.split('').every(n => !isNaN(n))) {
          return true
        } else {
          return false
        }
      }),
    userCode: yup.string().required('此欄位為必填').min(6, '驗證碼長度不正確'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  // use watch to get form values
  const userPhone = watch('userPhone') || ''
  const userCode = watch('userCode') || ''

  function setupRecapVerifier() {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recap', {
      size: 'invisible',
      callback: response => {
        const totalPhone = '+886' + userPhone
      },
    })
  }
  async function sendVerifySMS() {
    try {
      const totalPhone = '+886' + userPhone
      const appVerifier = window.recaptchaVerifier
      const res = await signInWithPhoneNumber(auth, totalPhone, appVerifier)
      setSent(true) // 設置為已發送
      setConfirmResult(res)
    } catch (error) {}
  }

  async function verifySMSCode() {
    const result = await confirmResult.confirm(userCode)
    // 驗證成功後立即登出，避免進入登入狀態
    await auth.signOut()

    // 強制重置 Redux 狀態
    dispatch({ type: 'user/setIsLogin', payload: false })
    dispatch({ type: 'user/setUserInfo', payload: {} })

    return result
  }

  async function actions() {
    try {
      // 驗證手機驗證碼
      await verifySMSCode()
      // 進入下一步
      setStep(n => n + 1)

      // 將手機號碼存入 userInfo
      setUserInfo(state => {
        return { ...state, phone: userPhone }
      })
    } catch (error) {
      // 如果錯誤，顯示錯誤訊息在 userCode 欄位
      setError('userCode', {
        type: 'manual',
        message: '手機驗證碼錯誤',
      })
    }
  }

  useEffect(() => {
    //進入這個頁面就產生驗證實例
    setupRecapVerifier()
    return () => {
      //卸載元件時清理
      window.recaptchaVerifier = null
    }
  }, [])

  useEffect(() => {
    if (isSent) sendVerifySMS()
  }, [isSent])

  // 重置表單狀態，避免欄位值互相影響
  useEffect(() => {
    if (isSent) {
      // 只保留 userPhone，清空 userCode 和所有錯誤狀態
      reset(
        { userPhone: userPhone, userCode: '' },
        {
          keepErrors: false, // 清空所有錯誤
          keepDirty: false, // 清空 dirty 狀態
          keepTouched: false, // 清空 touched 狀態
        }
      )
    }
  }, [isSent, userPhone, reset])

  const showContent = () => {
    if (isSent) {
      return (
        <>
          <StyledForm onSubmit={handleSubmit()}>
            <div id="recap"></div>
            <p className="text-medium mb-6 text-sm h-[40px]">
              已發送手機驗證碼至{`${userPhone.slice(0, 5)}****`}
              手機,請輸入手機驗證碼並送出驗證。
            </p>
            <h3 id="test-re" className="mb-5 font-bold text-lg">
              {content}
            </h3>
            <ProgressBox className="flex gap-2">
              <Input
                {...register('userCode')}
                size={'12px 16px'}
                shape={'12px'}
                placeholder={'請輸入驗證碼'}
                maxLength="6"
              />
              <Button actions={setSent} disabled={countdown !== 0} height={'50px'}>
                {countdown !== 0 ? `${countdown}秒後重新發送` : '發送驗證碼'}
              </Button>
            </ProgressBox>
            {errors.userCode ? (
              <StyledErroBox className="flex gap-1 mt-2">
                <BaseImageBox width={'20px'} height={'20px'}>
                  <img src={warnIcon} alt="" />
                </BaseImageBox>
                <span className="text-[#D31C1C]">{errors.userCode?.message}</span>
              </StyledErroBox>
            ) : (
              ''
            )}
          </StyledForm>
          <StyledButtonBox>
            <Button
              actions={actions}
              disabled={errors.userCode?.message || userCode.length === 0}
              margin={'40px 0 0 0'}
              height={'50px'}
            >
              下一步
            </Button>
          </StyledButtonBox>
        </>
      )
    } else {
      return (
        <>
          <StyledForm onSubmit={handleSubmit()}>
            <div id="recap"></div>
            <p className="text-medium mb-6 text-sm h-[40px]">
              為了確保是你本人，我們將會寄送一封驗證簡訊到你的手機。
            </p>
            <h3 className="mb-5 font-bold text-lg">手機號碼</h3>
            <ProgressBox className="flex gap-2">
              <Input
                {...register('userPhone')}
                formState={errors.userPhone ? 'error' : 'default'}
                size={'12px 16px'}
                shape={'12px'}
                placeholder={'請輸入手機號碼'}
                maxLength="10"
              />
              <Button
                actions={setSent}
                disabled={errors.userPhone || userPhone.length !== 10}
                className="flex-initial w-[30px]"
                height={'50px'}
              >
                {content}
              </Button>
            </ProgressBox>
            {errors.userPhone ? (
              <StyledErroBox>
                <BaseImageBox width={'20px'} height={'20px'}>
                  <img src={warnIcon} alt="" />
                </BaseImageBox>
                <span className="text-[#D31C1C]">{errors.userPhone?.message}</span>
              </StyledErroBox>
            ) : (
              ''
            )}
          </StyledForm>
        </>
      )
    }
  }

  // 重發驗證碼倒數計時
  useEffect(() => {
    if (!isSent) return
    if (countdown === 0) {
      setSent(false)
      setCountdown(60)
      return
    }
    const timer = setTimeout(() => {
      setCountdown(n => n - 1)
    }, 1000)
    return () => clearTimeout(timer)
  }, [countdown, isSent])

  return <>{showContent()}</>
}

const StyledForm = styled.form`
  padding: 24px;
`

const ProgressBox = styled.div`
  display: flex;
  gap: 8px;
`
const StyledErroBox = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 8px;
`
const StyledButtonBox = styled.div`
  padding: 0 24px;
`

export default firstStep
