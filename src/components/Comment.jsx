import { useState } from "react";
import styles from "./Comment.module.css";
import TextField from "./TextField";
import { postData } from "../api/api";

export const CommentInput = ({ state, setState }) => {
  const [comment, setComment] = useState("");

  function handleChangeValue(e) {
    const value = e.target.value;
    setComment(value);
  }

  function handleAddCommentBtn() {
    setState((prevState) => ({
      ...prevState,
      comments: [...prevState.comments, comment],
    }));
    postData("posts", state);
  }

  return (
    <div className={styles.commentInput}>
      <TextField name="comment" state={comment} onChange={handleChangeValue} />
      <button onClick={handleAddCommentBtn}>Add</button>
    </div>
  );
};

export const Comment = ({ state, setState }) => {
  return (
    <>
      <div>댓글입니다 테스트중</div>
    </>
  );
};
