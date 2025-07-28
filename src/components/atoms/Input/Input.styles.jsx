import styled from '@emotion/styled'

const StyledInput = styled('input', {
  shouldForwardProp: prop => !['shape', 'formState', 'size', 'width', 'disabled'].includes(prop),
})`
  width: ${props => props.width ?? '100%'};
  background-color: ${props => (props.disabled ? '#f5f5f5' : '#ffffff')};
  color: ${props => (props.disabled ? '#999999' : '#5f5f5f')};
  border-radius: ${props => props.shape ?? '16px'};
  border: ${props => (props.formState === 'error' ? '1px solid #D31C1C' : '1px solid #C2C2C2')};
  padding: ${props => props.size ?? '16px'};
  font-size: 16px;

  &:focus-visible {
    border: none;
  }
  &:focus {
    outline: none;
    border: 1px solid #be875c;
    box-shadow: 0 0 0 2px rgba(190, 135, 92, 0.1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`

export default StyledInput
