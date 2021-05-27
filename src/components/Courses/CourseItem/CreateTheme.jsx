import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAllThemes,
  createTheme,
  deleteTheme,
} from "../../../redux/coursesReducer";
import s from "../Courses.module.css";

const CreateTheme = (props) => {
  const allThemesData = useSelector((s) => s.coursesPage.allThemesData);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("");
  const handlleChangeT = (e) => {
    setTheme(e.target.value);
  };
  useEffect(() => {
    dispatch(getAllThemes());
  }, [dispatch, allThemesData.length]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Редактор тем</div>
      <NavLink to={"/courses"}>
        <div title="выход из редактора" className={s.editBlockSubtitle}>
          <i className="fas fa-arrow-alt-circle-left"></i> На страницу курсов
        </div>
      </NavLink>
      <div>
        <div className={s.editBlock}>
          <div>Добавить новую тему</div>
          <div className={s.newCourseBlock}>
            <input
              className={s.regInput}
              value={theme}
              onChange={handlleChangeT}
              type="text"
              placeholder="Введите название темы"
            />
            <button onClick={() => dispatch(createTheme(theme))}>
              Добавить тему
            </button>
          </div>
        </div>
        <div>Все темы</div>
        {allThemesData.map((theme) => (
          <div className={s.courseItem} key={theme.id}>
            <div className={s.courseThemeFlex}>
              <div>{theme.title}</div>
              <span>
                <button onClick={() => dispatch(deleteTheme(+theme.id))}>
                  Удалить тему
                </button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTheme;
