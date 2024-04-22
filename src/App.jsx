import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

import TodoCalendar from "./TodoCalendar";
import UserProfile from "./UserProfile";
import TodoList from "./TodoList";

import "./App.css";
import { fetchData } from "./api/api";

export const DateContext = createContext();

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [data, setData] = useState([]);

  const [showPage, setShowPage] = useState(false);
  useEffect(() => {
    fetchData(setData, "todos");
  }, []);

  return (
    <DateContext.Provider
      value={{ currentDate, setCurrentDate, selectedDate, setSelectedDate }}
    >
      <div className="container">
        <div>
          <UserProfile />
          <TodoCalendar />
        </div>
        <div>
          <TodoList data={data} showPage={showPage} setShowPage={setShowPage} />
        </div>
      </div>
    </DateContext.Provider>
  );
}

export default App;
