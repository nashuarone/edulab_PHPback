import React, {useEffect} from "react";
import { compose } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import s from "../Courses.module.css";
import "../ckeditornone.css";
import {
  getAllChapters,
  getCurrentCourse,
  getAllCourseThemes,
  deleteCourseChapter
} from "../../../redux/coursesReducer";
import EditCourseItem from "./EditCourseItem";
import EditCourseItemSkin from "./EditCourseItemSkin";

const CourseItem = (props) => {
  const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const courseChaptersData = useSelector((s) => s.coursesPage.courseChaptersData);
  const themesData = useSelector((s) => s.coursesPage.themesData);

  let courseId = props.match.params.courseId;
  const currentCourseData = useSelector((s) => s.coursesPage.currentCourseData)

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentCourseData.id !== courseId) {
      dispatch(getCurrentCourse(courseId));
    }
  }, [dispatch, courseId, currentCourseData.id]);
  useEffect(() => {
    dispatch(getAllChapters(courseId));
  }, [dispatch, courseId, courseChaptersData.length]);
  useEffect(() => {
    dispatch(getAllCourseThemes(courseId));
  }, [dispatch, courseId, themesData.length]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Текущий курс</div>
      <NavLink to={"/mycourses"}>
        <div title="выход из редактора" className={s.editBlockSubtitle}>
          <i className="fas fa-arrow-alt-circle-left"></i> К моим курсам
        </div>
      </NavLink>
      <NavLink to={"/themes"}>
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
      <div className={s.editBlock}>
        {isTeacher && (
          <div className={s.editModePurple}>
            <EditCourseItemSkin />
          </div>
        )}
      </div>
      <div>
        <div className={s.courseItem}>
          <div className={s.courseItemFlex}>
            <div className={s.coursePicture}>
              {currentCourseData.img ? (
                <img alt="pic" src={currentCourseData.img} />
              ) : (
                <ReactPlayer
                  url={currentCourseData.videoLink}
                  className={s.reactPlayer}
                  width="100%"
                  height="100%"
                />
              )}
              <div>
                Формат: {currentCourseData.format === 1 ? "Онлайн" : "Офлайн"}
              </div>
              <div>Продолжительность: {currentCourseData.duration} часов</div>
              {/* <div>Ценность: {currentCourseData.value} баллов</div> */}
              <div>
                <div>Темы курса</div>
                {themesData.length > 0
                  ? themesData.map((coursethemes) => (
                      <div key={coursethemes.id}>
                        <div>{coursethemes.title}</div>
                      </div>
                    ))
                  : "Темы не закреплены"}
              </div>
            </div>
            <div className={s.descriptionItem}>
              <span className={s.tittleDecor}>{currentCourseData.title}</span>
              <div className={s.courseDescription}>
                {currentCourseData.description}
              </div>
            </div>
          </div>
          <div>
            {courseChaptersData.length > 0
              ? courseChaptersData.map((chap) => (
                  <div key={chap.id}>
                    <div className={s.boldItemTitle}>{chap.title}</div>
                    <div>
                      <NavLink
                        to={"/course/" + courseId + "/chapter/" + chap.id}
                      >
                        <button className={s.courseBtn}>
                          Просмотреть содержание главы
                        </button>
                      </NavLink>
                    </div>
                    {isTeacher && (
                      <div>
                        <button
                          className={s.courseBtn}
                          onClick={() =>
                            dispatch(deleteCourseChapter(courseId, chap.id))
                          }
                        >
                          Удалить главу
                        </button>
                      </div>
                    )}
                    <div>
                      {/* <div className='editor' dangerouslySetInnerHTML={{__html: chap.content}}></div> */}
                      <CKEditor
                        editor={ClassicEditor}
                        data={chap.content}
                        disabled={true}
                      />
                    </div>
                  </div>
                ))
              : "Курс не содержит материалов"}
          </div>
          {/* <div>
            <button
              className={s.courseBtn}
              onClick={() =>
                dispatch(addUserCourse(currentCourseData.id, currentLearnerId))
              }
            >
              Записаться на курс
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default compose(withRouter)(CourseItem);
