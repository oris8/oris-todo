import { useContext, useEffect, useState } from "react";
import { DateContext } from "./App";
import moment from "moment";
import TodoListItem from "./TodoListItem";
import { nanoid } from "nanoid";
import styles from "./TodoList.module.css";

const mockDate = [
  {
    id: nanoid(),
    text: "Todo 1 \n #무조건 #미뤄도됨 #코드잇",
    date: "2024-04-20",
    tags: [],
  },
  {
    id: nanoid(),
    text: "Todo 2",
    date: "2024-04-21",
    tags: ["개인프로젝트"],
  },
  {
    id: nanoid(),
    text: "Todo 3",
    date: "2024-04-20",
    tags: [],
  },
  {
    id: nanoid(),
    text: "Todo 4",
    date: "2024-04-22",
    tags: ["미뤄도됨"],
  },
];

const TodoList = () => {
  const [todos, setTodos] = useState(mockDate);

  const { currentDate, setCurrentDate, selectedDate, setSelectedDate } =
    useContext(DateContext);

  const formattedSelectedDate = selectedDate
    ? moment(selectedDate).format("YYYY-MM-DD")
    : moment(currentDate).format("YYYY-MM-DD");

  const handleClickAddBtn = () => {
    const newTodo = {
      id: nanoid(),
      text: "할 일을 입력해주세요",
      date: formattedSelectedDate,
    };
    setTodos([...todos, newTodo]);
  };

  const handleClickDeleteBtn = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const sortedTodos = todos.filter(
    (todo) => todo.date === formattedSelectedDate
  );

  const setUpdateTodoText = (currTodo, value) => {
    const tagsArray = value.match(/#[^\s#]+/g) || [];

    const trimValue = value.replace(/#[^\s#]+/g, "").trim();

    const updatedTodos = todos.map((todo) =>
      todo.id === currTodo.id
        ? { ...todo, text: trimValue, tags: tagsArray }
        : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.todoContainer}>
      <div className={styles.todoTitle}> {formattedSelectedDate} </div>

      <button className={styles.addBtn} onClick={handleClickAddBtn}>
        <i className="add-circle"></i>
      </button>

      <div className={styles.todosWrapper}>
        {sortedTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            onDelete={handleClickDeleteBtn}
            setUpdateTodoText={setUpdateTodoText}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
