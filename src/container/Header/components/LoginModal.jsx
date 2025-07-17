import React from 'react'
import Modal from '@components/Modal'
import Account from '@container/Account'
import styled from '@emotion/styled'
import { loginBanner } from '@assets/images/index'
import Button from '@components/Button'

const LoginModal = ({
  isShow,
  setShow,
  width,
  height,
  position,
  translate,
  overflow,
  borderRadius,
}) => {
  return (
    <Modal
      isShow={isShow}
      setShow={setShow}
      width={width}
      height={height}
      position={position}
      translate={translate}
      overflow={overflow}
      borderRadius={borderRadius}
    >
      <StyledModalContent>
        {/* Login content */}
        <section>
          <div className="w-auto">
            <img src={loginBanner} alt="login" className="w-full" />
          </div>
          <div className="flex gap-4 p-4">
            <Button>{'登入'}</Button>
            <Button>{'註冊'}</Button>
          </div>
        </section>
      </StyledModalContent>
    </Modal>
  )
}

const StyledModalContent = styled.div`
  height: 100%;
  overflow-y: auto;
`

export default LoginModal
