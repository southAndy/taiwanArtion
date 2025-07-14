import React from 'react'
import styled from '@emotion/styled'

const StyledButton = styled('button', {
  shouldForwardProp: (prop) => !['textColor', 'backgroundColor', 'margin'].includes(prop)
})`
  color: ${props => (props.textColor ? props.textColor : 'black')};
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '#eeeee')};
  border-radius: 12px;
  width: 100%;
  border: ${props => (props.border ? props.border : 'none')};
  padding: 8px 24px;
  margin: ${props => props.margin ?? '0'};
  &:hover {
    background-color: #be875c;
    color: #eeeeee;
  }
  white-space: nowrap;
  cursor: pointer;
`

const Button = ({
  children,
  disabled,
  textColor,
  buttonBackground,
  margin,
  actions,
  buttonType = 'button',
}) => {
  return (
    <StyledButton
      type={buttonType}
      textColor={textColor}
      backgroundColor={buttonBackground}
      margin={margin}
      onClick={actions}
      disabled={disabled}
    >
      {children}
    </StyledButton>
  )
}
export default Button
