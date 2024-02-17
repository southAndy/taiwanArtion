import React from 'react'
import styled from 'styled-components'
import { DateCalendar } from '@mui/x-date-pickers'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

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

const DateMenu = () => {
   return (
      <div className='mt-5'>
         <StyledTitle margin={'0 0 16px 0'}>日期</StyledTitle>
         <div>
            <div className='flex gap-2'>
               <StyledDateText>今天</StyledDateText>
               <StyledDateText>明天</StyledDateText>
               <StyledDateText>本週末</StyledDateText>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DateCalendar />
            </LocalizationProvider>
         </div>
      </div>
   )
}

export default DateMenu
