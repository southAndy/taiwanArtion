import { Link } from 'react-router-dom'
import { notfindBg } from '@assets/images'
import styled from '@emotion/styled'

export default function ErrorPage() {
  return (
    <>
      <ErrorContainer>
        <div className="photo">
          <img src={notfindBg} alt="" />
        </div>
        <div className="content">
          <h1 className="">Oops！ 找不到你說的那一頁</h1>
          <h3>是否要回到首頁？或是點擊上方導覽列開啟旅程！</h3>
          <Link to="/" className="">
            首頁
          </Link>
        </div>
      </ErrorContainer>
    </>
  )
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .photo {
    height: 300px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    h1 {
      font-size: 24px;
      font-weight: bold;
    }
    h3 {
      font-size: 16px;
    }
    a {
      text-decoration: none;
      background: #a9622a;
      color: white;
      padding: 1rem;
      border-radius: 5px;
      font-size: 16px;
      width: 100%;
      text-align: center;
    }
  }
`
