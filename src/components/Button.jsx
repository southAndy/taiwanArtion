import React from 'react'
import styled from '@emotion/styled'

const StyledButton = styled('button', {
  shouldForwardProp: prop =>
    !['textColor', 'backgroundColor', 'margin', 'content', 'actions'].includes(prop),
})`
  color: ${props => (props.textColor ? props.textColor : '#5f5f5f')};
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '#eeeeee')};
  border-radius: 12px;
  width: 100%;
  border: ${props => (props.border ? props.border : 'none')};
  padding: 8px 24px;
  margin: ${props => props.margin ?? '0'};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.6' : '1')};

  &:hover:not(:disabled) {
    background-color: #be875c;
    color: #ffffff;
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #999999;
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
  actions,
  buttonType = 'button',
  className,
}) => {
  return (
    <StyledButton
      type={buttonType}
      textColor={textColor}
      backgroundColor={buttonBackground}
      margin={margin}
      onClick={actions}
      disabled={disabled}
      className={className}
    >
      {content || children}
    </StyledButton>
  )
}
export default Button
