import styled from "@emotion/styled";
import { useState } from "react";
import "../assets/sass/color.scss";

import UserInfo from "../component/user-input";

const ModalContainer = styled.section`
  width: 30vw;
  height: 50vh;
  padding: 40px;
  background: white;
  box-shadow: 0px 4px 20px rgba(99, 99, 99, 0.2);
  border-radius: 10px;
`;
const RegisterHeader = styled.section`
  display: flex;
  justify-content: center;
`;

const RegisterTitle = styled.h3`
  text-align: center;
  color: #636363;
  font-weight: 700;
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 40px;
`;
const RegisterStepBox = styled.section`
  display: flex;
  justify-content: space-around;
`;
const RegisterStepCount = styled.div`
  width: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 30px;
  background: ${(props: { isActive: boolean }) =>
    props.isActive ? "#BE875C" : " #F5F5F5"};
  color: ${(props: { isActive: boolean }) =>
    props.isActive ? "#ffff" : "black"};
`;
const RegisterStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;
const RegisterStepText = styled.p`
  font-size: 14px;
  line-height: 130%;
  color: #636363;
`;
const RegisterDescription = styled.p`
  text-align: center;
  color: #636363;
`;

const PhoneBox = styled(RegisterStepBox)`
  color: red;
`;
const PhoneTitle = styled(RegisterDescription)`
  text-align: start;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 10px;
`;
const PhoneInput = styled.input`
  width: 356px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 10px;
  margin-right: 15px;
`;

const RegisterBottomBox = styled.section`
  display: flex;
  margin: 40px 0;
`;

const ConfirmButton = styled.button`
  width: ${(props: { widths: string; size?: string }) => props.widths};
  height: 48px;
  font-size: ${(props: { size?: string }) =>
    props.size ? props.size : "14px"};
  color: #636363;
  background: #f5f5f5;
  border-radius: 10px;
  &:hover {
    color: #ffff;
    background: #be875c;
  }
`;

const verifyModal = () => {
  let [currentStep, setStep] = useState<number>(0);
  let [isSendVerify, setVerifyState] = useState<boolean>(false);
  let [resetTime, setResetTime] = useState<number>(60);
  let stepsText = ["手機認證", "帳號密碼", "信箱認證", "完成註冊"];

  let PhoneVerifyPage = () => {
    return (
      <>
        <RegisterDescription>
          {isSendVerify
            ? "已發送手機驗證碼至0912*********手機,請輸入手機驗證碼並送出驗證。"
            : "為了確保是你本人，我們將會寄送一封驗證簡訊到你的手機。"}
        </RegisterDescription>
        <PhoneTitle>手機號碼</PhoneTitle>
        <PhoneBox>
          {isSendVerify ? (
            <PhoneInput placeholder="請輸入手機驗證碼" />
          ) : (
            <PhoneInput placeholder="請輸入手機號碼" />
          )}
          <ConfirmButton
            onClick={() => submitVerifyMessage()}
            widths={"96px"}
            size="12px"
          >
            {isSendVerify ? `${resetTime}秒後重新點擊` : "寄送驗證碼"}
          </ConfirmButton>
        </PhoneBox>
      </>
    );
  };
  let CreateUserInfoPage = () => {
    return (
      <>
        <UserInfo />
      </>
    );
  };
  //todo 在這邊分出四個步驟的元素

  let stepPageList = [<PhoneVerifyPage />, <CreateUserInfoPage />];

  function submitVerifyMessage() {
    setVerifyState(true);
    //todo 實現倒數60秒計算
    setTimeout(() => {
      setResetTime((s) => s - 1);
      setVerifyState(false);
    }, 3000);
  }
  const confirBox = "margin-top:40px;";
  return (
    <ModalContainer>
      <RegisterHeader>
        <RegisterTitle>會員註冊</RegisterTitle>
      </RegisterHeader>
      <RegisterStepBox>
        {stepsText.map((item, index) => {
          return (
            <RegisterStep key={index}>
              <RegisterStepCount
                isActive={currentStep === index ? true : false}
              >
                {index + 1}
              </RegisterStepCount>
              <RegisterStepText>{item}</RegisterStepText>
            </RegisterStep>
          );
        })}
      </RegisterStepBox>
      {stepPageList[currentStep]}
      <RegisterBottomBox>
        <ConfirmButton
          onClick={() => setStep((step) => step + 1)}
          widths="460px"
        >
          下一步
        </ConfirmButton>
      </RegisterBottomBox>
    </ModalContainer>
  );
};

export default verifyModal;
