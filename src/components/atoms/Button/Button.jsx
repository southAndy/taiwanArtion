import React from 'react'
import StyledButton from './Button.styles'

const Button = ({
  children,
  disabled,
  height,
  margin,
  actions,
  buttonType = 'button',
  className,
  variant = 'primary',
}) => {
  return (
    <StyledButton
      type={buttonType}
      variant={variant}
      margin={margin}
      onClick={actions}
      disabled={disabled}
      className={className}
      height={height}
    >
      {children}
    </StyledButton>
  )
}
export default Button
