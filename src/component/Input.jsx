import { useState } from "react";
import styled,{css} from "styled-components";


//todo use scss inside styled  
const StyledInput = styled.input`
    border:none;
    &:focus-visible{
        border:none
    }
`

export default function Input({input,exhibitionData}){
    function handleInput(event){
        console.log('hi',event.target.value);
    }
    return (
        <>
            <StyledInput onInput={handleInput} placeholder="輸入展覽名稱"/>
        </>
    )
}