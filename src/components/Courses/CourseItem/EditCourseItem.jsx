import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { addCourseChapter } from "../../../redux/coursesReducer";
import s from "../Courses.module.css";
import "./ckeditorblock.css";

const EditCourseItem = (props) => {
  const courseId = props.courseId;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("<p>Добавьте текст, таблицы, видео и ссылки для главы курса</p>");
  const handlleChangeT = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Редактор глав курса</div>
      <div>
        <div className={s.editBlock}>
          <div>Название новой главы</div>
          <div className={s.newCourseBlock}>
            <div>
              <input
                className={s.regInput}
                value={title}
                onChange={handlleChangeT}
                type="text"
                placeholder="Введите название главы"
              />
            </div>
            <div>
              <h3>Добавить содержимое для новой главы</h3>
              <CKEditor
                editor={ClassicEditor}
                data={content}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setContent(data);
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </div>
            <button
              onClick={() =>
                dispatch(addCourseChapter(courseId, title, content))
              }
            >
              Сохранить главу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseItem;
