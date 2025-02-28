import React from 'react'
import styled from 'styled-components'

interface StyledButtonProps {
   type?: 'button' | 'submit' | 'reset'
   disabled?: boolean
   color?: string
   bgColor?: string
   border?: string
   margin?: string
}

const StyledButton = styled.button.attrs<StyledButtonProps>((props) => ({
   type: props.type || 'button',
}))<StyledButtonProps>`
   color: ${(props) => (props.color ? props.color : ' #eeeeee')};
   background-color: ${(props) => (props.disabled ? '#EEEEEE' : props.bgColor || '#be875c')};
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
   cursor: pointer;
`

interface ButtonProps {
   children?: React.ReactNode
   disabled?: boolean
   textColor?: string
   background?: string
   margin?: string
   actions?: () => void
   buttonType?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
   children,
   disabled = false,
   textColor,
   background,
   margin,
   actions,
   buttonType = 'button',
}) => {
   return (
      <StyledButton
         type={buttonType}
         color={textColor}
         bgColor={background}
         margin={margin}
         onClick={actions}
         disabled={disabled}
      >
         {children}
      </StyledButton>
   )
}

export default Button
