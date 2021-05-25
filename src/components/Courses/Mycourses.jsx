import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import ReactPlayer from 'react-player'
import s from "./Courses.module.css";
import Preloader from "../Common/Preloader";
import {
  deleteUserCourse,
  getMyCourse,
  getCourseProgress,
} from "../../redux/coursesReducer";
import { getAllCoursesAPI } from '../../api/api';
//import CertificateButton from './CertificateButton';

const Mycourses = (props) => {
  //const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const currentLearnerId = useSelector((s) => s.profilePage.profileData.id);
  const myCoursesData = useSelector((s) => s.coursesPage.myCoursesData);
  const isFetching = useSelector((s) => s.coursesPage.isFetching);
  const dispatch = useDispatch()
  const myCoursesIdArr = myCoursesData.map((it) => it.id);
  const allProgress = useSelector((s) => s.coursesPage.courseProgress);
  useEffect(() => {
    dispatch(getAllCoursesAPI());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getMyCourse(currentLearnerId));
  }, [dispatch, currentLearnerId, myCoursesData.length]);
  useEffect(() => {
    if (myCoursesIdArr.length > 0) {
      dispatch(getCourseProgress(myCoursesIdArr));
    }
    // eslint-disable-next-line
  }, [dispatch, myCoursesIdArr.length]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Мои курсы</div>
      {isFetching ? <Preloader /> : null}
      <div>
        {myCoursesData.length > 0 ? (
          myCoursesData.map((c, ind) => (
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
                  <button className={s.courseBtn}>Перейти к курсу</button>
                </NavLink>
              </div>
              {allProgress
                .filter((it) => +it.course_id === c.id)
                .map((prog) => (
                  <div key={prog.course_id}>
                    {/* <CertificateButton courseId={c.id} progress={allProgress[ind]} /> */}
                    <NavLink to={"/mycourse/certificate/" + c.id}>
                      <button
                        disabled={prog.score <= (prog.max_score * 9) / 10}
                        className={s.courseBtn}
                      >
                        Сертификат об окончании курса
                      </button>
                    </NavLink>
                  </div>
                ))}
              <div>
                <button
                  className={s.courseBtn}
                  onClick={() =>
                    dispatch(deleteUserCourse(c.id, currentLearnerId))
                  }
                >
                  Отписаться от курса
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Ничего нет &#129335;</div>
        )}
      </div>
    </div>
  );
};

export default Mycourses;