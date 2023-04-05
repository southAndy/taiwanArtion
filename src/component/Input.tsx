import { DOMElement, useState } from "react";
import styled, { css } from "styled-components";

//todo use scss inside styled
const StyledInput = styled.input`
  border: none;
  &:focus-visible {
    border: none;
  }
`;

export default function Input({}: String, { setKeyword }: Function) {
  function handleInput(event: { target: HTMLInputElement }) {
    console.log("hi", event.target.value);
    setKeyword();
  }
  return (
    <>
      <StyledInput onInput={handleInput} placeholder="輸入展覽名稱" />
    </>
  );
}
