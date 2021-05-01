import React, {useEffect} from "react";
import { compose } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
import s from "../Courses.module.css";
import { addUserCourse, getAllChapters } from "../../../redux/coursesReducer";
import EditCourseItem from "./EditCourseItem";
//import { getAllCoursesAPI } from "../../api/api";

const CourseItem = (props) => {
  const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const currentLearnerId = useSelector((s) => s.profilePage.profileData.id);
  const courseChaptersData = useSelector((s) => s.coursesPage.courseChaptersData);

  let courseId = props.match.params.courseId;
  const coursesData = useSelector((s) => s.coursesPage.coursesData).filter(it => it.id === +courseId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllChapters(courseId));
  }, [dispatch, courseId]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Текущий курс</div>
      <NavLink to={"/courses"}>
        <div title="выход из редактора" className={s.editBlockSubtitle}>
          <i className="fas fa-arrow-alt-circle-left"></i> На страницу курсов
        </div>
      </NavLink>
      <div className={s.editBlock}>
        {isTeacher && (
          <div className={s.editModeRed}>
            <EditCourseItem courseId={courseId} />
          </div>
        )}
      </div>
      <div>
        {coursesData.map((c) => (
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
              {courseChaptersData.length > 0
                ? courseChaptersData.map((chap) => (
                    <div key={chap.id}>
                      <div>{chap.title}</div>
                      <div>
                        {/* <div>{chap.content}</div> */}
                        <div dangerouslySetInnerHTML={{__html: chap.content}}></div>
                      </div>
                    </div>
                  ))
                : "Курс не содержит материалов"}
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

export default compose(withRouter)(CourseItem);
