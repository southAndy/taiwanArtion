import React from 'react'
import styled from 'styled-components'
import { useEffect } from 'react'

interface ModalProps {
   children?: React.ReactNode
   isShow: boolean
   setShow: React.Dispatch<React.SetStateAction<boolean>>
   position?: { l: string; r: string; t: string; b: string }
   width?: string
   height?: string
   shape?: string
   overflow?: 'auto' | 'hidden' | 'scroll' | 'visible' | 'inherit' | 'initial' | 'unset'
}

const Modal = ({
   children,
   isShow,
   setShow,
   position = { l: 'unset', r: 'unset', t: 'unset', b: 'unset' },
   width,
   height,
   shape,
   overflow,
}: ModalProps) => {
   useEffect(() => {
      if (isShow) {
         document.body.style.overflow = 'hidden'
      } else {
         document.body.style.overflow = 'auto'
      }
   }, [isShow])

   const showModalHandler = (event: React.MouseEvent) => {
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
            borderRadius={shape}
            overflow={overflow}
         >
            {children}
         </StyledModalContent>
      </StyledModalBackground>
   )
}

export default Modal

interface StyledModalContentProps {
   bgColor?: string
   height?: string
   maxHeight?: string
   width?: string
   top?: string
   bottom?: string
   left?: string
   right?: string
   borderRadius?: string
   translate?: string
   overflow?: 'auto' | 'hidden' | 'scroll' | 'visible' | 'inherit' | 'initial' | 'unset'
}

interface StyledModalBackgroundProps {
   showModal: boolean
}

const StyledModalBackground = styled.div.attrs<StyledModalBackgroundProps>({
   id: 'modal-background',
   'data-testid': 'modal-background',
})<StyledModalBackgroundProps>`
   display: ${({ showModal }) => (showModal ? 'block' : 'none')};
   position: absolute;
   top: 8%;
   left: 0;
   background-color: rgba(0, 0, 0, 0.2);
   width: 100vw;
   height: 100vh;
   z-index: 2000;
`
const StyledModalContent = styled.div.attrs<StyledModalContentProps>({
   id: 'modal-content',
   'data-testid': 'modal-content',
})<StyledModalContentProps>`
   background: ${({ bgColor }) => bgColor || '#fff'};
   height: ${({ height }) => height || '600px'};
   max-height: ${({ maxHeight }) => maxHeight || '85%'};
   width: ${({ width }) => width || '100%'};
   position: absolute;
   overflow: ${({ overflow }) => overflow || 'auto'};
   border-radius: ${({ borderRadius }) => borderRadius || '0 0 20px 20px'};
   padding: 24px;
   top: ${({ top }) => top || '0%'};
   bottom: ${({ bottom }) => bottom || '0%'};
   left: ${({ left }) => left || '0%'};
   right: ${({ right }) => right || '0%'};
   translate: ${({ translate }) => translate || '-50% -50%'}; // 這個屬性預設用來置中的

   // 隱藏滾軸
   &::-webkit-scrollbar {
      display: none;
   }
`
