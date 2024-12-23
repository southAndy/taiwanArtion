import React from 'react'
import styled from 'styled-components'
import { DateCalendar } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const DateMenu = () => {
   return (
      <StyledDateContainer>
         <StyledTitle margin={'0 0 16px 0'}>日期</StyledTitle>
         <div>
            <div className='selector'>
               <StyledDateText>今天</StyledDateText>
               <StyledDateText>明天</StyledDateText>
               <StyledDateText>本週末</StyledDateText>
            </div>
            <StyledCalenderBox>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
               </LocalizationProvider>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar />
               </LocalizationProvider>
            </StyledCalenderBox>
         </div>
      </StyledDateContainer>
   )
}

export default DateMenu

const StyledDateContainer = styled.main`
   margin-top: 20px;

   .selector {
      display: flex;
      gap: 8px;
   }
`

const StyledTitle = styled.h3`
   margin-top: 1.5rem;
   font-weight: 700;
   font-size: 18px;
   margin: ${(props) => props.margin ?? '0'};
`

const StyledDateText = styled.div`
   font-size: 14px;
   background-color: #f4f4f4;
   border-radius: 12px;
   padding: 8px 16px;
   cursor: pointer;
   &:hover {
      background: #be875c;
      color: #fff;
   }
`
const StyledCalenderBox = styled.section`
   display: flex;
`
