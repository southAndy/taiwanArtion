import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Step, Stepper, StepLabel } from '@mui/material'
import FirstStep from '@container/Register/FirstStep'
import SecondStep from '@container/Register/SecondStep'
import SuccessStep from '@container/Register/SuccessStep'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase.config'

const RegisterFlow = ({ onSuccess }) => {
  const [step, setStep] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  const stepContent = ['手機驗證', '帳密信箱', '完成註冊']

  const handleStepChange = (newStep) => {
    setStep(newStep)
  }

  const handleUserInfoChange = (info) => {
    setUserInfo(prevInfo => ({ ...prevInfo, ...info }))
  }

  const storeUserInfo = async () => {
    try {
      await addDoc(collection(db, 'users'), userInfo)
    } catch (e) {
      console.error('儲存使用者資訊失敗:', e)
    }
  }

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <FirstStep
            setStep={handleStepChange}
            setUserInfo={handleUserInfoChange}
          />
        )
      case 1:
        return (
          <SecondStep
            setStep={handleStepChange}
            setUserInfo={handleUserInfoChange}
          />
        )
      case 2:
        return (
          <StyledSuccessWrapper>
            <SuccessStep
              setStep={handleStepChange}
              setUserInfo={handleUserInfoChange}
            />
          </StyledSuccessWrapper>
        )
      default:
        return null
    }
  }

  React.useEffect(() => {
    if (step === 2) {
      storeUserInfo()
      // 註冊成功後，可以選擇性地關閉彈窗
      // 這裡暫時不自動關閉，讓使用者看到成功訊息
    }
  }, [step])

  return (
    <StyledRegisterFlow>
      {step < 2 && (
        <StyledStepperContainer>
          <Stepper activeStep={step} alternativeLabel>
            {stepContent.map((label, index) => (
              <Step key={label}>
                <StepLabel className="text-[#A9622A] font-bold">
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </StyledStepperContainer>
      )}
      
      <StyledContent>
        {renderContent()}
      </StyledContent>
    </StyledRegisterFlow>
  )
}

const StyledRegisterFlow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledStepperContainer = styled.div`
  padding: 0 8px;
  
  .MuiStepLabel-root {
    .MuiStepLabel-label {
      color: #A9622A;
      font-weight: 600;
      
      &.Mui-active {
        color: #A9622A;
      }
      
      &.Mui-completed {
        color: #A9622A;
      }
    }
  }
  
  .MuiStepIcon-root {
    color: #e0e0e0;
    
    &.Mui-active {
      color: #A9622A;
    }
    
    &.Mui-completed {
      color: #A9622A;
    }
  }
`

const StyledContent = styled.div`
  min-height: 300px;
  
  // 調整內部 form 的 padding，因為彈窗已有 padding
  form {
    padding: 0;
  }
`

const StyledSuccessWrapper = styled.div`
  // 移除 SuccessStep 的 height: 100vh 影響
  .MuiStepIcon-root {
    height: auto;
  }
`

export default RegisterFlow