import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BaseImageBox from '@styles/base/BaseImageBox'
import {
  calendarIcon,
  shareIcon,
  sampleResult,
  vectorIcon,
  loveIcon,
  loveFullIcon,
} from '@assets/images'
import styled from '@emotion/styled'
import { breakpoint } from '@styles/utils/breakpoint'
import { fetchData } from '@store/commonSlice'
import Skeleton from '@components/Skeleton'
import { isFavorited } from '@utils/favoriteUtils'
import AuthModal from '@container/Auth/AuthModal'
import { useBreakpoint } from '@hooks/useBreakpoint'
import ShareModal from './components/ShareModal'

export default function DetailPage() {
  const params = useParams()
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false) // 聯動收藏愛心 icon
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const dispatch = useDispatch()
  const openData = useSelector(state => state.common.openData)
  const user = useSelector(state => state.user.userInfo)
  const isLogin = useSelector(state => state.user.isLogin)
  const isLoading = useSelector(state => state.common.isLoading)
  const { isDesktop, screenSize } = useBreakpoint()

  useEffect(() => {
    // need to login to check favorite state
    if (isLogin) {
      setIsFavorite(isFavorited(params.id))
    } else {
      setIsFavorite(false)
    }
  }, [isLogin, params.id])

  useEffect(() => {
    if (openData.length === 0) {
      dispatch(fetchData())
    }
  }, [])

  // 新增展覽資料到 localStorage
  function addExhibition() {
    // 取得現有資料
    const data = JSON.parse(localStorage.getItem('favoriteExhibitions')) || []

    // 檢查是否已存在該展覽（以 id 判斷）
    if (data.find(item => item === params.id)) {
      return
    }

    // 新增展覽到資料中
    data.push(params.id)

    // 更新 localStorage
    localStorage.setItem('favoriteExhibitions', JSON.stringify(data))
  }
  // 刪除展覽資料
  function deleteExhibition() {
    const data = JSON.parse(localStorage.getItem('favoriteExhibitions')) || []

    // 過濾掉要刪除的展覽
    const updatedData = data.filter(item => item !== params.id)

    // 更新 localStorage
    localStorage.setItem('favoriteExhibitions', JSON.stringify(updatedData))
  }

  const handleShare = () => {
    setIsOpen(true)
  }

  function handleAddExhibition() {
    // 先判斷是否登入
    if (!isLogin) {
      // 桌機版顯示彈窗，手機版導向登入頁面
      // 使用平板以上就顯示彈窗 (screenSize >= 768)
      if (screenSize >= 768) {
        setShowAuthModal(true)
      } else {
        navigate('/login', { state: { from: `/detail/${params.id}` } })
      }
      return
    }
    if (isFavorite) {
      deleteExhibition()
    } else {
      addExhibition()
    }
    setIsFavorite(n => !n)
  }
  // 提取時間的輔助函數
  const extractTime = dateTimeString => {
    if (!dateTimeString) return ''
    return dateTimeString.split(' ')[1]?.slice(0, 5) || ''
  }

  // 當前展覽資料
  const currentData = useMemo(() => {
    return openData.filter(item => item.UID === params.id)
  }, [openData])

  return (
    <>
      <DetailContainer>
        <DetailBanner>
          <div className="back">
            <BaseImageBox width={'14px'} height={'14px'}>
              <img src={vectorIcon} alt="" />
            </BaseImageBox>
            <StyledReturnButton onClick={() => navigate(-1)}>返回上一頁</StyledReturnButton>
          </div>
          {isLoading || currentData.length === 0 ? (
            <Skeleton variant="card" height="245px" radius="12px" />
          ) : (
            <BaseImageBox height={'245px'} tabletHeight={'280px'}>
              <img
                className="rounded-xl"
                src={currentData[0]?.imageUrl ? currentData[0]?.imageUrl : sampleResult}
              />
            </BaseImageBox>
          )}

          <h3 className="title text-[24px] font-bold">{currentData[0]?.title}</h3>
        </DetailBanner>

        <section className="menu">
          <DetailOption isActive={true} href="#overview">
            總覽
          </DetailOption>
          <DetailOption isActive={false} href="#introduce">
            簡介
          </DetailOption>
        </section>

        <StyledOverviewBox>
          <StyledInfoTitle id="overview">總覽</StyledInfoTitle>
          {isLoading || currentData.length === 0 ? (
            <Skeleton variant="card" height="245px" width={'20%'} radius="12px" />
          ) : (
            <div className="info">
              <div className="info-option">
                <div>展覽日期</div>
                <div>{`${currentData[0]?.startDate} - ${currentData[0]?.endDate}`}</div>
              </div>
              <div className="info-option">
                <div>營業時間</div>
                <div>{`${extractTime(currentData[0]?.showInfo[0]?.time)} - ${extractTime(
                  currentData[0]?.showInfo[0]?.endTime
                )}`}</div>
              </div>
              <div className="info-option">
                <div>主辦單位</div>
                <div>{currentData[0]?.showUnit}</div>
              </div>
              <div className="info-option">
                <div>展覽官網</div>
                <a
                  href={currentData[0]?.sourceWebPromote ?? ''}
                  target="_blank"
                  className="flex text-blue-300 "
                >
                  {currentData[0]?.sourceWebPromote ?? '-'}
                </a>
              </div>
            </div>
          )}

          <TabletToolBar>
            <div className="option" onClick={handleAddExhibition}>
              <BaseImageBox width={'24px'} height={'24px'}>
                <img src={isFavorite ? loveFullIcon : loveIcon} alt="收藏此展覽按鈕" />
              </BaseImageBox>
              <div>收藏展覽</div>
            </div>
            <div className="option" onClick={handleShare}>
              <BaseImageBox width={'24px'} height={'24px'}>
                <img src={shareIcon} alt="分享此展覽按鈕" />
              </BaseImageBox>
              <div>分享展覽</div>
            </div>
            {/* <div className="option">
              <BaseImageBox width={'24px'} height={'24px'}>
                <img src={calendarIcon} alt="點擊按鈕，將展覽加入自己的行事曆" />
              </BaseImageBox>
              <div>加入月曆</div>
            </div> */}
          </TabletToolBar>
        </StyledOverviewBox>

        <StyledContent>
          <StyledInfoTitle id="introduce">展覽介紹</StyledInfoTitle>
          {isLoading || currentData.length === 0 ? (
            <Skeleton variant="card" height="245px" radius="12px" />
          ) : (
            <p>{currentData[0]?.descriptionFilterHtml}</p>
          )}
        </StyledContent>

        {!isLoading && currentData.length > 0 && currentData[0]?.webSales ? (
          <StyledInfo>
            <StyledInfoTitle id="price">展覽票價</StyledInfoTitle>
            <p>{currentData[0]?.webSales}</p>
          </StyledInfo>
        ) : (
          ''
        )}

        <StyledInfo>
          <StyledInfoTitle id="place"></StyledInfoTitle>
        </StyledInfo>
      </DetailContainer>

      <StyledToolBar>
        <div className="option" onClick={handleAddExhibition}>
          <BaseImageBox width={'24px'} height={'24px'}>
            <img src={isFavorite ? loveFullIcon : loveIcon} alt="收藏此展覽按鈕" />
          </BaseImageBox>
          <div>收藏展覽</div>
        </div>
        <div className="option" onClick={() => setIsOpen(pre => !pre)}>
          <BaseImageBox width={'24px'} height={'24px'}>
            <img src={shareIcon} alt="分享此展覽按鈕" />
          </BaseImageBox>
          <div>分享展覽</div>
        </div>
      </StyledToolBar>

      <AuthModal isShow={showAuthModal} setShow={setShowAuthModal} initialMode="login" />
      <ShareModal isOpen={isOpen} onClose={handleClose} exhibitionData={currentData[0]} />
    </>
  )
}

const TabletToolBar = styled.div`
  display: none;

  @media (min-width: ${breakpoint.tablet}px) {
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    gap: 24px;
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0px 2px 7px 0px #0000001a;
  }

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }
`
const StyledReturnButton = styled.div`
  cursor: pointer;
`

const DetailTitle = styled.h3`
  border-left: 10px solid #986f4f;
  // border-radius: 10px 10px;
  font-family: 'Noto Sans TC';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 35px;
  color: #986f4f;
`
const DetailContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
  .menu {
    display: flex;
    gap: 32px;
    margin-bottom: 40px;
  }
  @media (min-width: ${breakpoint.tablet}px) {
    padding: 24px 40px;
  }
`
const DetailBanner = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  align-items: center;

  .back {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    align-self: flex-start;
    border-radius: 20px;
  }
  .title {
    font-weight: 700;
    font-size: 24px;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    .title {
      font-size: 36px;
    }
  }
`
const DetailOption = styled.a`
  display: flex;
  color: #929292;
  cursor: pointer;

  &:hover {
    color: #be8152;
  }
`

const StyledInfo = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`

const StyledOverviewBox = styled(StyledInfo)`
  position: relative; // 用於設定平版以上的固定按鈕

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: #535353;
    &-option {
      display: flex;
      gap: 12px;
    }
  }
`
const StyledContent = styled(StyledInfo)`
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 35px;
    color: #535353;
    font-family: Noto Sans TC;
    text-align: left;
    text-underline-position: from-font;
    text-decoration-skip-ink: none;
  }
`

const StyledInfoTitle = styled.a`
  font-size: 18px;
  font-weight: 700;
  color: #bd7e4c;
  padding-left: 4px;
  margin-bottom: 16px;
  font-family: Noto Sans TC;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 24px;
  }
`
const StyledToolBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center; //todo 等月曆功能完成後，調整 space-between
  gap: 24px;
  background-color: #ffffff;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
  padding: 8px 32px;

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    display: none;

    .option {
      justify-content: center;
    }
  }
`
