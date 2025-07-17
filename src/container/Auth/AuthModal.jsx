import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useBreakpoint } from '@hooks/useBreakpoint'
import Modal from '@components/Modal'
import { hotBg, vectorIcon } from '@assets/images/index'
import LoginFlow from './LoginFlow'
import RegisterFlow from './RegisterFlow'

const AuthModal = ({
  isShow,
  setShow,
  initialMode = 'login' // 'login' or 'register'
}) => {
  const [mode, setMode] = useState(initialMode)
  const { isDesktop } = useBreakpoint()

  // 如果是手機版，不顯示彈窗
  if (!isDesktop) {
    return null
  }

  const handleModeSwitch = (newMode) => {
    setMode(newMode)
  }

  const handleAuthSuccess = () => {
    setShow(false)
  }

  return (
    <Modal
      isShow={isShow}
      setShow={setShow}
      width="500px"
      height="auto"
      position="fixed"
      borderRadius="16px"
    >
      <StyledAuthModalContainer>
        <StyledHeader>
          <StyledBackButton onClick={() => setShow(false)}>
            <img src={vectorIcon} alt="關閉" />
          </StyledBackButton>
          <StyledTitle>
            {mode === 'login' ? '會員登入' : '會員註冊'}
          </StyledTitle>
        </StyledHeader>

        <StyledModeSelector>
          <StyledModeButton 
            active={mode === 'login'}
            onClick={() => handleModeSwitch('login')}
          >
            登入
          </StyledModeButton>
          <StyledModeButton 
            active={mode === 'register'}
            onClick={() => handleModeSwitch('register')}
          >
            註冊
          </StyledModeButton>
        </StyledModeSelector>

        <StyledContent>
          {mode === 'login' ? (
            <LoginFlow onSuccess={handleAuthSuccess} />
          ) : (
            <RegisterFlow onSuccess={handleAuthSuccess} />
          )}
        </StyledContent>
      </StyledAuthModalContainer>
    </Modal>
  )
}

const StyledAuthModalContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 16px;
  max-height: 90vh;
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 20px;
  background-image: url(${hotBg});
  background-size: cover;
  background-position: center;
  min-height: 80px;
`

const StyledBackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  width: 18px;
  height: 18px;
  
  img {
    width: 100%;
    height: 100%;
  }
`

const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #535353;
  margin: 0;
`

const StyledModeSelector = styled.div`
  display: flex;
  gap: 0;
  margin: 20px 24px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`

const StyledModeButton = styled.button`
  flex: 1;
  padding: 12px 16px;
  background-color: ${props => props.active ? '#A9622A' : '#fff'};
  color: ${props => props.active ? '#fff' : '#5f5f5f'};
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#A9622A' : '#f5f5f5'};
  }
`

const StyledContent = styled.div`
  padding: 0 24px 24px;
  color: #333333;
  
  // 調整內部元件的樣式
  form {
    padding: 0;
  }
  
  // 確保彈窗內的文字顏色正確
  label {
    color: #453434;
    font-weight: 500;
  }
  
  // 修正一般文字顏色
  p, span {
    color: #666666;
  }
  
  // 修正標題文字顏色
  h3 {
    color: #453434;
    font-weight: 600;
  }
  
  // 修正輸入框樣式
  input {
    color: #333333;
    
    &::placeholder {
      color: #999999;
    }
  }
  
  // 修正按鈕樣式
  button {
    transition: all 0.3s ease;
  }
`

export default AuthModal