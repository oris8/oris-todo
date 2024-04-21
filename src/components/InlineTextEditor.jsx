import React, { useEffect, useRef, useState } from "react";
import styles from "./InlineTextEditor.module.css";

const InlineTextEditor = ({ name, onChange, ...data }) => {
  const [inputValue, setInputValue] = useState();
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [isShowAll, setIsShowAll] = useState(false);

  const textarea = useRef();

  const handleResizeHeight = () => {
    // console.log(textarea);
    textarea.current.style.height = "auto"; //height 초기화
    textarea.current.style.height = textarea.current.scrollHeight + "px";
  };

  //r공부
  useEffect(() => {
    if (textarea.current && isDoubleClicked) {
      handleResizeHeight();
    }
  }, [isDoubleClicked]);

  const handleToggleBtn = () => {
    setIsShowAll((prevState) => !prevState);
  };
  const handleInputChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
    onChange(data.todo, value);

    handleResizeHeight();
  };

  const handleDoubleClick = () => {
    setIsDoubleClicked(true);
    handleResizeHeight();
  };

  const handleInputBlur = () => {
    setIsDoubleClicked(false);
  };

  const initValue = data.todo.text.split("\n").length;

  return (
    <>
      <div className={`${name} ${styles.wrapper}`}>
        {isDoubleClicked ? (
          <textarea
            type="text"
            name={name}
            value={inputValue || data.todo.text}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            className={styles.input}
            rows={initValue}
            ref={textarea}
          />
        ) : (
          <div onDoubleClick={handleDoubleClick} className={styles.name}>
            {isShowAll
              ? data.todo.text.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              : data.todo.text.split("\n")[0]}
          </div>
        )}
        <button onClick={handleToggleBtn}>
          <i className="arrow-dropdown"></i>
        </button>
      </div>
    </>
  );
};

export default InlineTextEditor;
