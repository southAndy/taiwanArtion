import { React } from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { breakpoint } from '../../styles/utils/breakpoint'
import BaseImageBox from '../../styles/base/BaseImageBox'
import { ProfileIcon } from '../../assets/images/backstage'
import { useSelector, useDispatch } from 'react-redux'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase.config'

const ProfileMenu = () => {
   const [isEdit, setIsEdit] = useState(false)
   const dispatch = useDispatch()
   const { memberInfo } = useSelector((slice) => slice.member)

   const userInfoList = {}

   function changeUserName(event) {
      userInfoList.name = event.target.value
   }

   function changeGender(event) {
      userInfoList.gender = event.target.value
   }

   function changeBirthday(event) {
      userInfoList.birthday = event.target.value
   }

   function UpdateUserInformation(event) {
      // 阻止表單預設行為
      event.preventDefault()

      dispatch({
         type: 'member/setMemberInfo',
         payload: {
            ...memberInfo,
            name: userInfoList.name || memberInfo.name,
            gender: userInfoList.gender,
            birthday: userInfoList.birthday,
         },
      })
      // 更新到 firestore
      const userRef = doc(db, 'users', memberInfo.uid)
      updateDoc(userRef, {
         name: userInfoList.name || memberInfo.name,
         gender: userInfoList.gender,
         birthday: userInfoList.birthday,
      })
         .then(() => {
            console.log('User information updated successfully in Firestore')
         })
         .catch((error) => {
            console.error('Error updating user information in Firestore:', error)
         })

      setIsEdit(false)
   }

   return (
      <StyledProfileMenu>
         <div className='title'>
            <div className='title-icon'>
               <BaseImageBox width={'24px'} height={'24px'}>
                  <img src={ProfileIcon} alt='userIcon0' />
               </BaseImageBox>
               <h1>個人檔案</h1>
            </div>
            <p>開始建立你的個人檔案吧！</p>
         </div>
         <StyledFormBox onSubmit={UpdateUserInformation} className='profile' action=''>
            <button type='button' className='edit' onClick={() => setIsEdit((n) => !n)}>
               編輯
            </button>
            <label htmlFor='name' className='name'>
               <p>姓名</p>
               <p className={`${isEdit ? 'none' : 'show'}`}>{memberInfo.name || '預設使用者'}</p>
               <ProfileInput
                  onBlur={changeUserName}
                  className={`${isEdit ? 'show' : 'none'}`}
                  type='text'
               />
            </label>
            {/* <label htmlFor='account' className='account'>
               <p>使用者帳號</p>
               <p>1222test</p>
            </label> */}
            <label htmlFor='emaul' className='email'>
               <p>註冊信箱</p>
               <p>{memberInfo.email}</p>
               {/* <span>變更電子信箱</span> */}
            </label>
            <label htmlFor='birthday' className='birthday'>
               <p>生日</p>
               <p className={`${isEdit ? 'none' : 'show'}`}>
                  {memberInfo.birthday || '尚未設定生日'}
               </p>
               <ProfileInput
                  onChange={changeBirthday}
                  type='date'
                  className={`${isEdit ? 'show' : 'none'}`}
               ></ProfileInput>
            </label>
            <label htmlFor='gender' className='gender'>
               <p>性別</p>
               <p className={`${isEdit ? 'none' : 'show'}`}>
                  {memberInfo.gender || '尚未設定性別'}
               </p>
               <ProfileSelect
                  onChange={changeGender}
                  name=''
                  id=''
                  className={`${isEdit ? 'show' : 'none'}`}
               >
                  <option value='male'>男性</option>
                  <option value='female'>女性</option>
                  <option value='other'>第三性</option>
               </ProfileSelect>
            </label>
            {/* <label htmlFor='place' className='place'>
               <p>居住地點</p>
               <p className={`${isEdit ? 'none' : 'show'}`}>高雄市</p>
               <input className={`${isEdit ? 'show' : 'none'}`} type='text' />
            </label> */}
            {isEdit ? (
               <div className='option'>
                  <ProfileButton onClick={() => setIsEdit(false)} className='cancel'>
                     取消
                  </ProfileButton>
                  <ProfileSave type='submit' className='save'>
                     儲存
                  </ProfileSave>
               </div>
            ) : null}
         </StyledFormBox>
      </StyledProfileMenu>
   )
}

export default ProfileMenu

const ProfileInput = styled.input.attrs({})`
   appearance: none; /* 移除瀏覽器預設外觀 */
   -webkit-appearance: none; /* 針對 WebKit 瀏覽器 */
   width: 100%;
   padding: 8px 16px;
   border: 1px solid #929292;
   border-radius: 8px;
   background: #ffffff;

   &:focus {
      outline: 1px solid #be875c;
   }
`
const ProfileButton = styled.button.attrs({})`
   appearance: none; /* 移除瀏覽器預設外觀 */
   -webkit-appearance: none; /* 針對 WebKit 瀏覽器 */
   background: #eeeeee;
   width: 50%;
   max-width: 144px;
   height: 40px;
   border-radius: 8px;
   border: none;
   padding: 10px;
   cursor: pointer;
   color: black;
   margin-right: 16px;

   @media (min-width: ${breakpoint.tablet}px) {
      width: 64px;
   }
`

const ProfileSave = styled(ProfileButton)`
   background: #a9622a;
   color: white;
`
const ProfileSelect = styled.select.attrs({})`
   appearance: none; /* 移除瀏覽器預設外觀 */
   -webkit-appearance: none; /* 針對 WebKit 瀏覽器 */
   background: #ffffff;
   border-radius: 8px;
`

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
            appearance: none; /* 移除瀏覽器預設外觀 */
            -webkit-appearance: none; /* 針對 WebKit 瀏覽器 */
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
