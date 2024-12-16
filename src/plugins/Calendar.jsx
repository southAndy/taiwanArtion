import * as React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'

export default function BasicDateCalendar() {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DateCalendar
            slotProps={{
               day: ({ day, selected, today }) => ({
                  sx: {
                     ...(today && {
                        border: '2px solid orange',
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                     }),
                     ...(selected && {
                        backgroundColor: 'blue',
                        color: '#fff',
                     }),
                     height: '40px',
                     width: '40px',
                     textAlign: 'center',
                     lineHeight: '40px',
                  },
               }),
            }}
         />
      </LocalizationProvider>
   )
}
