import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactPlayer from 'react-player'
import s from "./Courses.module.css";
import { deleteUserCourse } from "../../redux/coursesReducer";
import { getAllCoursesAPI, getMyCoursesAPI } from '../../api/api';

const Mycourses = (props) => {
  //const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const currentLearnerId = useSelector((s) => s.profilePage.profileData.id);
  const myCoursesData = useSelector((s) => s.coursesPage.myCoursesData);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCoursesAPI());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getMyCoursesAPI(currentLearnerId));
  }, [dispatch, currentLearnerId, myCoursesData]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Мои курсы</div>
      <div>
        {myCoursesData.length > 0 ? myCoursesData.map((c) => (
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
              <button
                className={s.courseBtn}
                onClick={() => dispatch(deleteUserCourse(c.id, currentLearnerId))}
              >
                Отписаться от курса
              </button>
            </div>
          </div>
        )) : "Ничего нет =("}
      </div>
    </div>
  );
};

export default Mycourses;