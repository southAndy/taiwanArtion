import styled from 'styled-components'
import { useEffect } from 'react'

const StyledModalBackground = styled.div`
   display: ${({ showModal }) => (showModal ? 'block' : 'none')};
   position: absolute;
   top: 9%;
   left: 0;
   background-color: rgba(0, 0, 0, 0.2);
   width: 100vw;
   height: 100vh;
   z-index: 100;
`
const StyledModalContent = styled.div`
   background: ${({ bgColor }) => bgColor || '#fff'};
   height: ${({ height }) => height || '600px'};
   max-height: ${({ maxHeight }) => maxHeight || '85%'};
   width: ${({ width }) => width || '100%'};
   position: absolute;
   overflow: scroll;
   border-radius: ${({ borderRadius }) => borderRadius || '0 0 20px 20px'};
   padding: 24px;
   top: ${({ top }) => top || '0%'};
   bottom: ${({ bottom }) => bottom || '0%'};
   left: ${({ left }) => left || '0%'};
   right: ${({ right }) => right || '0%'};
`

const Modal = ({
   children,
   isShow,
   setShow,
   position = { l: 0, r: 0, t: 0, b: 0 },
   size = { w: 0, z: 0 },
   shape,
}) => {
   useEffect(() => {
      if (isShow) {
         document.body.style.overflow = 'hidden'
      } else {
         document.body.style.overflow = 'auto'
      }
   }, [isShow])

   const showModalHandler = (event) => {
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
            width={size.w}
            height={size.h}
            top={position.t}
            bottom={position.b}
            left={position.l}
            right={position.r}
            borderRadius={shape}
         >
            {children}
         </StyledModalContent>
      </StyledModalBackground>
   )
}

export default Modal
