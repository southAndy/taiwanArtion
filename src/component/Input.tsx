import { DOMElement, useState } from "react";
import styled, { css } from "styled-components";

//todo use scss inside styled
const StyledInput = styled.input`
  border: none;
  &:focus-visible {
    border: none;
  }
`;
interface Props {
  keyword: String;
  setKeyword: Function;
}

export default function Input({ keyword, setKeyword }: Props) {
  function handleInput(event: { target: HTMLInputElement }) {
    setKeyword((keyword = event.target.value));
    console.log("user input", keyword);
  }
  return (
    <>
      <StyledInput onInput={handleInput} placeholder="輸入展覽名稱" />
    </>
  );
}
