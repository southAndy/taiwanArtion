import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button.attrs({
   type: 'button',
})`
   color: ${(props) => props.color ?? '#333'};
   background-color: ${(props) => props.bgColor ?? '#EEEEEE'};
   border-radius: 12px;
   width: 100%;
   border: ${(props) => (props.border ? props.border : 'none')};
   padding: 8px 24px;
   margin: ${(props) => props.margin ?? '0'};
   &:hover {
      background-color: #be875c;
      color: #ffffff;
   }
`

const Button = ({ children, content, textColor, buttonBackground, margin, isClick, setClick }) => {
   const handleClick = () => {
      console.log('isClick:', isClick)
      setClick((n) => !isClick)
   }
   return (
      <StyledButton
         color={textColor}
         bgColor={buttonBackground}
         margin={margin}
         onClick={handleClick}
      >
         {content}
      </StyledButton>
   )
}
export default Button
