import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const CalendarContainer = styled.div`
  max-width: 100vw;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 16px;
  }

  @media (max-width: 576px) {
    .mobile-next-btn {
      display: block !important;
    }
  }
`

const ClearButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  color: #666;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 16px;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`

const MonthContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 16px;
  width: 100%;
  max-width: 800px;

  /* 在螢幕寬度小於 576px 時，僅顯示當月 */
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 16px;
  }
`

const CalendarWrapper = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #f0f0f0;

  /* 在螢幕寬度小於 576px 且不是第一個月時隱藏 */
  &:nth-of-type(2) {
    @media (max-width: 576px) {
      display: none;
    }
  }

  @media (max-width: 576px) {
    padding: 12px;
  }
`

const QuickSelectButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 800px;

  h3 {
    margin: 0 0 8px 0;
    flex-basis: 100%;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }
`

const QuickButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  width: 100%;
`

const CalendarHeader = styled.div`
  font-weight: 600;
  text-align: center;
  padding: 12px 0;
  color: #666;
  font-size: 14px;
`

const CalendarDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 8px;
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  background-color: ${props => {
    if (props.isDisabled) return 'transparent'
    if (props.isSelectedStart || props.isSelectedEnd) return '#BE8152'
    if (props.isInRange) return '#F0E8DC'
    return 'transparent'
  }};

  color: ${props => {
    if (props.isDisabled) return '#ccc'
    if (props.isSelectedStart || props.isSelectedEnd) return 'white'
    if (props.isNextMonth) return '#999'
    return '#333'
  }};

  border: ${props => {
    if (props.isSelectedStart || props.isSelectedEnd) return '2px solid #BE8152'
    return '2px solid transparent'
  }};

  opacity: ${props => (props.isDisabled ? 0.4 : 1)};

  &:hover {
    background-color: ${props => {
      if (props.isDisabled) return 'transparent'
      if (props.isSelectedStart || props.isSelectedEnd) return '#BE8152'
      if (props.isInRange) return '#F0E8DC'
      return '#F5F5F5'
    }};

    transform: ${props => (props.isDisabled ? 'none' : 'scale(1.05)')};
  }
`

const Calendar = ({ setModlaShow, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState({ start: null, end: null })
  const navigate = useNavigate()

  // 回傳選中的日期範圍給父元件
  useEffect(() => {
    if (onDateSelect) {
      const { start, end } = selectedDates
      // 確保 start 永遠是較早的日期，end 永遠是較晚的日期
      let actualStart = start
      let actualEnd = end

      if (start && end && start > end) {
        actualStart = end
        actualEnd = start
      }

      onDateSelect({
        startDate: actualStart ? actualStart.toLocaleDateString('sv-SE') : null,
        endDate: actualEnd ? actualEnd.toLocaleDateString('sv-SE') : null,
      })
    }
  }, [selectedDates, onDateSelect])

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  const getCalendarDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const totalDays = daysInMonth(year, month)

    const days = []
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null) // 前置空白
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const handleDateClick = date => {
    // 檢查是否為下個月的日期（不可選擇）
    const currentYear = currentMonth.getFullYear()
    const currentMonthIndex = currentMonth.getMonth()
    const nextMonth = new Date(currentYear, currentMonthIndex + 1)

    if (
      date.getMonth() === nextMonth.getMonth() &&
      date.getFullYear() === nextMonth.getFullYear()
    ) {
      return // 下個月日期不可選擇
    }

    if (!selectedDates.start || selectedDates.end) {
      // 開始新的選擇或重新選擇
      setSelectedDates({ start: date, end: null })
    } else {
      // 設定結束日期
      const startDate = selectedDates.start
      const endDate = date

      // 確保結束日期不早於開始日期
      if (endDate < startDate) {
        setSelectedDates({ start: endDate, end: startDate })
      } else {
        setSelectedDates({ start: startDate, end: endDate })
      }
    }
  }

  const isInRange = date => {
    const { start, end } = selectedDates
    return start && end && date > start && date < end
  }

  const isNextMonthDate = date => {
    const currentYear = currentMonth.getFullYear()
    const currentMonthIndex = currentMonth.getMonth()
    const nextMonth = new Date(currentYear, currentMonthIndex + 1)
    return (
      date.getMonth() === nextMonth.getMonth() && date.getFullYear() === nextMonth.getFullYear()
    )
  }

  const clearSelection = () => {
    setSelectedDates({ start: null, end: null })
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const currentYear = currentMonth.getFullYear()
  const currentMonthIndex = currentMonth.getMonth()

  const firstMonthDays = getCalendarDays(currentYear, currentMonthIndex)
  const secondMonthDays = getCalendarDays(currentYear, currentMonthIndex + 1)

  return (
    <CalendarContainer>
      {/* 清除選擇按鈕 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <ClearButton onClick={clearSelection}>清除選擇</ClearButton>
      </div>

      {/* 快速選擇區 */}
      <QuickSelectButtons>
        <h3>日期</h3>
        <QuickButton
          onClick={() => {
            const today = new Date()
            setSelectedDates({ start: today, end: today })
          }}
        >
          今天
        </QuickButton>
        <QuickButton
          onClick={() => {
            const today = new Date()
            const saturday = new Date(today.getTime() + (6 - today.getDay()) * 24 * 60 * 60 * 1000)
            const sunday = new Date(saturday.getTime() + 24 * 60 * 60 * 1000)
            setSelectedDates({ start: saturday, end: sunday })
          }}
        >
          本週末
        </QuickButton>
      </QuickSelectButtons>

      {/* 月份顯示 */}
      <MonthContainer>
        {/* 第一個月份 */}
        <CalendarWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <button
              onClick={goToPreviousMonth}
              style={{
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              &lt;
            </button>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
              {currentYear}年 {currentMonthIndex + 1}月
            </span>
            <button
              onClick={goToNextMonth}
              style={{
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                display: 'none',
              }}
              className="mobile-next-btn"
            >
              &gt;
            </button>
          </div>
          <CalendarGrid>
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <CalendarHeader key={day}>{day}</CalendarHeader>
            ))}
            {firstMonthDays.map((day, index) => (
              <CalendarDay
                key={index}
                onClick={() => day && handleDateClick(day)}
                isSelectedStart={day && selectedDates.start?.toDateString() === day.toDateString()}
                isSelectedEnd={day && selectedDates.end?.toDateString() === day.toDateString()}
                isInRange={day && isInRange(day)}
                isNextMonth={day && isNextMonthDate(day)}
                isDisabled={day && isNextMonthDate(day)}
              >
                {day ? day.getDate() : ''}
              </CalendarDay>
            ))}
          </CalendarGrid>
        </CalendarWrapper>

        {/* 第二個月份 */}
        <CalendarWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <div style={{ width: '40px' }}></div>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
              {currentYear}年 {currentMonthIndex + 2}月
            </span>
            <button
              onClick={goToNextMonth}
              style={{
                background: 'none',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              &gt;
            </button>
          </div>
          <CalendarGrid>
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <CalendarHeader key={day}>{day}</CalendarHeader>
            ))}
            {secondMonthDays.map((day, index) => (
              <CalendarDay
                key={index}
                onClick={() => day && handleDateClick(day)}
                isSelectedStart={day && selectedDates.start?.toDateString() === day.toDateString()}
                isSelectedEnd={day && selectedDates.end?.toDateString() === day.toDateString()}
                isInRange={day && isInRange(day)}
                isNextMonth={true}
                isDisabled={true}
              >
                {day ? day.getDate() : ''}
              </CalendarDay>
            ))}
          </CalendarGrid>
        </CalendarWrapper>
      </MonthContainer>
    </CalendarContainer>
  )
}

export default Calendar
