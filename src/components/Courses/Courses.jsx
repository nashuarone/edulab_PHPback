import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import ReactPlayer from 'react-player'
import s from "./Courses.module.css";
import { addUserCourse } from "../../redux/coursesReducer";
import { getAllCoursesAPI } from '../../api/api';

const Courses = (props) => {
  const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const currentLearnerId = useSelector((s) => s.profilePage.profileData.id);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCoursesAPI());
  }, [dispatch]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Курсы</div>
      <div className={s.editBlock}>
        {isTeacher && (
          <div className={s.editModeRed}>
            <NavLink to={"/courseditor"}>Перейти в редактор курсов</NavLink>
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
                <div>Формат: {c.format === 1 ? "Онлайн" : "Офлайн"}</div>
                <div>Продолжительность: {c.duration} часов</div>
                <div>Ценность: {c.value} баллов</div>
              </div>
              <div className={s.descriptionItem}>
                <span className={s.tittleDecor}>{c.title}</span>
                <div className={s.courseDescription}>{c.description}</div>
              </div>
            </div>
            <div>
              <NavLink to={"/course/" + c.id}>
                <button
                  className={s.courseBtn}
                >
                  Просмотреть контент курса
                </button>
              </NavLink>
            </div>
            <div>
              <button
                className={s.courseBtn}
                onClick={() => dispatch(addUserCourse(c.id, currentLearnerId))}
              >
                Записаться на курс
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;