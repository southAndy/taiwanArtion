import styled from 'styled-components'

const StyledInput = styled.input.attrs((props) => {
   placeholder: props.placeholder
   type: props.type ?? 'text'
})`
   width: 100%;
   border-radius: 16px;
   border: 1px solid #c2c2c2;
   padding: 16px;
   font-size: 14px;
`

const Input = ({ placeholder, content, setContent }) => {
   const handleChange = (e) => {
      console.log(e)
   }
   return <StyledInput placeholder={placeholder} value={content} onChange={handleChange} />
}

export default Input
