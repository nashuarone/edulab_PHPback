import React, { useEffect } from "react";
import { compose } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/userPhoto.png";
import Preloader from "../Common/Preloader";
import { getCourseUsers } from "../../redux/usersReducer";
import { getCurrentCourse } from "../../redux/coursesReducer";

const CourseUsers = (props) => {
  const isFetching = useSelector((s) => s.usersPage.isFetching);
  const courseUsers = useSelector((s) => s.usersPage.courseUsers);
  const currentCourseData = useSelector((s) => s.coursesPage.currentCourseData);

  let courseId = props.match.params.courseId;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentCourse(courseId));
  }, [dispatch, courseId]);
  useEffect(() => {
    dispatch(getCourseUsers(courseId));
  }, [dispatch, courseId]);
  return (
    <div className={s.courseUsersPage}>
      {isFetching ? <Preloader /> : null}
      <div className={s.courseBlock}>
        <div className={s.courseUsersPic}>
          <img alt="pic" src={currentCourseData.img} />
        </div>
        <div className={s.courseUsersDesc}>
          <span className={s.tittleDecor}>{currentCourseData.title}</span>
          <div className={s.courseDescription}>
            {currentCourseData.description}
          </div>
        </div>
      </div>
      <div>
        <div className={s.tittleUser}>
          Пользователи записанные на текущий курс
        </div>
        <div className={s.courseUsersBlock}>
          {courseUsers.map((u) => (
            <div className={s.userItem} key={u.id}>
              <div>
                <div className={s.photosizeCU}>
                  <img
                    alt="avatar"
                    src={u.avatar === null ? userPhoto : u.avatar}
                  />
                </div>
              </div>
              <div className={s.userInfoBlock}>
                <div>{u.first_name}</div>
                <div>{u.second_name}</div>
                <div>{u.email}</div>
                <div className={s.userole}>
                  {u.role === 0
                    ? "Пользователь"
                    : u.role === 1
                    ? "Преподаватель"
                    : "Admin"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default compose(withRouter)(CourseUsers);
