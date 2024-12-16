// import { CalendarPicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
//todo 改版為styled
import './date-picker.scss'

// type Props = {
//   isShowModal: boolean;
// };
// type dateRange = {
//   start: string;
//   end: string;
// };

// const styledDatePicker = styled()
export default function DateSelecter({ isShowModal }: Props) {
   return (
      <div className={isShowModal ? 'date-show' : 'date'}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker localeText={{ start: '開始日期', end: '結束日期' }} />
         </LocalizationProvider>
      </div>
   )
}
