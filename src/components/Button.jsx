import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button.attrs(props => ({
  //todo 新增動態 type ，當 button 是 form 架構內的
  type: props.type || 'button',
}))`
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
  buttonType,
}) => {
  return (
    <StyledButton
      type={buttonType}
      color={textColor}
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
