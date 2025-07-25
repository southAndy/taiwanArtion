import styled from '@emotion/styled'

const ButtonStyles = {
  primary: {
    backgroundColor: '#eeeeee',
    color: '#5f5f5f',
    hoverBackgroundColor: '#be875c',
    hoverColor: '#ffffff',
  },
  secondary: {
    backgroundColor: '#eeeeee',
    color: '#5f5f5f',
  },
}

const StyledButton = styled('button', {
  shouldForwardProp: prop => !['variant', 'margin', 'actions'].includes(prop),
})`
  color: ${props => ButtonStyles[props.variant]?.color ?? '#5f5f5f'};
  background-color: ${props => ButtonStyles[props.variant]?.backgroundColor ?? '#eeeeee'};
  border-radius: 12px;
  height: ${props => props.height ?? '40px'};
  width: ${props => props.width ?? '100%'};
  border: ${props => props.border ?? 'none'};
  padding: 8px 24px;
  margin: ${props => props.margin ?? '0'};
  cursor: pointer;
  opacity: 1;
  white-space: nowrap;

  &:disabled {
    background-color: #f5f5f5;
    color: #999999;
    cursor: not-allowed;
    opacity: 0.6;
  }
  &:hover:not(:disabled) {
    background-color: ${props => ButtonStyles[props.variant]?.hoverBackgroundColor ?? '#be875c'};
    color: ${props => ButtonStyles[props.variant]?.hoverColor ?? '#ffffff'};
  }
`

export default StyledButton
