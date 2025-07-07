import { React } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { breakpoint } from '@styles/utils/breakpoint'
import BaseImageBox from '@styles/base/BaseImageBox'
import { ProfileIcon } from '@assets/images/backstage'

const ProfileMenu = () => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <StyledProfileMenu>
      {/* <button onClick={() => setIsEdit((n) => !n)}>編輯</button> */}
      <div className="title">
        <div className="title-icon">
          <BaseImageBox width={'24px'} height={'24px'}>
            <img src={ProfileIcon} alt="userIcon0" />
          </BaseImageBox>
          <h1>個人檔案</h1>
        </div>
        <p>開始建立你的個人檔案吧！</p>
      </div>
      <StyledFormBox className="profile" action="">
        <button type="button" className="edit" onClick={() => setIsEdit(n => !n)}>
          編輯
        </button>
        <label htmlFor="name" className="name">
          <p>姓名</p>
          <p className={`${isEdit ? 'none' : 'show'}`}>Andy</p>
          <input className={`${isEdit ? 'show' : 'none'}`} type="text" />
        </label>
        <label htmlFor="account" className="account">
          <p>使用者帳號</p>
          <p>1222test</p>
        </label>
        <label htmlFor="emaul" className="email">
          <p>註冊信箱</p>
          <p>zatchbell.1206@gmail.com</p>
          <span>變更電子信箱</span>
        </label>
        <label htmlFor="birthday" className="birthday">
          <p>生日</p>
          <p className={`${isEdit ? 'none' : 'show'}`}>84/12/06</p>
          <select name="" id="" className={`${isEdit ? 'show' : 'none'}`}></select>
        </label>
        <label htmlFor="gender" className="gender">
          <p>性別</p>
          <p className={`${isEdit ? 'none' : 'show'}`}>男性</p>
          <select name="" id="" className={`${isEdit ? 'show' : 'none'}`}></select>
        </label>
        <label htmlFor="place" className="place">
          <p>居住地點</p>
          <p className={`${isEdit ? 'none' : 'show'}`}>高雄市</p>
          <input className={`${isEdit ? 'show' : 'none'}`} type="text" />
        </label>
        {isEdit ? (
          <div className="option">
            <button className="cancel">取消</button>
            <button className="save">儲存</button>
          </div>
        ) : null}
      </StyledFormBox>
    </StyledProfileMenu>
  )
}

export default ProfileMenu

const StyledProfileMenu = styled.main`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  @media (min-width: ${breakpoint.tablet}px) {
    .title {
      display: flex;
      flex-direction: column;
      gap: 8px;
      align-items: flex-start;
      margin-bottom: 24px;
      h1 {
        font-size: 24px;
        color: #7b4d29;
        margin: 0;
      }
      &-icon {
        display: flex;
        gap: 12px;
        align-items: center;
      }
    }
  }
`
const StyledFormBox = styled.form.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  font-family: Noto Sans TC;
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  .none {
    display: none;
  }
  .show {
    display: block;
  }
  .edit {
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: #a9622a;
    cursor: pointer;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 16px;

    .name {
      input {
        width: 100%;
        height: 40px;
        padding: 0 16px;
        border: 1px solid #929292;
        border-radius: 4px;
      }
    }
    .email {
      span {
        color: #be8152;
        cursor: pointer;
      }
    }
    .birthday {
      select {
        width: 100%;
        height: 40px;
        padding: 0 16px;
        border: 1px solid #929292;
        border-radius: 4px;
      }
    }
    .gender {
      select {
        width: 100%;
        height: 40px;
        padding: 0 16px;
        border: 1px solid #929292;
        border-radius: 4px;
      }
    }
    .place {
      input {
        width: 100%;
        height: 40px;
        padding: 0 16px;
        border: 1px solid #929292;
        border-radius: 4px;
      }
    }
    .option {
      display: flex;
      justify-content: center;
      gap: 8px;
      .cancel {
        background: #eeeeee;
        width: 64px;
        border-radius: 10px;
        border: none;
        padding: 10px;
        cursor: pointer;
      }
      .save {
        background: #a9622a;
        width: 144px;
        color: white;
        border-radius: 10px;
        border: none;
        padding: 10px;
        cursor: pointer;
      }
    }
  }
`
