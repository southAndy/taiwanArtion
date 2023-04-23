import { DOMElement, useState } from "react";
import styled, { css } from "styled-components";

//todo use scss inside styled
const StyledInput = styled.input`
  width: 90px;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #b0b0b0;
  }
`;
interface Props {
  keyword: String;
  setKeyword: Function;
}

export default function Input({ keyword, setKeyword }: Props) {
  function handleInput(event: { target: HTMLInputElement }) {
    setKeyword((keyword = event.target.value));
  }
  return (
    <>
      <StyledInput onInput={handleInput} placeholder="輸入展覽名稱" />
    </>
  );
}
