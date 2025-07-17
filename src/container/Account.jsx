import { Link } from 'react-router-dom'
import { loginBannerMobile, logoWhite } from '../assets/images/index'
import styled from '@emotion/styled'
import Flex from '../styles/utils/Flex'
import { PositionElement } from '../styles/base/PositionElement'
import { breakpoint } from '../styles/utils/breakpoint'

const LoginPage = () => {
  return (
    <>
      <StyledLoginContainer>
        <StyledBanner>
          <img src={loginBannerMobile} alt="" />
          <FixedImage position={'absolute'} left={'50%'} top={'50%'}>
            <img src={logoWhite} alt="" />
          </FixedImage>
        </StyledBanner>
        <StyledContainer>
          <h3 className="title">歡迎來到早找展覽</h3>
          <p className="text-[14px] mt-1">開始探索下一段展覽之旅吧！</p>
          <div className="option">
            <StyledLoginLink to={'/login'}>登入</StyledLoginLink>
            <StyledLoginLink to={'/register'}>註冊</StyledLoginLink>
          </div>
          {/* <div className='society'>
                  <p className='mb-4'>或者使用以下帳號登入/註冊</p>
                  <div className='society-option'>
                     <StyledImageBox>
                        <img src={facebookIcon} alt='臉書圖示' />
                     </StyledImageBox>
                     <StyledImageBox>
                        <img src={googleIcon} alt='谷歌圖示' />
                     </StyledImageBox>
                     <StyledImageBox>
                        <img src={lineIcon} alt='Line圖示' />
                     </StyledImageBox>
                  </div>
               </div> */}
        </StyledContainer>
      </StyledLoginContainer>
    </>
  )
}

const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${1024}px) {
    flex-direction: row;
  }
`

const StyledBanner = styled.div`
  position: relative;
  height: 200px;

  @media (min-width: ${breakpoint.tablet}px) {
    height: 40vh;
    object-fit: contain;
  }
  @media (min-width: 1024px) {
    height: 100vh;
    width: 50%;
  }
`

const FixedImage = styled(PositionElement)`
  width: 216px;
  height: 80px;
  transform: translate(-50%, -50%);
`

const StyledContainer = styled.div`
  padding: 24px;

  .title {
    color: #be8152;
    font-size: 18px;
    font-weight: 700;
    margin: unset;
    margin-bottom: 8px;
  }
  .option {
    ${Flex}
    flex-direction:column;
    gap: 16px;
    margin-top: 40px;
  }

  .society {
    ${Flex};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    gap: 24px;
    color: #535353;
    cursor: pointer;

    &-title {
      margin-bottom: 16px;
    }
    &-option {
      ${Flex};
      justify-content: center;
      align-items: center;
      gap: 24px;
      cursor: pointer;
    }
  }
  @media (min-width: ${1024}px) {
    width: 50%;
    height: 100vh;
  }
`

const StyledImageBox = styled.div`
  height: 40px;
  width: 40px;
`

const StyledLoginLink = styled(Link)`
  border: 2px solid #a9622a;
  border-radius: 20px;
  padding: 16px;
  color: #a9622a;
  text-align: center;
  font-weight: 700;
  &:hover {
    background: #a9622a;
    color: #fff;
  }
`
export default LoginPage
