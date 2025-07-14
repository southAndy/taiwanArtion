import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const CalendarContainer = styled.div`
   max-width: 100vw;
   margin: 24px auto;
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
   flex-wrap: wrap;
   gap: 8px;
   margin-bottom: 16px;
   width: 100%;

   h3 {
      margin: 0;
      flex-basis: 100%;
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
   border-radius: 20px;
   &:hover {
      background-color: ${(props) =>
         props.isSelectedStart || props.isSelectedEnd || props.isInRange ? null : '#eee'};
   }
`

const Calendar = ({ setModlaShow }) => {
   const [currentMonth, setCurrentMonth] = useState(new Date())
   const [selectedDates, setSelectedDates] = useState({ start: null, end: null })
   const navigate = useNavigate()

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
         const startDate = selectedDates.start
         const endDate = date
         setSelectedDates({ start: startDate, end: endDate })
         
         // 搜尋邏輯：導航到結果頁面並傳遞日期參數
         const startDateStr = startDate.toISOString().split('T')[0]
         const endDateStr = endDate.toISOString().split('T')[0]
         setModlaShow(false)
         navigate(`/result?startDate=${startDateStr}&endDate=${endDateStr}`)
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
            <QuickButton onClick={() => {
               const today = new Date()
               setSelectedDates({ start: today, end: today })
               const todayStr = today.toISOString().split('T')[0]
               setModlaShow(false)
               navigate(`/result?startDate=${todayStr}&endDate=${todayStr}`)
            }}>
               今天
            </QuickButton>
            <QuickButton
               onClick={() => {
                  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1))
                  setSelectedDates({ start: tomorrow, end: tomorrow })
                  const tomorrowStr = tomorrow.toISOString().split('T')[0]
                  setModlaShow(false)
                  navigate(`/result?startDate=${tomorrowStr}&endDate=${tomorrowStr}`)
               }}
            >
               明天
            </QuickButton>
            <QuickButton onClick={() => {
               const today = new Date()
               const weekEnd = new Date(today.getTime() + (6 - today.getDay()) * 24 * 60 * 60 * 1000)
               setSelectedDates({ start: today, end: weekEnd })
               const startStr = today.toISOString().split('T')[0]
               const endStr = weekEnd.toISOString().split('T')[0]
               setModlaShow(false)
               navigate(`/result?startDate=${startStr}&endDate=${endStr}`)
            }}>本週</QuickButton>
            <QuickButton onClick={() => {
               const today = new Date()
               const saturday = new Date(today.getTime() + (6 - today.getDay()) * 24 * 60 * 60 * 1000)
               const sunday = new Date(saturday.getTime() + 24 * 60 * 60 * 1000)
               setSelectedDates({ start: saturday, end: sunday })
               const startStr = saturday.toISOString().split('T')[0]
               const endStr = sunday.toISOString().split('T')[0]
               setModlaShow(false)
               navigate(`/result?startDate=${startStr}&endDate=${endStr}`)
            }}>本週末</QuickButton>
         </QuickSelectButtons>

         {/* 月份顯示 */}
         <MonthContainer>
            {/* 第一個月份 */}
            <CalendarWrapper>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
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
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
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
