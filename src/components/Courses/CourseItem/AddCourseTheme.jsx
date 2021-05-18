import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourseTheme } from "../../../redux/coursesReducer";
import s from "../Courses.module.css";
import "./ckeditorblock.css";

const AddCourseTheme = (props) => {
  const courseId = props.courseId;
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("");
  const handlleChangeT = (e) => {
    setTheme(e.target.value);
  };
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Добавление темы курса</div>
      <div>
        <div className={s.editBlock}>
          <div>Название темы курса</div>
          <div className={s.newCourseBlock}>
            <div>
              <input
                className={s.regInput}
                value={theme}
                onChange={handlleChangeT}
                type="text"
                placeholder="Введите название темы"
              />
            </div>
            <button
              onClick={() =>
                dispatch(addCourseTheme(courseId, theme))
              }
            >
              Добавить тему курса
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourseTheme;
