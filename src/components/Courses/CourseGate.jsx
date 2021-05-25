import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllThemes } from "../../redux/coursesReducer";
import s from "./Courses.module.css";

const CourseGate = (props) => {
  const allThemesData = useSelector((s) => s.coursesPage.allThemesData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllThemes());
  }, [dispatch]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Выбор курсов по направлениям (темам)</div>
      <div>
        <NavLink to={"/courses"}>
          <div title="Ко всем курсам" className={s.courseItem}>
            <button className={s.courseBtn}>
              <i className="fas fa-book-open"></i> Все курсы
            </button>
          </div>
        </NavLink>
      </div>
      <div>
        <div className={s.themesBlock}>Выбрать курс по направлению</div>
        {allThemesData.map((theme) => (
          <div className={s.courseItem} key={theme.id}>
            <div>
              <NavLink to={"/courses-theme/" + theme.id}>
                <button className={s.courseBtn}>
                  Курсы по направлению <span className={s.themesBold}>{theme.title}</span>
                </button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseGate;
