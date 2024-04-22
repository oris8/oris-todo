import React, { forwardRef, useState } from "react";
import styles from "./TodoPage.module.css";

import MOCK_IMAGE from "../assets/mock_user.jpeg";
import ImageInput from "./ImageInput";
import { postData } from "../api/api";
import TextField from "./TextField";
import { CommentInput, Comment } from "./Comment";
//이미지 캐러셀로

const PostContent = ({ state, setState }) => {
  function handelBlurInput() {
    const data = {};
    postData("posts", data);
    // todoID랑연결해서 넣어줘야함
  }

  console.log(state);

  return (
    <>
      <TextField
        name="content"
        state={state}
        setState={setState}
        onBlur={handelBlurInput}
        placeholder="기록할 내용이 있나요?"
      />
    </>
  );
};

const TodoPage = (props, ref) => {
  const [post, setPost] = useState({
    content: "",
    images: [],
    todoId: "",
    comments: [],
  });

  console.log(post);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.imageSection}>
        <ImageInput
          className={styles.profileImage}
          src={post.images}
          alt="Post Image"
          multiple={true}
          state={post}
          setState={setPost}
          label="postImage"
        />
      </div>
      <div className={styles.contentSection}>
        <PostContent state={post} setState={setPost} />
      </div>
      <div className={styles.commentsSection}>
        <span>Comment</span>
        <CommentInput state={post} setState={setPost} />
      </div>
    </div>
  );
};

export default forwardRef(TodoPage);
