import styled from "@emotion/styled";
import { useState } from "react";

const StyledInput = styled.input`
  padding: 10px 24px;
  width: auto;
  height: 24px;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 10px;
  &::placeholder {
    color: #dedede;
  }
`;
const StyledLabel = styled.label`
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;

  /* Black&white/700 */

  color: #636363;
`;

const UserInfoBox = styled.section`
  display: flex;
  flex-direction: column;
`;

const UserInfo = () => {
  return (
    <>
      <UserInfoBox>
        <StyledLabel>帳號</StyledLabel>
        <StyledInput type="text" placeholder="4-21碼小寫英文.數字" />
      </UserInfoBox>
      <UserInfoBox>
        <StyledLabel>密碼</StyledLabel>
        <StyledInput type="password" placeholder="6-18位數密碼,請區分大小寫" />
      </UserInfoBox>
    </>
  );
};

export default UserInfo;
