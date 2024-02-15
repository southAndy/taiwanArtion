import styled from 'styled-components'

const StyledInput = styled.input.attrs((props) => {
   placeholder: props.placeholder
   type: props.type ?? 'text'
})`
   width: 100%;
   border-radius: ${(props) => props.shape ?? '16px'};
   border: ${(props) => (props.isError ? '1px solid #D31C1C' : '1px solid #e0e0e0')};
   padding: ${(props) => props.size ?? '16px'};
   font-size: 14px;
`

const Input = ({ children, placeholder, content, size, shape, setContent, isError }) => {
   const handleChange = (e) => {
      console.log(e)
   }
   return (
      <StyledInput
         size={size}
         shape={shape}
         isError={isError}
         placeholder={placeholder}
         value={content}
         onChange={handleChange}
      />
   )
}

export default Input
