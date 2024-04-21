import { useContext, useEffect, useState } from "react";
import { DateContext } from "./App";
import moment from "moment";
import TodoListItem from "./TodoListItem";
import { nanoid } from "nanoid";
import styles from "./TodoList.module.css";
import { deleteData, postData, updateData } from "./api/api";

const TodoList = ({ data }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setTodos(data);
  }, [data]);

  // console.log(todos);

  const { currentDate, setCurrentDate, selectedDate, setSelectedDate } =
    useContext(DateContext);

  const formattedSelectedDate = selectedDate
    ? moment(selectedDate).format("YYYY-MM-DD")
    : moment(currentDate).format("YYYY-MM-DD");

  const handleClickAddBtn = () => {
    const newTodo = {
      _id: nanoid(),
      text: "할 일을 입력해주세요",
      date: formattedSelectedDate,
      tags: [],
    };
    postData("todos", newTodo);
    setTodos([...todos, newTodo]);
  };

  const handleClickDeleteBtn = (id) => {
    console.log(id);
    const newTodos = todos.filter((todo) => todo._id !== id);
    deleteData("todos", id);
    setTodos(newTodos);
  };

  const sortedTodos = todos.filter(
    (todo) => todo.date === formattedSelectedDate
  );

  const setUpdateTodoText = (currTodo, value) => {
    const tagsArray = value.match(/#[^\s#]+/g) || [];

    const trimValue = value.replace(/#[^\s#]+/g, "").trim();

    const updatedTodo = { ...currTodo, text: trimValue, tags: tagsArray };

    const updatedTodos = todos.map((todo) =>
      todo._id === currTodo._id ? updatedTodo : todo
    );

    updateData("todos", updatedTodo);
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
            key={todo._id}
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
