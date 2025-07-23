import styled from '@emotion/styled'

const StyledInput = styled('input', {
  shouldForwardProp: prop => !['width', 'shape', 'formState', 'size', 'isError'].includes(prop),
})`
  width: ${props => props.width ?? '100%'};
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

const Input = ({
  children,
  width,
  placeholder,
  value,
  size,
  shape,
  setValue,
  isError,
  types = 'text',
  formState,
}) => {
  const handleChange = e => {
    setValue(() => e.target.value)
  }
  return (
    <StyledInput
      onChange={handleChange}
      width={width}
      size={size}
      shape={shape}
      type={types}
      isError={isError}
      placeholder={placeholder}
      formState={formState}
      value={value}
      disabled={formState === 'loading' || formState === 'disabled'}
    />
  )
}

export default Input
