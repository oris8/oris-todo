import React from "react";

const TextField = ({
  name,
  state,
  setState,
  onChange,
  onBlur,
  placeholder,
}) => {
  function handleChangeValue(e) {
    onChange
      ? onChange(e)
      : setState((prevState) => ({
          ...prevState,
          [name]: e.target.value,
        }));
  }

  return (
    <>
      <textarea
        type="text"
        name={name}
        value={state[name] ?? state}
        onChange={handleChangeValue}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextField;
