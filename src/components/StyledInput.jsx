import styled from '@emotion/styled'

const StyledInput = styled('input', {
  shouldForwardProp: prop => !['shape', 'formState', 'size'].includes(prop),
})`
  width: 100%;
  border-radius: ${props => props.shape ?? '16px'};
  border: ${props => (props.formState === 'error' ? '1px solid #D31C1C' : '1px solid #e0e0e0')};
  padding: ${props => props.size ?? '16px'};
  font-size: 16px;

  &:focus-visible {
    border: none;
  }
  &:focus {
    outline: none;
    border: 1px solid #be875c;
  }
`

export default StyledInput
