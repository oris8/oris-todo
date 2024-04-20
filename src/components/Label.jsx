import React from "react";
import styles from "./Label.module.css";

const Label = ({ children }) => {
  return <span className={styles.lable}>{children}</span>;
};

export default Label;
