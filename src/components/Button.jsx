import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button.attrs({
   type: 'button',
})`
   color: ${(props) => (props.disabled ? '#3333' : ' #eeeeee')};
   background-color: ${(props) => (props.disabled ? '#EEEEEE' : ' #be875c')};
   border-radius: 12px;
   width: 100%;
   border: ${(props) => (props.border ? props.border : 'none')};
   padding: 8px 24px;
   margin: ${(props) => props.margin ?? '0'};
   &:disabled {
      background-color: #eeeeee;
      color: #3333;
   }
   white-space: nowrap;
`

const Button = ({
   children,
   content,
   disabled,
   textColor,
   buttonBackground,
   margin,
   isClick,
   actions,
}) => {
   // const handleClick = () => {
   //    setClick((n) => !n)
   // }
   return (
      <StyledButton
         color={textColor}
         bgColor={buttonBackground}
         margin={margin}
         onClick={actions}
         disabled={disabled}
      >
         {content}
      </StyledButton>
   )
}
export default Button
