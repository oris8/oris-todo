import React, { useState, createContext } from "react";

import TodoCalendar from "./TodoCalendar";
import UserProfile from "./UserProfile";
import TodoList from "./TodoList";

import "./App.css";

export const DateContext = createContext();

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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
          <TodoList />
        </div>
      </div>
    </DateContext.Provider>
  );
}

export default App;
