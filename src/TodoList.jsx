import { useContext, useEffect, useRef, useState } from "react";
import { DateContext } from "./App";
import moment from "moment";
import TodoListItem from "./TodoListItem";
import { nanoid } from "nanoid";
import styles from "./TodoList.module.css";
import { deleteData, postData, updateData } from "./api/api";
import TodoPage from "./components/TodoPage";
import { CSSTransition, Transition } from "react-transition-group";
import "./TodoPageTransition.css";

const TodoList = ({ data, showPage, setShowPage }) => {
  const [todos, setTodos] = useState([]);
  const pageRef = useRef(null);
  const transitionRef = useRef(null);

  useEffect(() => {
    setTodos(data);
  }, [data]);

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

    setTodos(updatedTodos);
  };
  console.log(showPage, pageRef);
  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("click이벤트발생", event, pageRef);

      if (pageRef.current && !pageRef.current.contains(event.target)) {
        console.log("다른곳을 클릭했군요!");
        setShowPage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pageRef]);

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
          />
        ))}
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
