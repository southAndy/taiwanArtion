import styled from 'styled-components'
import { useEffect } from 'react'

const Modal = ({
  children,
  isShow,
  setShow,
  position = { l: 'unset', r: 'unset', t: 'unset', b: 'unset' },
  width,
  height,
  shape,
  translate,
  overflow,
  borderRadius,
}) => {
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isShow])

  const showModalHandler = event => {
    // 如果是 children 內的子元素，不關閉 modal
    if (event.target !== event.currentTarget) {
      return
    } else {
      setShow(() => !isShow)
    }
  }

  return (
    <StyledModalBackground showModal={isShow} onClick={showModalHandler}>
      <StyledModalContent
        width={width}
        height={height}
        top={position.t}
        bottom={position.b}
        left={position.l}
        right={position.r}
        borderRadius={borderRadius || shape}
        translate={translate}
        overflow={overflow}
      >
        {children}
      </StyledModalContent>
    </StyledModalBackground>
  )
}

export default Modal

const StyledModalBackground = styled.div`
  display: ${({ showModal }) => (showModal ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 2000;
  justify-content: center;
  align-items: center;
`

const StyledModalContent = styled.div`
  background: ${({ bgColor }) => bgColor || '#fff'};
  height: ${({ height }) => height || '600px'};
  max-height: ${({ maxHeight }) => maxHeight || '85%'};
  width: ${({ width }) => width || '100%'};
  position: ${({ top, bottom, left, right }) =>
    top !== 'unset' || bottom !== 'unset' || left !== 'unset' || right !== 'unset'
      ? 'absolute'
      : 'relative'};
  overflow: ${({ overflow }) => overflow || 'auto'};
  border-radius: ${({ borderRadius }) => borderRadius || '0 0 20px 20px'};
  padding: 24px;
  top: ${({ top }) => top || 'unset'};
  bottom: ${({ bottom }) => bottom || 'unset'};
  left: ${({ left }) => left || 'unset'};
  right: ${({ right }) => right || 'unset'};
  transform: ${({ translate }) => translate || 'none'};

  // 隱藏滾軸
  &::-webkit-scrollbar {
    display: none;
  }
`
