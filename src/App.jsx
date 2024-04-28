import React, { useState, useEffect } from "react";

import DateContext from "./context/DateContext";
import UserContext from "./context/UserContext";

import TodoCalendar from "./TodoCalendar";
import UserProfile from "./UserProfile";
import TodoList from "./TodoList";

import { fetchData } from "./api/api";
import getClientIP from "./utils/getClientIP";

import getFormattedDate from "./utils/getFormattedDate";

import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState(getFormattedDate(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);

  const [showPage, setShowPage] = useState(false);

  const [userIP, setUserIP] = useState("");

  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const ip = await getClientIP();
        setUserIP(ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchUserIP();
  }, []);

  return (
    <DateContext.Provider
      value={{ currentDate, setCurrentDate, selectedDate, setSelectedDate }}
    >
      <UserContext.Provider value={userIP}>
        <div className="container">
          <div>
            <UserProfile />
            <TodoCalendar />
          </div>
          <div>
            <TodoList showPage={showPage} setShowPage={setShowPage} />
          </div>
        </div>
      </UserContext.Provider>
    </DateContext.Provider>
  );
}

export default App;
