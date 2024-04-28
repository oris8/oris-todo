import { useContext } from "react";

import DateContext from "./context/DateContext";

import moment from "moment";
import Calendar from "react-calendar";

import "./Calendar.css";
import "./TodoCalendar.module.css";
import getFormattedDate from "./utils/getFormattedDate";

const TodoCalendar = () => {
  const { selectedDate, setSelectedDate } = useContext(DateContext);

  return (
    <div>
      <Calendar
        onChange={(date) => setSelectedDate(getFormattedDate(date))}
        value={selectedDate}
        calendarType="gregory"
        // onClickDay={(e) => setSelectedDate(e)}
        next2Label={null}
        prev2Label={null}
        formatDay={(locale, date) => moment(date).format("D")}
      />
    </div>
  );
};

export default TodoCalendar;
