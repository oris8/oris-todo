import React, { useState } from "react";
import InlineTextEditor from "./components/InlineTextEditor";
import styles from "./TodoListItem.module.css";
import Label from "./components/Label";
import { updateData } from "./api/api";

const TodoListItem = ({ todo, onDelete, setShowPage, setUpdateTodoText }) => {
  const [isFinished, setIsFinished] = useState(false);

  const handleClickDeleteBtn = () => {
    onDelete(todo._id);
  };

  const handleClickCheckBox = () => {
    setIsFinished((prevState) => !prevState);
  };

  const tags = todo.tags;

  const updateTodo = (todo) => {
    updateData("todos", todo);
  };

  const handleClickPageBtn = () => {
    setShowPage(true);
  };

  return (
    <>
      <div>
        <div className={styles.todo}>
          <button onClick={handleClickCheckBox}>
            {isFinished ? (
              <i className="checkbox-fill"></i>
            ) : (
              <i className="checkbox"></i>
            )}
          </button>
          <div className={styles.input}>
            <InlineTextEditor
              name="todo"
              todo={todo}
              onChange={setUpdateTodoText}
              updateTodo={updateTodo}
            ></InlineTextEditor>
          </div>

          <button onClick={handleClickPageBtn}>
            <i className="more"></i>
          </button>
          <button onClick={handleClickDeleteBtn}>
            <i className="close"></i>
          </button>
        </div>
        <div className={styles.labelContainer}>
          {tags && tags.map((tag) => <Label>{tag}</Label>)}
        </div>
      </div>
    </>
  );
};

export default TodoListItem;
