import React from "react";
import st from "./Input.module.css";

function Input(props) {
  return (
    <input
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
      className={st.myInput}
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default Input;
