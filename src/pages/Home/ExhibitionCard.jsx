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
    <StyledLink to={`/detail/${data.UID}`}>
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
      <p className="text-xs">{`${dayjs(data.startDate).format('YYYY.MM.DD')}-${dayjs(
        data.endDate
      ).format('MM.DD')}`}</p>
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

  .exhibition {
    position: relative;
    border-radius: 16px;
  }
  .locate {
    display: flex;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  h3 {
    margin: 0; //移除預設
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    width: 100%;
  }
  @media (min-width: ${breakpoint.tablet}px) {
    flex-direction: row;
  }
`
