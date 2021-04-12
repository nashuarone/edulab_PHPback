import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import EditCourse from './EditCourse'
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
      <div>Куча курсов</div>
      {isTeacher && (
        <div className={s.editModeRed}>
          <EditCourse props={props} />
        </div>
      )}
      <div>
        {props.coursesData.map((c) => (
          <div className={s.courseItem} key={c.id}>
            <div className={s.coursePicture}>
              {c.courseImg ? (
                <img alt="pic" src={c.courseImg} />
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