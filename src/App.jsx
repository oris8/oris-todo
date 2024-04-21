import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

import TodoCalendar from "./TodoCalendar";
import UserProfile from "./UserProfile";
import TodoList from "./TodoList";

import "./App.css";

export const DateContext = createContext();

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/todos");
        setData(response.data);
        // console.dir(response.data);
      } catch (error) {
        console.error("데이터를 가져오는 동안 오류가 발생했습니다:", error);
      }
    };

    fetchData();
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
          <TodoList data={data} />
        </div>
      </div>
    </DateContext.Provider>
  );
}

export default App;
