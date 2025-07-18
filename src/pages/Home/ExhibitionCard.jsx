import styled from '@emotion/styled'
import BaseImageBox from '@styles/base/BaseImageBox'
import { PositionElement } from '@styles/base/PositionElement'
import { breakpoint } from '@styles/utils/breakpoint'
import { loveIcon, locationIcon, defaultBannerTablet, loveFullIcon } from '@assets/images'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { toggleFavoriteWithSync, isFavorited } from '@utils/favoriteUtils'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const AllExhibitionCard = ({ data }) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()
  const isLogin = useSelector(state => state.user.isLogin)
  const userInfo = useSelector(state => state.user.userInfo)
  
  // 檢查展覽是否還未開始
  const isUpcoming = dayjs(data.startDate).isAfter(dayjs(), 'day')

  // 監聽登入狀態變化，重新檢查收藏狀態
  useEffect(() => {
    if (isLogin) {
      setIsFavorite(isFavorited(data.UID))
    } else {
      setIsFavorite(false)
    }
  }, [isLogin, data.UID])

  const handleFavorite = async event => {
    event.stopPropagation()
    event.preventDefault()

    if (!isLogin) {
      navigate('/login')
      return
    }

    if (userInfo?.uid) {
      const success = await toggleFavoriteWithSync(data.UID, userInfo.uid)
      if (success) {
        // 操作成功後更新本地狀態
        setIsFavorite(isFavorited(data.UID))
      }
    }
  }
  return (
    <StyledLink to={`/detail/${data.UID}`} isUpcoming={isUpcoming}>
      <BaseImageBox width={'100%'} height={'180px'} tabletHeight={'202px'} className="exhibition">
        <img
          src={data.imageUrl ? data.imageUrl : defaultBannerTablet}
          alt=""
          className="rounded-lg"
        />
        <StyledPositionImageBox
          position={'absolute'}
          right={'2%'}
          top={'5%'}
          onClick={handleFavorite}
        >
          <img src={isFavorite ? loveFullIcon : loveIcon} alt="收藏按鈕" />
        </StyledPositionImageBox>
      </BaseImageBox>
      <h3>{data.title}</h3>
      <p className="text-xs date-info">
        {isUpcoming && <span className="upcoming-badge">即將開展</span>}
        {`${dayjs(data.startDate).format('YYYY.MM.DD')}-${dayjs(
          data.endDate
        ).format('MM.DD')}`}
      </p>
      <div className="locate flex">
        <BaseImageBox width={'16px'} height={'16px'} className="w-[16px] h-[16px]">
          <img src={locationIcon} alt="縣市地址圖示" />
        </BaseImageBox>
        <p className="location-content text-xs ">{data.showInfo[0].location.slice(0, 3)}</p>
      </div>
    </StyledLink>
  )
}

export default AllExhibitionCard

const StyledPositionImageBox = styled(PositionElement)`
  width: 20px;
  height: 20px;
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  border-radius: 16px;
  opacity: ${props => props.isUpcoming ? 0.7 : 1};
  cursor: pointer;
  /* 預留空間給 hover 效果，避免佈局偏移 */
  margin: 8px;
  /* 為所有卡片預留統一的邊框空間 */
  border: 2px solid transparent;
  
  &:hover {
    /* 使用 scale 替代 translateY，避免影響 Grid 佈局 */
    transform: ${props => props.isUpcoming ? 'scale(1.02)' : 'scale(1.05)'};
    /* 調整陰影，避免溢出太多 */
    box-shadow: ${props => props.isUpcoming ? '0 2px 12px rgba(153, 153, 153, 0.15)' : '0 4px 20px rgba(190, 135, 92, 0.2)'};
    
    h3 {
      color: ${props => props.isUpcoming ? '#666666' : '#be875c'};
    }
  }

  .exhibition {
    position: relative;
    border-radius: 16px;
    transition: all 0.3s ease;
    /* 移除 padding，改用 outline 避免 box model 影響 */
    ${props => props.isUpcoming && `
      filter: grayscale(30%);
      outline: 2px dashed #d9d9d9;
      outline-offset: -2px;
    `}
  }
  
  .locate {
    display: flex;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.isUpcoming ? '#999999' : 'inherit'};
  }

  h3 {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    width: 100%;
    transition: color 0.3s ease;
    color: ${props => props.isUpcoming ? '#999999' : '#535353'};
  }
  
  .date-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${props => props.isUpcoming ? '#999999' : 'inherit'};
    
    .upcoming-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 8px;
      background: #f5f5f5;
      color: #999999;
      border-radius: 12px;
      font-size: 10px;
      font-weight: 500;
      border: 1px solid #e0e0e0;
    }
  }
  
  @media (min-width: ${breakpoint.tablet}px) {
    flex-direction: column;
    /* 移除 max-width 限制，讓 Grid 自然決定寬度 */
    width: 100%;
  }
`
