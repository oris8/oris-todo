import { useContext, useEffect, useRef, useState } from "react";
import DateContext from "./context/DateContext";
import UserContext from "./context/UserContext";

import moment from "moment";
import { nanoid } from "nanoid";

import TodoListItem from "./TodoListItem";
import TodoPage from "./components/TodoPage";

import { deleteData, fetchData, postData, updateData } from "./api/api";

import styles from "./TodoList.module.css";
import { CSSTransition, Transition } from "react-transition-group";
import "./TodoPageTransition.css";
import getFormattedDate from "./utils/getFormattedDate";

const TodoList = ({ showPage, setShowPage }) => {
  const [todos, setTodos] = useState([]);
  const pageRef = useRef(null);
  const transitionRef = useRef(null);

  const { currentDate, selectedDate } = useContext(DateContext);
  const userIP = useContext(UserContext);

  useEffect(() => {
    fetchData(setTodos, "todos");
  }, [selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log("click이벤트발생", event, pageRef);

      if (pageRef.current && !pageRef.current.contains(event.target)) {
        // console.log("다른곳을 클릭했군요!");
        setShowPage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pageRef]);

  const formattedSelectedDate = selectedDate
    ? getFormattedDate(selectedDate)
    : getFormattedDate(currentDate);

  const handleClickAddBtn = () => {
    const newTodo = {
      // _id: nanoid(),
      user: userIP,
      text: "할 일을 입력해주세요",
      date: formattedSelectedDate,
      tags: [],
      isFinished: false,
    };
    postData("todos", newTodo);
    setTodos([...todos, newTodo]);
  };

  const handleClickDeleteBtn = (id) => {
    const newTodos = todos.filter((todo) => todo._id !== id);
    deleteData("todos", id);
    setTodos(newTodos);
  };

  const sortedTodos = todos.filter(
    (todo) => todo.user === userIP && todo.date === formattedSelectedDate
  );

  const setUpdateTodoText = (currTodo, value) => {
    const tagsArray = value.match(/#[^\s#]+/g) || [];
    const trimValue = value.replace(/#[^\s#]+/g, "").trim();

    const updatedTodo = { ...currTodo, text: trimValue, tags: tagsArray };
    const updatedTodos = todos.map((todo) =>
      todo._id === currTodo._id ? updatedTodo : todo
    );
    setTodos(updatedTodos);
  };
  // console.log(showPage, pageRef);

  const setToggleAndUpdateTodoFinished = (currTodo, value) => {
    const updatedTodo = { ...currTodo, isFinished: !value };

    const updatedTodos = todos.map((todo) =>
      todo._id === currTodo._id ? updatedTodo : todo
    );

    console.log(updatedTodo);

    updateData("todos", updatedTodo);
    setTodos(updatedTodos);
  };

  const updateTodoCurrentDate = () => {
    const notFinishedTodos = sortedTodos.filter((todo) => !todo.isFinished);
    const newTodos = notFinishedTodos.map((todo) => {
      return {
        ...todo,
        date: moment(currentDate).format("YYYY-MM-DD"),
      };
    });

    newTodos.map((newTodo) => updateData("todos", newTodo));

    setTodos((prevTodos) => [...prevTodos.filter((todo) => todo.isFinished)]);
  };

  console.log(currentDate, selectedDate);

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
            setShowPage={setShowPage}
            setToggleAndUpdateTodoFinished={setToggleAndUpdateTodoFinished}
          />
        ))}
        {selectedDate && currentDate !== selectedDate && (
          <button onClick={updateTodoCurrentDate}>
            못한 할일 오늘로 옮기기
          </button>
        )}
      </div>

      <CSSTransition
        in={showPage}
        timeout={500}
        classNames="fade-page"
        transitionRef={transitionRef}
      >
        <div className="todoPageWrapper" ref={transitionRef}>
          <TodoPage ref={pageRef} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default TodoList;
