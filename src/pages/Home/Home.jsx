import { useEffect, useState, useMemo } from 'react'
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

const HomePage = () => {
  const monthList = fakeMonthList
  const [currentMonth, setMonth] = useState(new Date().getMonth() + 1)
  const [filterRule, setFilterRule] = useState('new')
  const { openData } = useSelector(state => state.common)
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
  }, [filterRule, filterData])

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
      <SwiperBanner data={filterData} />

      <StyledHotSection>
        <h3 className="title">熱門展覽</h3>
        <div className="content">
          <div>
            {hotData.map((data, index) => {
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
              <StyledExhibitionType key={index} onClick={() => setFilterRule(rule.value)}>
                {rule.name}
              </StyledExhibitionType>
            )
          })}
        </TypeWrapper>
        <div className="all">
          {filterExhibition.map((data, index) => {
            return <AllExhibitionCard key={index} data={data} />
          })}
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
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
  color: ${props => (props.isActive ? '#BE8152' : '#000')};
  background: ${props => (props.isActive ? '#BE8152' : '#eeee')};
  &:hover {
    background: #be875c;
    color: #fff;
  }
`

export default HomePage
