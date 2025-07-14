import styled from '@emotion/styled'
import { useEffect } from 'react'

const Modal = ({
  children,
  isShow,
  setShow,
  width = '90%',
  height = 'auto',
  maxWidth = '600px',
  maxHeight = '85vh',
  borderRadius = '20px',
  centered = true,
  position,
  closable = true,
  maskClosable = true,
  overflow = 'auto',
  backgroundColor = 'white', // 新增
  backdropColor = 'rgba(0, 0, 0, 0.5)', // 新增
  padding, // 新增
}) => {
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // ESC 鍵關閉
    const handleEscape = e => {
      if (e.key === 'Escape' && closable) {
        setShow(false)
      }
    }

    if (isShow) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isShow, closable, setShow])

  const handleBackdropClick = event => {
    if (maskClosable && event.target === event.currentTarget) {
      setShow(false)
    }
  }

  if (!isShow) return null

  return (
    <StyledModalBackground onClick={handleBackdropClick} backdropColor={backdropColor}>
      <StyledModalContent
        width={width}
        height={height}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        borderRadius={borderRadius}
        centered={centered}
        position={position}
        overflow={overflow}
        backgroundColor={backgroundColor}
        padding={padding}
      >
        {children}
      </StyledModalContent>
    </StyledModalBackground>
  )
}

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ backdropColor }) => backdropColor};
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledModalContent = styled.div`
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: ${({ borderRadius }) => borderRadius};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  overflow: ${({ overflow }) => overflow};
  position: relative;
  padding: ${({ padding }) => padding};

  // 簡化的定位邏輯
  ${({ position, centered }) => {
    if (position) {
      return `
        position: absolute;
        top: ${position.top || 'unset'};
        right: ${position.right || 'unset'};
        bottom: ${position.bottom || 'unset'};
        left: ${position.left || 'unset'};
        transform: ${position.transform || 'none'};
      `
    }
    return '' // 使用 flexbox 自動置中
  }}

  &::-webkit-scrollbar {
    display: none;
  }
`

export default Modal
