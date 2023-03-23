import { CalendarPicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

//todo 改版為styled
import styled,{css} from "styled-components";
import './date-picker.scss';


// const styledDatePicker = styled()
export default function DateSelecter({isShowModal}){
    function handleOnChangeDate(date){
        console.log(date)
    }
    return (
        <div className={isShowModal?'date-show':'date'}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <CalendarPicker onChange={handleOnChangeDate} value={null}/>
            </LocalizationProvider>
        </div>
    )
}
