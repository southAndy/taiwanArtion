import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { hotBg, vectorIcon, facebookIcon, lineIcon, googleIcon } from '../../assets/images/index'
import { Link } from 'react-router-dom'
import Header from '../../container/Header/Header'
import FirstStep from '../../container/Register/FirstStep'
import Button from '../../components/Button'
import SecondStep from '../../container/Register/SecondStep'
import ThirdStep from '../../container/Register/ThirdStep'
import FinishStep from '../../container/Register/FinishStep'

//todo 共用樣式
const StyledLoginBanner = styled.section`
   display: flex;
   align-items: center;
   justify-content: start;
   gap: 90px;
   padding: 20px;
   background-image: url(${hotBg});
   height: 100px;
`

const StyledTitle = styled.h3`
   font-size: 18px;
   font-weight: 700;
`

const StyledContent = styled.section`
   border-radius: 16px;
   padding: 24px;
`

const StepButton = styled.button`
   color: #333;
   background-color: #eeeeee;
   padding: 8px 24px;
   border-radius: 12px;
   border: none;
   width: 100%;
   margin-top: 24px;
   &:hover {
      background-color: #be875c;
      color: #ffffff;
   }
`

const Register = () => {
   const [step, setStep] = useState(0)
   const steps = [FirstStep, SecondStep, ThirdStep, FinishStep]
   function renderSteps() {
      return (
         <>
            {renderContent()}
            <StepButton onClick={handleNextStep}>下一步</StepButton>
         </>
      )
   }

   const handlePrevStep = () => {
      setStep((n) => n - 1)
   }
   const handleNextStep = () => {
      setStep((n) => n + 1)
   }
   const renderContent = () => {
      switch (step) {
         case 1:
            return <SecondStep />
         case 2:
            return <ThirdStep />
         case 3:
            return <FinishStep />
         default:
            return <FirstStep />
      }
   }
   useEffect(() => {
      console.log('step:', step)
   }, [step])

   return (
      <>
         <Header />
         <StyledLoginBanner>
            <Link to='/account' className='w-[18px] h-[10px]'>
               <img src={vectorIcon} alt='回到上一頁箭頭' />
            </Link>
            <StyledTitle className='text-md'>會員註冊</StyledTitle>
            <div></div>
         </StyledLoginBanner>
         <StyledContent>{renderSteps()}</StyledContent>
      </>
   )
}

export default Register
