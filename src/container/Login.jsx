import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLogin, login } from '../store/userSlice'
import styled from 'styled-components'
import { hotBg, vectorIcon, warnIcon } from '../assets/images/index'
import StyledInput from '../components/StyledInput'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../firebase.config'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import BaseImageBox from '../styles/base/BaseImageBox'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.user.isLogin)

  const schema = yup.object().shape({
    email: yup.string().email('請輸入有效的信箱格式').required('此欄位為必填'),
    password: yup.string().required('此欄位為必填'),
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  useEffect(() => {
    console.log('isLogin', isLogin)
    if (isLogin) {
      navigate('/backstage')
    }
  }, [isLogin])

  async function getUserInfo(uid) {
    try {
      const userDatas = doc(db, 'users', uid)
      const docSnap = await getDoc(userDatas)
      // 存入 redux
      dispatch({ type: 'user/setUserInfo', payload: docSnap.data() })
    } catch (e) {
      console.log(e)
    }
  }

  const sendLoginRequest = async data => {
    const { email, password } = data
    try {
      // 使用信箱和密碼進行驗證
      dispatch(login({ email, password }))
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const loginLine = () => {
    const channel_id = '2003812489'
    const homePage = 'https://2439-111-241-166-18.ngrok-free.app/?isLogin=true'
    const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${channel_id}&redirect_uri=${homePage}&state=12345abcde&scope=profile&nonce=09876xyz`

    //登入成功後，將登入狀態改為 true ，並且存入 redux
    dispatch(setIsLogin(true))
    window.location.href = lineLoginUrl
    //將登入成功存入 cookie
    document.cookie = 'isLogin=true'
  }
  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      console.log(user)
      // todo 增加成員的處理
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <StyledLoginBanner>
        <StyledLink to="/account">
          <img src={vectorIcon} alt="回到上一頁箭頭" />
        </StyledLink>
        <StyledTitle className="text-md">會員登入</StyledTitle>
      </StyledLoginBanner>
      <StyledContent>
        <form onSubmit={handleSubmit(sendLoginRequest)}>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium mb-2">
              電子郵件
            </label>
            <StyledInput {...register('email')} placeholder="請輸入您的電子郵件"></StyledInput>
            {errors.email ? (
              <StyledErrorBox>
                <BaseImageBox width={'20px'} height={'20px'}>
                  <img src={warnIcon} alt="" />
                </BaseImageBox>
                <span className="text-[#D31C1C]">{errors.email?.message}</span>
              </StyledErrorBox>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2 font-medium">
              密碼
            </label>
            <StyledInput
              {...register('password')}
              type={'password'}
              placeholder="6-18位數密碼,請區分大小寫"
            ></StyledInput>
            {errors.password ? (
              <StyledErrorBox>
                <BaseImageBox width={'20px'} height={'20px'}>
                  <img src={warnIcon} alt="" />
                </BaseImageBox>
                <span className="text-[#D31C1C]">{errors.password?.message}</span>
              </StyledErrorBox>
            ) : (
              ''
            )}
          </div>
          {/* <StyledForgetLink to='/forget-password'>忘記密碼？</StyledForgetLink> */}
          <Button buttonType={'submit'} content={'登入'} />
        </form>
        <section className="remind">
          <div>
            <span>還不是會員？</span>
            <Link to="/register" className="text-[#A9622A]">
              註冊帳號
            </Link>
          </div>
          {/* <p className=' cursor-pointer'>或者使用以下方式登入</p>
               <div className='society'>
                  <StyledImageBox>
                     <img src={facebookIcon} alt='' />
                  </StyledImageBox>
                  <StyledImageBox onClick={loginGoogle}>
                     <img src={googleIcon} alt='' />
                  </StyledImageBox>
                  <StyledImageBox onClick={loginLine}>
                     <img src={lineIcon} alt='' />
                  </StyledImageBox>
               </div> */}
        </section>
      </StyledContent>
    </>
  )
}
const StyledErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 4px;
`

const StyledLink = styled(Link)`
  width: 18px;
  height: 18px;
`
const StyledForgetLink = styled(Link)`
  color: #a9622a;
  width: 85px;
  margin-left: auto;
`

const StyledLoginBanner = styled.section`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 90px;
  padding: 20px;
  background-image: url(${hotBg});
  height: 100px;
`
const StyledTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
`
const StyledContent = styled.section`
  border-radius: 16px;
  padding: 24px;

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 40px;
  }
  button {
    border-radius: 20px;
    border: none;
    background-color: #eeeeee;
    color: #5f5f5f;
    padding: 9px 0;
    cursor: pointer;

    &:hover {
      background-color: #a9622a;
      color: white;
    }
  }
  .remind {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    a {
      color: #a9622a;
    }
  }
  .society {
    display: flex;
    gap: 24px;
  }
`
const StyledImageBox = styled.div`
  cursor: pointer;
  height: 40px;
  width: 40px;
`

export default Login
