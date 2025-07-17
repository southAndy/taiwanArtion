import styled from '@emotion/styled'
import { useState } from 'react'

import './moda.scss'
import { loginBanner } from '../../assets/images/index'
import fbIcon from '../../assets/images/social-icons/社群icon.png'
import googleIcon from '../../assets/images/social-icons/社群icon拷貝.png'

import RegisterModal from '../register-modal'

const Login = () => {
   return <div>123</div>
}

const DefaultModal = ({ mode, setMode }) => {
   return (
      <section>
         <div className='modal'>
            <div className='modal-banner'>
               <div>x</div>
               <img src={loginBanner} alt='登入圖樣' />
            </div>
            <div className='modal-info'>
               <h3 className='title'>或者使用以下帳號登入/註冊</h3>
               <div className='social'>
                  {iconList.map((ele, index) => {
                     return (
                        <div key={index} className='social-item'>
                           <img src={ele} alt='' />
                        </div>
                     )
                  })}
               </div>
               <div className='member'>
                  <div className='register' onClick={() => setMode(1)}>
                     註冊
                  </div>
                  <div className='login' onClick={() => setMode(0)}>
                     登入
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

let iconList = [fbIcon, googleIcon]
const Modal = ({ isClick, setClick }) => {
   let [currentMode, setMode] = useState(2)
   const steps = [<Login />, <RegisterModal />]
   const renderStep = () => {
      switch (currentMode) {
         case 0:
            return steps[0]
         case 1:
            return steps[1]
         default:
            return <DefaultModal setMode={setMode} mode={currentMode} />
      }
   }
   return <div className={isClick ? 'show' : 'invisible'}>{renderStep()}</div>
}

export default Modal
