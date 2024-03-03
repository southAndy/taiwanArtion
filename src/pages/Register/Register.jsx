import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { hotBg, vectorIcon, facebookIcon, lineIcon, googleIcon } from '../../assets/images/index'
import { Link, Router } from 'react-router-dom'
import Header from '../../container/Header/Header'
import FirstStep from '../../container/Register/FirstStep'
import Button from '../../components/Button'
import SecondStep from '../../container/Register/SecondStep'
import ThirdStep from '../../container/Register/ThirdStep'
import FinishStep from '../../container/Register/FinishStep'
import { Step, Stepper, StepLabel } from '@mui/material'
//todo 共用樣式
const StyledLoginBanner = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: start;
   gap: 20px;
   padding: 20px;
   background-image: url(${hotBg});
`

const StyledTitle = styled.h3`
   font-size: 18px;
   font-weight: 700;
`

const StyledContent = styled.section`
   border-radius: 16px;
   padding: 24px;
`

const Register = () => {
   const [step, setStep] = useState(0)
   const stepContent = ['手機驗證', '帳號密碼', '信箱驗證', '完成註冊']
   const [isClick, setClick] = useState(false)
   const steps = [FirstStep, SecondStep, ThirdStep, FinishStep]
   const [stepStatus, setStepStatus] = useState([false, false, false, false])
   const navigate = useNavigate()
   function renderSteps() {
      return (
         <>
            {renderContent()}
            <Button
               setClick={setClick}
               disabled={stepStatus[step] !== true}
               content={'下一步'}
               margin={'40px 0 0 0'}
            >
               下一步
            </Button>
         </>
      )
   }

   const handlePrevStep = () => {
      if (step === 0) {
         navigate('/account')
      } else {
         setStep((n) => n - 1)
         // 將上一步的狀態改為false
         setStepStatus((n) => {
            const newState = [...n]
            newState[step - 1] = false
            return newState
         })
      }
   }
   const handleNextStep = () => {
      setStep((n) => n + 1)
   }
   const renderContent = () => {
      switch (step) {
         case 1:
            return <SecondStep setStatus={setStepStatus} />
         case 2:
            return <ThirdStep />
         case 3:
            return <FinishStep />
         default:
            return <FirstStep setStatus={setStepStatus} />
      }
   }
   useEffect(() => {
      if (isClick) {
         if (step === 3) {
            return
         }
         handleNextStep()
         setClick(false)
      }
   }, [isClick])

   return (
      <>
         <Header />
         <StyledLoginBanner>
            <div className='flex items-center justify-center'>
               <div
                  className='w-[18px] h-[10px] absolute left-4 cursor-pointer'
                  onClick={handlePrevStep}
               >
                  <img src={vectorIcon} alt='回到上一頁箭頭' />
               </div>
               <StyledTitle className='text-md text-[#535353]'>會員註冊</StyledTitle>
            </div>
            <Stepper activeStep={step} alternativeLabel>
               {stepContent.map((label) => (
                  <Step key={label}>
                     <StepLabel className='text-[#A9622A] font-bold'>{label}</StepLabel>
                  </Step>
               ))}
            </Stepper>
         </StyledLoginBanner>
         <StyledContent>{renderSteps()}</StyledContent>
      </>
   )
}

export default Register
