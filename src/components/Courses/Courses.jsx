import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import ReactPlayer from 'react-player'
import s from "./Courses.module.css";
import { addUserCourse, deleteCourse } from "../../redux/coursesReducer";
import { getAllCoursesAPI } from '../../api/api';

const Courses = (props) => {
  const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const isAdminos = useSelector((s) => s.profilePage.isAdminos);
  const currentLearnerId = useSelector((s) => s.profilePage.profileData.id);
  const coursesData = useSelector((s) => s.coursesPage.coursesData);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCoursesAPI());
  }, [dispatch, coursesData.length]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Все курсы</div>
      <NavLink to={"/themes"}>
        <div title="выход на страницу тем" className={s.editBlockSubtitle}>
          <i className="fas fa-arrow-alt-circle-left"></i> На страницу тем
        </div>
      </NavLink>
      <div className={s.editBlock}>
        {isTeacher && (
          <div className={s.editModeRed}>
            <NavLink to={"/courseditor"}>
              <div className={s.editBlockTitle}>Перейти в редактор курсов</div>
            </NavLink>
          </div>
        )}
        {isAdminos && (
          <div className={s.editModePurple}>
            <NavLink to={"/themeditor"}>
              <div className={s.editBlockTitle}>Перейти в редактор тем</div>
            </NavLink>
          </div>
        )}
      </div>
      <div>
        {props.coursesData.map((c) => (
          <div className={s.courseItem} key={c.id}>
            <div className={s.courseItemFlex}>
              <div className={s.coursePicture}>
                {c.img ? (
                  <img alt="pic" src={c.img} />
                ) : (
                  <ReactPlayer
                    url={c.videoLink}
                    className={s.reactPlayer}
                    width="100%"
                    height="100%"
                  />
                )}
                <div>Формат: {c.format === 1 ? "Онлайн" : "Вебинар"}</div>
                <div>Продолжительность: {c.duration} часов</div>
                {/* <div>Ценность: {c.value} баллов</div> */}
              </div>
              <div className={s.descriptionItem}>
                <span className={s.tittleDecor}>{c.title}</span>
                <div className={s.courseDescription}>{c.description}</div>
              </div>
            </div>
            {isTeacher && (
              <div>
                <NavLink to={"/course/" + c.id}>
                  <button className={s.courseBtn}>
                    Добавить главы и контент курса
                  </button>
                </NavLink>
              </div>
            )}
            {isTeacher && (
              <div>
                <NavLink to={"/learners/" + c.id}>
                  <button className={s.courseBtn}>
                    Пользователи записанные на курс
                  </button>
                </NavLink>
              </div>
            )}
            <div>
              <button
                className={s.courseBtn}
                onClick={() => dispatch(addUserCourse(c.id, currentLearnerId))}
              >
                Записаться на курс
              </button>
            </div>
            {isTeacher && (
              <div>
                <button
                  className={s.courseBtn}
                  onClick={() => dispatch(deleteCourse(c.id))}
                >
                  Удалить курс
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;