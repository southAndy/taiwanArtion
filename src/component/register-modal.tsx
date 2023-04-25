import styled from "@emotion/styled";
import { useState } from "react";

const ModalContainer = styled.section`
  width: 1000px;
  height: 1000px;
  background: green;
  box-shadow: 0px 4px 20px rgba(99, 99, 99, 0.2);
  border-radius: 10px;
`;
const Modal = styled.section`
  display: flex;
`;

//todo 在這邊分出四個步驟的元素

type Props = {};
const verifyPhoneModal = () => {
  let [currentStep, setStep] = useState<number>(0);
  return (
    <ModalContainer>
      <Modal>123</Modal>
    </ModalContainer>
  );
};

export default verifyPhoneModal;
