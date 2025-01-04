import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button.attrs((props) => ({
   //todo 新增動態 type ，當 button 是 form 架構內的
   type: props.type || 'button',
}))`
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
   buttonType,
}) => {
   return (
      <StyledButton
         type={buttonType}
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
