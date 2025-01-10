import React, { useState } from 'react'
import styled from 'styled-components'

const CalendarContainer = styled.div`
   max-width: 100vw;
   margin: 0 auto;
   font-family: Arial, sans-serif;
   display: flex;
   flex-direction: column;
   align-items: center;
`

const MonthContainer = styled.div`
   display: flex;
   justify-content: space-between;
   gap: 16px;
   margin-bottom: 16px;
   width: 100%;

   /* 在螢幕寬度小於 576px 時，僅顯示當月 */
   @media (max-width: 576px) {
      flex-direction: column;
   }
`

const CalendarWrapper = styled.div`
   flex: 1;
   width: 100%;
   /* 在螢幕寬度小於 576px 且不是第一個月時隱藏 */
   &:nth-child(2) {
      @media (max-width: 576px) {
         display: none;
      }
   }
`

const QuickSelectButtons = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 16px;
`

const QuickButton = styled.button`
   padding: 8px 16px;
   font-size: 14px;
   background-color: #f5f5f5;
   border: 1px solid #ccc;
   border-radius: 4px;
   cursor: pointer;
   &:hover {
      background-color: #e0e0e0;
   }
`

const CalendarGrid = styled.div`
   display: grid;
   grid-template-columns: repeat(7, 1fr);
   gap: 8px;
`

const CalendarHeader = styled.div`
   font-weight: bold;
   text-align: center;
   padding: 8px 0;
   border-radius: 4px;
`

const CalendarDay = styled.div`
   text-align: center;
   padding: 12px 0;
   border-radius: 4px;
   cursor: pointer;
   background-color: ${(props) =>
      props.isSelectedStart || props.isSelectedEnd
         ? '#BE8152'
         : props.isInRange
         ? '#C2C2C2'
         : '#fff'};
   color: ${(props) => (props.isSelectedStart || props.isSelectedEnd ? 'white' : 'inherit')};
   &:hover {
      background-color: ${(props) =>
         props.isSelectedStart || props.isSelectedEnd || props.isInRange ? null : '#eee'};
   }
`

const Calendar = () => {
   const [currentMonth, setCurrentMonth] = useState(new Date())
   const [selectedDates, setSelectedDates] = useState({ start: null, end: null })

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

   const handleDateClick = (date) => {
      if (!selectedDates.start || selectedDates.end) {
         setSelectedDates({ start: date, end: null })
      } else {
         setSelectedDates({ start: selectedDates.start, end: date })
      }
   }

   const isInRange = (date) => {
      const { start, end } = selectedDates
      return start && end && date > start && date < end
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
         {/* 快速選擇區 */}
         <QuickSelectButtons>
            <h3>日期</h3>
            <QuickButton onClick={() => setSelectedDates({ start: new Date(), end: null })}>
               今天
            </QuickButton>
            <QuickButton>明天</QuickButton>
            <QuickButton>本週</QuickButton>
            <QuickButton>本週末</QuickButton>
         </QuickSelectButtons>

         {/* 月份顯示 */}
         <MonthContainer>
            {/* 第一個月份 */}
            <CalendarWrapper>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <button onClick={goToPreviousMonth}>&lt;</button>
                  <span>
                     {currentYear}年 {currentMonthIndex + 1}月
                  </span>
               </div>
               <CalendarGrid>
                  {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                     <CalendarHeader key={day}>{day}</CalendarHeader>
                  ))}
                  {firstMonthDays.map((day, index) => (
                     <CalendarDay
                        key={index}
                        onClick={() => day && handleDateClick(day)}
                        isSelectedStart={
                           day && selectedDates.start?.toDateString() === day.toDateString()
                        }
                        isSelectedEnd={
                           day && selectedDates.end?.toDateString() === day.toDateString()
                        }
                        isInRange={day && isInRange(day)}
                     >
                        {day ? day.getDate() : ''}
                     </CalendarDay>
                  ))}
               </CalendarGrid>
            </CalendarWrapper>

            {/* 第二個月份 */}
            <CalendarWrapper>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>
                     {currentYear}年 {currentMonthIndex + 2}月
                  </span>
                  <button onClick={goToNextMonth}>&gt;</button>
               </div>
               <CalendarGrid>
                  {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                     <CalendarHeader key={day}>{day}</CalendarHeader>
                  ))}
                  {secondMonthDays.map((day, index) => (
                     <CalendarDay
                        key={index}
                        onClick={() => day && handleDateClick(day)}
                        isSelectedStart={
                           day && selectedDates.start?.toDateString() === day.toDateString()
                        }
                        isSelectedEnd={
                           day && selectedDates.end?.toDateString() === day.toDateString()
                        }
                        isInRange={day && isInRange(day)}
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
