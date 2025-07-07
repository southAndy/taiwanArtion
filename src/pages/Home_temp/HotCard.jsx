import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FlexCenter from '../../styles/utils/FlexCenter.jsx'
import BaseImageBox from '../../styles/base/BaseImageBox.jsx'
import { breakpoint } from '../../styles/utils/breakpoint.js'
import { locationIcon } from '../../assets/images/index.js'
import {
  hotestNumber,
  hotestNumber2,
  hotestNumber3,
  hotestNumber4,
  hotestNumber5,
  defaultBannerTablet,
} from '../../assets/images/index.js'
import dayjs from 'dayjs'

const hotNumberList = [hotestNumber, hotestNumber2, hotestNumber3, hotestNumber4, hotestNumber5]

const ExhibitionCard = ({ data, rank }) => {
  return (
    <StyledCardContainer to={`/detail/${data.UID}`} className="hot">
      <BaseImageBox
        className="rank"
        width={'19px'}
        height={'19px'}
        tabletWidth={'53px'}
        tabletHeight={'31px'}
        desktopWidth={'35p'}
        desktopHeight={'35p'}
      >
        <img src={`${hotNumberList[rank]}`} alt={data.title} />
      </BaseImageBox>
      <BaseImageBox
        width={'60px'}
        height={'60px'}
        tabletWidth={'120px'}
        tabletHeight={'120px'}
        scale={'contain'}
      >
        <img src={data.imageUrl ? data.imageUrl : defaultBannerTablet} alt="" />
      </BaseImageBox>
      <StyledCardContent className="description">
        <h3 className="description-title">{data.title ?? '展覽名稱'}</h3>
        <StyledCardInfo>
          <p className="date">{`${dayjs(data.startDate).format('YYYY.MM.DD')}-${dayjs(
            data.endDate
          ).format('MM.DD')}`}</p>
          <BaseImageBox width={'16px'} height={'16px'} className="city">
            <img src={locationIcon} alt="縣市地址圖示" />
          </BaseImageBox>
          <p className="locate">{data?.showInfo[0]?.location.slice(0, 3) ?? '尚無資料'}</p>
        </StyledCardInfo>
      </StyledCardContent>
    </StyledCardContainer>
  )
}

export default ExhibitionCard

const StyledCardContainer = styled(Link)`
  ${FlexCenter};
  justify-content: start;
  align-items: center;
  gap: 16px;
  background-color: white;
  border-radius: 16px;
  padding: 20px 12px;
  margin-bottom: 6px;
  max-height: 92px;

  .rank {
    flex-shrink: 0;
    img {
      object-fit: contain;
    }
  }

  @media (min-width: ${breakpoint.tablet}px) {
    max-height: 170px;
  }
`
const StyledCardContent = styled.div`
  overflow: hidden;
  .description {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 4px;

    max-width: 191px;
    font-weight: 700;
    color: #453434;
  }
  & > div {
    flex-shrink: 0;
  }
  .description-title {
    max-width: 100%;
    font-size: 16px;
    font-weight: 500;
    color: #453434;
    text-align: start;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: unset; //移除預設
  }

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 18px;

    max-width: 100%;
    .date {
      color: #535353;
      font-weight: 400;
    }
    .locate {
      color: #535353;
      font-weight: 400;
    }
  }
`
const StyledCardInfo = styled.div`
  display: flex;
  flex-wrap: nowrap;
  font-size: 14px;
  white-space: nowrap;

  p {
    margin-right: 8px;
  }
  .city {
    margin-right: 2px;
  }
`
