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
import SuccessStep from '../../container/Register/SuccessStep'
import FinishStep from '../../container/Register/FinishStep'
import { Step, Stepper, StepLabel } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../firebase.config'

const Register = () => {
   const [step, setStep] = useState(0)
   const [userInfo, setUserInfo] = useState({})
   const [isClick, setClick] = useState(false)
   const steps = [FirstStep, SecondStep, ThirdStep, FinishStep]
   const stepContent = ['手機驗證', '帳號密碼', '完成註冊']
   // const [stepStatus, setStepStatus] = useState([false, false, false, false])
   const navigate = useNavigate()

   function renderSteps() {
      return <>{renderContent()}</>
   }
   useEffect(() => {
      renderContent()
      if (step === 2) {
         //將 userInfo 存入 firebase 中
         console.log(step, 'store!')
         storeUserInfo()
      }
   }, [step])

   const renderContent = () => {
      switch (step) {
         case 1:
            return <SecondStep setStep={setStep} setUserInfo={setUserInfo} />
         case 2:
            return <SuccessStep setStep={setStep} setUserInfo={setUserInfo} />
         default:
            return <FirstStep setStep={setStep} setUserInfo={setUserInfo} />
      }
   }

   async function storeUserInfo() {
      try {
         const userData = await addDoc(collection(db, 'users'), userInfo)
      } catch (e) {
         console.log(e)
      }
   }

   return (
      <>
         <Header />
         {step !== 2 ? (
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
         ) : (
            ''
         )}

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
