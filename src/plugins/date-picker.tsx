import { CalendarPicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

//todo 改版為styled
import "./date-picker.scss";

type Props = {
  isShowModal: boolean;
};

// const styledDatePicker = styled()
export default function DateSelecter({ isShowModal }: Props) {
  return (
    <div className={isShowModal ? "date-show" : "date"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CalendarPicker onChange={handleOnChangeDate} value={null} />
      </LocalizationProvider>
    </div>
  );
}
