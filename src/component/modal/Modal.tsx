import styled from "styled-components";
import "./moda.scss";
import loginIcon from "../../assets/images/4672493-02.png";
import fbIcon from "../../assets/images/social-icons/社群icon.png";
import googleIcon from "../../assets/images/social-icons/社群icon拷貝.png";

import Register from "../../container/Register";

const styledButton = styled.button`
  color: red;
`;

interface Props {
  isClick: Boolean;
  setClick: Function;
}

let iconList = [fbIcon, googleIcon];
const Modal = ({ isClick, setClick }: Props) => {
  function test() {
    console.log("hi");
  }
  return (
    <section className={isClick ? "show" : "invisible"}>
      <div className="modal">
        <div className="modal-banner">
          <img src={loginIcon} alt="登入圖樣" />
        </div>
        <div className="modal-info">
          <h3 className="title">或者使用以下帳號登入/註冊</h3>
          <div className="social">
            {iconList.map((ele, index) => {
              return (
                <div key={index} className="social-item">
                  <img src={ele} alt="" />
                </div>
              );
            })}
          </div>
          <div className="member">
            <div className="register">註冊</div>
            <div className="login">登入</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
