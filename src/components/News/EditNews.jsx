import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { createNews } from "../../redux/newsReducer";
import s from "./Courses.module.css";

const EditCourse = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [newsImg, setNewsImg] = useState("");
  const [description, setDescription] = useState("");
  const handlleChangeT = (e) => {
    setTitle(e.target.value);
  };
  const handlleChangeV = (e) => {
    setNewsImg(e.target.value);
  };
  const handlleChangeD = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div className={s.coursesPage}>
      <div>Редактор новостей</div>
      <div>
        <div>
          <div>Добавить новость</div>
          <div>
            <div className={s.newCourseBlock}>
              <input
                className={s.regInput}
                value={title}
                onChange={handlleChangeT}
                type="text"
                placeholder="Введите заголовок"
              />
              <input
                className={s.regInput}
                value={newsImg}
                onChange={handlleChangeV}
                type="text"
                placeholder="Ссылка на картинку"
              />
              <input
                className={s.regInput}
                value={description}
                onChange={handlleChangeD}
                type="text"
                placeholder="Описание новости"
              />
              <button
                onClick={() =>
                  dispatch(createNews(title, newsImg, description))
                }
              >
                Загрузить новости
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
