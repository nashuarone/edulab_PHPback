import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import ReactPlayer from 'react-player'
import s from "./Courses.module.css";
import { getAllCoursesAPI } from '../../api/api';

const Courses = (props) => {
  const isTeacher = useSelector((s) => s.profilePage.isTeacher);
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
            </div>
            <div className={s.descriptionItem}>
              <span className={s.tittleDecor}>{c.title}</span>
              <div className={s.courseDescription}>{c.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;