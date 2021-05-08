import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compose } from "redux";
import { withRouter, NavLink } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getChapter } from "../../../redux/coursesReducer";
import s from "../Courses.module.css";
import EditTestItem from "./TestItem/EditTestItem"
import TestItem from "./TestItem/TestItem";

const ChapterItem = (props) => {
  const isTeacher = useSelector((s) => s.profilePage.isTeacher);
  const currentChapterData = useSelector((s) => s.coursesPage.currentChapterData);
  let courseId = props.match.params.courseId;
  let chapterId = props.match.params.chapterId;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChapter(courseId, chapterId));
  }, [dispatch, courseId, chapterId]);
  return (
    <div className={s.coursesPage}>
      <div className={s.boldItemTitle}>{currentChapterData.title}</div>
      <div>
        <NavLink to={"/course/" + courseId}>
          <div title="выход из страницы главы" className={s.editBlockSubtitle}>
            <i className="fas fa-arrow-alt-circle-left"></i> Вернуться на
            страницу курса
          </div>
        </NavLink>
      </div>
      <div className={s.editBlock}>
        {isTeacher && (
          <div className={s.editModeRed}>
            <EditTestItem courseId={courseId} chapterId={chapterId} />
          </div>
        )}
      </div>
      <div>
        <CKEditor
          editor={ClassicEditor}
          data={currentChapterData.content}
          disabled={true}
        />
      </div>
      <div>
        <TestItem courseId={courseId} chapterId={chapterId} />
      </div>
    </div>
  );
};

export default compose(withRouter)(ChapterItem);
