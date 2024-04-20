import { useContext, useState } from "react";
import moment from "moment";
import Calendar from "react-calendar";
import "./Calendar.css";
import "./TodoCalendar.module.css";
import { DateContext } from "./App";

const TodoCalendar = () => {
  const { currentDate, setCurrentDate, selectedDate, setSelectedDate } =
    useContext(DateContext);

  return (
    <div>
      <Calendar
        onChange={(date) => setSelectedDate(date)}
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
