import React from "react"
import s from "./FormsControl.module.css"

export const Input = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error;
  const hasLengthError = !meta.touched && meta.error !== "Обязательное поле";
  return (
    <div
      className={
        s.formControl +
        " " +
        (hasLengthError ? hasLengthError && s.error : hasError && s.error)
      }
    >
      <div>
        <input {...input} {...props} />
      </div>
      {/* {hasError && <span>{meta.error}</span>} */}
      {hasLengthError
        ? hasLengthError && <span>{meta.error}</span>
        : hasError && <span>{meta.error}</span>}
    </div>
  );
}
