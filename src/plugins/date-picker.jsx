import { CalendarPicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
export default function DateSelecter(){
    function handleOnChangeDate(date){
        console.log(date)
    }
    return (
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <CalendarPicker onChange={handleOnChangeDate} value={null}/>
            </LocalizationProvider>
    )
}
