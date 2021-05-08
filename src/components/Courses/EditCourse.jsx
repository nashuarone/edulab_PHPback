import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom";
import ReactPlayer from "react-player";
import { createCourseAPI } from "../../api/api";
import s from "./Courses.module.css";

const EditCourse = (props) => {
  const coursesData = useSelector((s) => s.coursesPage.coursesData);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");
  const [format, setFormat] = useState(1);
  const [duration, setDuration] = useState(0);
  const [value, setValue] = useState(0);
  const handlleChangeT = (e) => {
    setTitle(e.target.value);
  };
  const handlleChangeI = (e) => {
    setImg(e.target.value);
  };
  const handlleChangeD = (e) => {
    setDescription(e.target.value);
  };
  const handlleChangeV = (e) => {
    setValue(e.target.value);
  };
  const handlleChangeDu = (e) => {
    setDuration(e.target.value);
  };
  const handlleChangeF = (e) => {
    setFormat(e.target.value);
  };
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Редактор курсов</div>
      <NavLink to={"/courses"}>
        <div title="выход из редактора" className={s.editBlockSubtitle}>
          <i className="fas fa-arrow-alt-circle-left"></i> На страницу курсов
        </div>
      </NavLink>
      <div>
        <div className={s.editBlock}>
          <div>Добавить новый курс</div>
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
              value={img}
              onChange={handlleChangeI}
              type="text"
              placeholder="Ссылка на картинку"
            />
            <input
              className={s.regInput}
              value={description}
              onChange={handlleChangeD}
              type="text"
              placeholder="Описание курса"
            />
            <label className={s.regInput}>
              Формат курса
              <select value={format} onChange={handlleChangeF}>
                <option value="1">Онлайн</option>
                <option value="0">Офлайн</option>
              </select>
            </label>

            <input
              className={s.regInput}
              value={duration}
              onChange={handlleChangeDu}
              type="number"
              placeholder="Продолжительность"
            />
            <input
              className={s.regInput}
              value={value}
              onChange={handlleChangeV}
              type="number"
              placeholder="Ценность"
            />
            <button
              onClick={() =>
                dispatch(
                  createCourseAPI(
                    title,
                    img,
                    description,
                    format,
                    duration,
                    value
                  )
                )
              }
            >
              Загрузить курс
            </button>
          </div>
        </div>
        {coursesData.map((c) => (
          <div className={s.courseItem} key={c.id}>
            <div className={s.courseItemFlex}>
              <div className={s.coursePicture}>
                {c.img ? (
                  <img alt="pic" src={c.img} />
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditCourse;
