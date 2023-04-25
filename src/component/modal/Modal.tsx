import styled from "@emotion/styled";
import { useState } from "react";

import "./moda.scss";
import loginIcon from "../../assets/images/4672493-02.png";
import fbIcon from "../../assets/images/social-icons/社群icon.png";
import googleIcon from "../../assets/images/social-icons/社群icon拷貝.png";

import RegisterModal from "../register-modal";

interface Props {
  isClick: Boolean;
  setClick: Function;
}

const Login = () => {
  return <div>123</div>;
};

let iconList = [fbIcon, googleIcon];
const Modal = ({ isClick, setClick }: Props) => {
  let [currentMode, setMode] = useState<number>(0);
  const steps = [<Login />, <RegisterModal />];
  const renderStep = () => {
    switch (currentMode) {
      case 0:
        return steps[0];
      case 1:
        return steps[1];
      default:
        return null;
    }
  };
  return (
    // <section className={isClick ? "show" : "invisible"}>
    //   <div className="modal">
    //     <div className="modal-banner">
    //       <div onClick={() => setClick(false)}>x</div>
    //       <img src={loginIcon} alt="登入圖樣" />
    //     </div>
    //     <div className="modal-info">
    //       <h3 className="title">或者使用以下帳號登入/註冊</h3>
    //       <div className="social">
    //         {iconList.map((ele, index) => {
    //           return (
    //             <div key={index} className="social-item">
    //               <img src={ele} alt="" />
    //             </div>
    //           );
    //         })}
    //       </div>
    //       <div className="member">
    //         <div className="register" onClick={() => setMode("register")}>
    //           註冊
    //         </div>
    //         <div className="login" onClick={() => setMode("login")}>
    //           登入
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className={isClick ? "show" : "invisible"}>{renderStep()}</div>
  );
};

export default Modal;
