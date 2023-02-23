// import styled from "styled-components";
import './moda.scss';
import loginIcon from "../../assets/images/4672493-02.png"
import fbIcon from "../../assets/images/social-icons/社群icon.png"
import googleIcon from "../../assets/images/social-icons/社群icon拷貝.png"

let iconList = [fbIcon,googleIcon]
//todo vite 疑似沒有內建支援 styled-components
const Modal =({isClick})=>{
    return (
        <section className={isClick?'show':'invisible'} >
            <div className='modal'>
                <div className='modal-banner'>
                    <img src={loginIcon} alt="登入圖樣" />
                </div>
                <div className='modal-info'>
                    <h3 className='title'>或者使用以下帳號登入/註冊</h3>
                    <div className='social'>
                        {iconList.map((ele)=>{
                            return (
                                <div className='social-item'>
                                    <img src={ele} alt="" />
                                </div>
                            )
                        })}
                    </div>
                    <div className='member'>
                        <div className='register'>註冊</div>
                        <div className='login'>登入</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Modal