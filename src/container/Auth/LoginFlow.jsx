import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { login } from '@store/userSlice'
import Input from '@/components/atoms/Input/Input'
import Button from '@components/atoms/Button/Button'
import { warnIcon } from '@assets/images/index'
import BaseImageBox from '@styles/base/BaseImageBox'

const LoginFlow = ({ onSuccess }) => {
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const schema = yup.object().shape({
    email: yup.string().email('請輸入有效的信箱格式').required('此欄位為必填'),
    password: yup.string().required('此欄位為必填'),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const handleLogin = async data => {
    setIsLoading(true)
    try {
      const { email, password } = data
      await dispatch(login({ email, password })).unwrap()

      // 登入成功，顯示成功步驟
      setStep(1)

      // 1.5秒後關閉彈窗
      setTimeout(() => {
        onSuccess?.()
      }, 1500)
    } catch (error) {
      console.error('登入失敗:', error)
      setError('email', {
        type: 'manual',
        message: '帳號或密碼錯誤',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderLoginForm = () => (
    <StyledForm onSubmit={handleSubmit(handleLogin)}>
      <StyledInputGroup>
        <label htmlFor="email">電子郵件</label>
        <Input
          {...register('email')}
          placeholder="請輸入您的電子郵件"
          disabled={isLoading}
          formState={errors.email ? 'error' : 'normal'}
        />
        {errors.email && (
          <StyledErrorBox>
            <BaseImageBox width="20px" height="20px">
              <img src={warnIcon} alt="" />
            </BaseImageBox>
            <span>{errors.email.message}</span>
          </StyledErrorBox>
        )}
      </StyledInputGroup>

      <StyledInputGroup>
        <label htmlFor="password">密碼</label>
        <Input
          {...register('password')}
          type="password"
          placeholder="請輸入您的密碼"
          disabled={isLoading}
          formState={errors.password ? 'error' : 'normal'}
        />
        {errors.password && (
          <StyledErrorBox>
            <BaseImageBox width="20px" height="20px">
              <img src={warnIcon} alt="" />
            </BaseImageBox>
            <span>{errors.password.message}</span>
          </StyledErrorBox>
        )}
      </StyledInputGroup>

      <Button buttonType="submit" disabled={isLoading} height={'50px'}>
        {isLoading ? '登入中...' : '登入'}
      </Button>

      <StyledReminder>
        <span>忘記密碼？</span>
        <StyledLink>點此重設</StyledLink>
      </StyledReminder>
    </StyledForm>
  )

  const renderSuccessMessage = () => (
    <StyledSuccessContainer>
      <StyledSuccessIcon>✓</StyledSuccessIcon>
      <StyledSuccessTitle>登入成功！</StyledSuccessTitle>
      <StyledSuccessMessage>歡迎回來，正在為您跳轉...</StyledSuccessMessage>
    </StyledSuccessContainer>
  )

  return (
    <StyledLoginFlow>
      {step === 0 && renderLoginForm()}
      {step === 1 && renderSuccessMessage()}
    </StyledLoginFlow>
  )
}

const StyledLoginFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #453434;
  }
`

const StyledErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;

  span {
    color: #d31c1c;
    font-size: 14px;
  }
`

const StyledReminder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 14px;
  color: #666;
`

const StyledLink = styled.span`
  color: #a9622a;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
`

const StyledSuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`

const StyledSuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #4caf50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
`

const StyledSuccessTitle = styled.h3`
  color: #a9622a;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
`

const StyledSuccessMessage = styled.p`
  color: #666;
  font-size: 14px;
  margin: 0;
`

export default LoginFlow
