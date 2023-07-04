import { DOMElement, useState } from 'react'
import styled from '@emotion/styled'

//todo use scss inside styled
const StyledInput = styled.input`
   box-shadow: 1px 0px 0px #dadada;
   width: 90px;
   border: none;
   &:focus {
      outline: none;
   }
   &::placeholder {
      color: #b0b0b0;
   }
`

export default function Input({ keyword, setKeyword }) {
   function handleInput(event) {
      setKeyword((keyword = event.target.value))
   }
   return (
      <>
         <StyledInput onChange={handleInput} placeholder='輸入展覽名稱' />
      </>
   )
}
