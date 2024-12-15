import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { hotBg, vectorIcon, facebookIcon, lineIcon, googleIcon } from '../../assets/images/index'
import { Link, Router } from 'react-router-dom'
import { PositionElement } from '../../styles/base/PositionElement'
import Header from '../../container/Header/Header'
import FirstStep from '../../container/Register/FirstStep'
import Button from '../../components/Button'
import SecondStep from '../../container/Register/SecondStep'
import ThirdStep from '../../container/Register/ThirdStep'
import FinishStep from '../../container/Register/FinishStep'
import { Step, Stepper, StepLabel } from '@mui/material'

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
            {/* <Button
               setClick={setClick}
               disabled={stepStatus[step] !== true}
               content={'下一步'}
               margin={'40px 0 0 0'}
            >
               下一步
            </Button> */}
         </>
      )
   }

   // const handlePrevStep = () => {
   //    if (step === 0) {
   //       navigate('/account')
   //    } else {
   //       setStep((n) => n - 1)
   //       // 將上一步的狀態改為false
   //       setStepStatus((n) => {
   //          const newState = [...n]
   //          newState[step - 1] = false
   //          return newState
   //       })
   //    }
   // }
   // const handleNextStep = () => {
   //    setStep((n) => n + 1)
   //    if (step === 2) {
   //       navigate('/success')
   //    }
   // }
   useEffect(() => {
      console.log('switch step')

      renderContent()
   }, [step])

   const renderContent = () => {
      switch (step) {
         case 1:
            return <SecondStep setStep={setStep} />
         case 2:
            return <ThirdStep setStep={setStep} />
         default:
            return <FirstStep setStep={setStep} />
      }
   }
   // useEffect(() => {
   //    if (isClick) {
   //       if (step === 3) {
   //          return
   //       }
   //       handleNextStep()
   //       setClick(false)
   //    }
   // }, [isClick])

   return (
      <>
         <Header />
         <StyledLoginBanner>
            <div className='flex items-center justify-center'>
               <FixedImageBox position={'absolute'} left={'13%'} top={'13%'}>
                  <img src={vectorIcon} alt='回到上一頁箭頭' />
               </FixedImageBox>
               <h3>會員註冊</h3>
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

const FixedImageBox = styled(PositionElement)`
   width: 18px;
   height: 18px;
`
//todo 共用樣式
const StyledLoginBanner = styled.section`
   display: flex;
   flex-direction: column;
   justify-content: start;
   gap: 20px;
   padding: 20px;
   background-image: url(${hotBg});

   h3 {
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      color: #535353;
   }
`

const StyledTitle = styled.h3`
   font-size: 18px;
   font-weight: 700;
`

const StyledContent = styled.section`
   border-radius: 16px;
   padding: 24px;
`

export default Register
