import { useEffect, useState, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import fakeMonthList from '@assets/data/month.json'
import { fetchData } from '@store/commonSlice.js'
import SwiperBanner from '@plugins/Swiper/SwiperSlide.jsx'
import { breakpoint } from '@styles/utils/breakpoint.js'
import { sortByDate, sortByHitRate } from '@utils/date.ts'
import { hotBg } from '@assets/images/index'
import AllExhibitionCard from './ExhibitionCard.jsx'
import ExhibitionCard from './HotCard.jsx'
import filterRules from '@assets/data/filterRules.json'
import { useVirtualizer } from '@tanstack/react-virtual'

const HomePage = () => {
  const monthList = fakeMonthList
  const [currentMonth, setMonth] = useState(new Date().getMonth() + 1)
  const [filterRule, setFilterRule] = useState('new')
  const { openData, isLoading } = useSelector(state => state.common)
  const dispatch = useDispatch()

  // 初次載入去抓資料
  useEffect(() => {
    dispatch(fetchData())
  }, [])

  // 當月份改變時篩選資料
  const filterData = useMemo(() => {
    const currentYear = new Date().getFullYear()
    const targetDate = dayjs(`${currentYear}-${String(currentMonth).padStart(2, '0')}-01`)

    const currentMonthData = openData
      .filter(data => {
        const startDate = dayjs(data.startDate)
        const hasImage = Boolean(data.imageUrl)

        return (startDate.isAfter(targetDate) || startDate.isSame(targetDate, 'month')) && hasImage
      })
      .slice(0, 12)

    if (currentMonthData.length === 0) {
      return openData.slice(0, 12)
    } else {
      return currentMonthData
    }
  }, [currentMonth, openData])

  // 最熱門展覽
  const hotData = useMemo(() => {
    // hitRate 代表點擊次數
    return [...openData]
      .filter(data => data.imageUrl)
      .sort((a, b) => b.hitRate - a.hitRate)
      .slice(0, 5)
  }, [openData])

  // 過濾展覽
  const filterExhibition = useMemo(() => {
    if (filterRule === 'new') {
      return [...openData].sort(sortByDate)
    } else if (filterRule === 'hot') {
      return [...openData].sort(sortByHitRate)
    }
    return [...openData].sort(sortByDate)
  }, [filterRule, openData])

  // virtual scroll
  const allExhibitionParent = useRef()
  const virtualColumns = 4
  const virtualizer = useVirtualizer({
    getScrollElement: () => allExhibitionParent.current,
    count: Math.ceil(filterExhibition.length / virtualColumns),
    estimateSize: () => 280,
  })

  return (
    <>
      <StyledMonthWrapper>
        <h3 className="title">{new Date().getFullYear()}年</h3>
        <StyledMonthBox>
          {monthList.map((month, index) => {
            return (
              <StyledMonthText
                onClick={() => setMonth(() => month.number)}
                isActive={currentMonth === month.number}
                key={index}
              >
                {month.number}月<br />
                {month.en}
              </StyledMonthText>
            )
          })}
        </StyledMonthBox>
      </StyledMonthWrapper>
      {isLoading ? (
        <SwiperLoadingContainer>
          {Array.from({ length: 3 }).map((_, index) => (
            <SwiperCardLoadingSkeleton key={index} />
          ))}
        </SwiperLoadingContainer>
      ) : (
        <SwiperBanner data={filterData} />
      )}

      <StyledHotSection>
        <h3 className="title">熱門展覽</h3>
        <div className="content">
          <div>
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => <HotCardLoadingSkeleton key={index} />)
              : hotData.map((data, index) => {
                  return <ExhibitionCard data={data} rank={index} key={data.UID} />
                })}
          </div>
        </div>
      </StyledHotSection>
      <StyledAllExhibitionWrapper>
        <h3 className="title font-medium mb-4 text-xl w-[100%]">所有展覽</h3>
        <TypeWrapper className="menu">
          {filterRules.map((rule, index) => {
            return (
              <StyledExhibitionType
                key={index}
                isActive={filterRule === rule.value}
                onClick={() => setFilterRule(rule.value)}
              >
                {rule.name}
              </StyledExhibitionType>
            )
          })}
        </TypeWrapper>
        <div
          ref={allExhibitionParent}
          className="h-[600px] overflow-auto"
          style={{
            contain: 'strict',
            position: 'relative',
          }}
        >
          {isLoading ? (
            <div className="flex flex-col gap-4 p-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <ExhibitionCardLoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div
              style={{
                height: virtualizer.getTotalSize(),
                width: '100%',
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map(virtualRow => (
                <div
                  key={virtualRow.key}
                  ref={virtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${virtualColumns}, 1fr)`,
                    gap: '16px',
                  }}
                >
                  {Array.from({ length: virtualColumns }, (_, colIndex) => {
                    const itemIndex = virtualRow.index * virtualColumns + colIndex
                    const item = filterExhibition[itemIndex]
                    return item ? <AllExhibitionCard key={item.UID} data={item} /> : null
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </StyledAllExhibitionWrapper>
    </>
  )
}

const StyledMonthWrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 24px 24px 0 24px;

  .title {
    margin: 0; //移除預設
    margin-bottom: 8px;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    padding: 0 40px;
    margin-top: 56px;

    .title {
      font-size: 32px;
      text-align: center;
      margin-bottom: 24px;
    }
  }
`

const StyledMonthBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 12px;
  gap: 1px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none; /* For Chrome, Edge, and Safari */
  }

  scrollbar-width: none;

  @media (min-width: ${breakpoint.tablet}px) {
    font-size: 14px;
    justify-content: space-between;
  }
`
const StyledMonthText = styled.p`
  cursor: pointer;
  border-radius: 4px;
  white-space: nowrap;
  width: 100%;
  padding: 8px;
  background: ${props => (props.isActive ? '#BE8152' : 'white')};
  color: ${props => (props.isActive ? '#fff' : '#000')};
  &:hover {
    background: #be875c;
    color: #fff;
    bordr-radius: 4px;
  }
`

const StyledHotSection = styled.section`
  background-image: url(${hotBg});
  background-size: cover;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .content {
    .highlight {
      display: none;
      gap: 24px;
    }
  }

  @media (min-width: ${breakpoint.tablet}px) {
    padding: 40px;

    .title {
      font-size: 36px;
      text-align: center;
      margin-bottom: 32px;
    }
  }
  @media (min-width: ${breakpoint.desktop}px) {
    padding: 40px 120px;

    .content {
      .highlight {
        display: flex;
      }
    }
  }

  .top {
    display: none;
  }
`

const StyledAllExhibitionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 100%;
  background: #f9f9f9;

  .all {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 8px;
    /* 調整 padding 以配合卡片的 margin */
    padding: 0 8px;
  }
  .title {
    text-align: start;
  }

  @media (min-width: ${breakpoint.tablet}px) {
    .title {
      font-size: 36px;
      text-align: center;
      margin: 0;
      margin-bottom: 32px;
    }
    .menu {
      justify-content: center;
    }
    .all {
      justify-content: space-between;
    }
  }
`

const TypeWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
  gap: 8px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledExhibitionType = styled.div`
  max-height: 35px;
  border-radius: 10px;
  font-size: 14px;
  padding: 8px 16px;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  color: ${props => (props.isActive ? '#fff' : '#000')};
  background: ${props => (props.isActive ? '#BE8152' : '#eeee')};
  &:hover {
    background: #be875c;
    color: #fff;
  }
`

// Loading 組件
const LoadingSkeleton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

const SwiperLoadingContainer = styled.div`
  position: relative;
  padding: 16px;
  height: auto;
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  @media (min-width: ${breakpoint.tablet}px) {
    height: 470px;
    padding: 20px;
    justify-content: center;
    align-items: center;
  }
`

const SwiperCardLoadingSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  box-shadow: 0px 1px 8px 2px #0000001a;
  border-radius: 12px;
  background: white;
  flex-shrink: 0;
  gap: 8px;
  min-width: 267px;

  /* 圖片區域 Loading */
  &::before {
    content: '';
    height: 170px;
    width: 100%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 8px;
  }

  /* 標題區域 Loading */
  &::after {
    content: '';
    height: 20px;
    width: 80%;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    margin-top: 8px;
  }

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @media (min-width: ${breakpoint.tablet}px) {
    min-width: 448px;
    align-items: flex-start;

    &::before {
      height: 280px;
    }

    &::after {
      height: 24px;
      width: 60%;
    }
  }

  @media (min-width: ${breakpoint.desktop}px) {
    min-width: 475px;

    &::before {
      height: 300px;
    }
  }
`

const HotCardLoadingSkeleton = styled(LoadingSkeleton)`
  height: 80px;
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
  padding: 12px;

  &::before {
    content: '';
    width: 56px;
    height: 56px;
    background: #d0d0d0;
    border-radius: 4px;
    flex-shrink: 0;
  }

  &::after {
    content: '';
    flex: 1;
    background: #d0d0d0;
    border-radius: 4px;
  }
`

const ExhibitionCardLoadingSkeleton = styled(LoadingSkeleton)`
  height: 200px;
  width: 100%;
  margin-bottom: 24px;

  @media (min-width: ${breakpoint.tablet}px) {
    height: 250px;
  }
`

export default HomePage
