import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import ReactPlayer from "react-player";
import { createCourseAPI } from "../../api/api";
import s from "./Courses.module.css";

const EditCourse = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [description, setDescription] = useState("");
  const handlleChangeT = (e) => {
    setTitle(e.target.value);
  };
  const handlleChangeV = (e) => {
    setVideoLink(e.target.value);
  };
  const handlleChangeD = (e) => {
    setDescription(e.target.value);
  };
  return (
    <div className={s.coursesPage}>
      <div>Редактор курсов</div>
      <div>
        <div>
          <div>Добавить новый курс</div>
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
                value={videoLink}
                onChange={handlleChangeV}
                type="text"
                placeholder="Ссылка на видео"
              />
              <input
                className={s.regInput}
                value={description}
                onChange={handlleChangeD}
                type="text"
                placeholder="Описание курса"
              />
              <button
                onClick={() =>
                  dispatch(createCourseAPI(title, videoLink, description))
                }
              >
                Загрузить курс
              </button>
            </div>
          </div>
        </div>
        {props.props.coursesData.map((c) => (
          <div className={s.courseItem} key={c.id}>
            <div className={s.coursePicture}>
              {c.courseImg ? (
                <img alt="pic" src={c.courseImg} />
              ) : (
                <ReactPlayer
                  url={c.videoLink}
                  className="react-player"
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

export default EditCourse;
