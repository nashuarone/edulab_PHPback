import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player";
import s from "../Courses.module.css";
import { updateCourse, getAllThemes, addCourseTheme } from "../../../redux/coursesReducer";

const EditCourseItemSkin = (props) => {
//  const currentLearnerId = useSelector((s) => s.profilePage.profileData.id);

  const currentCourseData = useSelector((s) => s.coursesPage.currentCourseData);
  const allThemesData = useSelector((s) => s.coursesPage.allThemesData);

  const dispatch = useDispatch();

  const [img, setImg] = useState("");
  const [format, setFormat] = useState(1);
  const [duration, setDuration] = useState(null);
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [themenum, setThemenum] = useState(1);
  const handlleChangeI = (e) => {
    setImg(e.target.value);
  };
  const handlleChangeF = (e) => {
    setFormat(e.target.value);
  };
  const handlleChangeDu = (e) => {
    setDuration(e.target.value);
  };
  const handlleChangeV = (e) => {
    setValue(e.target.value);
  };
  const handlleChangeT = (e) => {
    setTitle(e.target.value);
  };
  const handlleChangeD = (e) => {
    setDescription(e.target.value);
  };
  const handleTmemeChange = (e) => {
    setThemenum(e.target.value);
  };
  useEffect(() => {
    dispatch(getAllThemes());
  }, [dispatch]);
  return (
    <div className={s.coursesPage}>
      <div className={s.editBlockTitle}>Редактировать данные курса</div>
      <div>
        <div className={s.courseItem}>
          <div className={s.courseItemFlex}>
            <div className={s.coursePicture}>
              {currentCourseData.img ? (
                <div>
                  <img alt="pic" src={currentCourseData.img} />
                  <input
                    className={s.regInput}
                    value={img}
                    onChange={handlleChangeI}
                    type="text"
                    placeholder="Ссылка на картинку"
                  />
                </div>
              ) : (
                <ReactPlayer
                  url={currentCourseData.videoLink}
                  className={s.reactPlayer}
                  width="100%"
                  height="100%"
                />
              )}
              <div>
                Формат: {currentCourseData.format === 1 ? "Онлайн" : "Вебинар"}
              </div>
              <select value={format} onChange={handlleChangeF}>
                <option value="1">Онлайн</option>
                <option value="0">Вебинар</option>
              </select>
              <div>Продолжительность: {currentCourseData.duration} часов</div>
              <input
                className={s.regInput}
                value={duration}
                onChange={handlleChangeDu}
                type="number"
                placeholder="Продолжительность"
              />
              <div>Ценность: {currentCourseData.value} баллов</div>
              <input
                className={s.regInput}
                value={value}
                onChange={handlleChangeV}
                type="number"
                placeholder="Ценность"
              />
            </div>
            <div className={s.descriptionItem}>
              <span className={s.tittleDecor}>{currentCourseData.title}</span>
              <div>
                <input
                  className={s.regInput}
                  value={title}
                  onChange={handlleChangeT}
                  type="text"
                  placeholder="Введите новый заголовок"
                />
              </div>
              <div className={s.courseDescription}>
                {currentCourseData.description}
              </div>
              <input
                className={s.regInput}
                value={description}
                onChange={handlleChangeD}
                type="text"
                placeholder="Новое описание курса"
              />
            </div>
          </div>
          <div>
            <button
              className={s.courseBtn}
              onClick={() =>
                dispatch(
                  updateCourse(
                    currentCourseData.id,
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
              Отправить изменения
            </button>
          </div>
          <div>
            <div>
              <div>Темы</div>
              {allThemesData.map((theme) => (
                <div key={theme.id}>
                  <div>
                    <div>
                      <label>
                        <input
                          name="answer"
                          type="radio"
                          value={theme.id}
                          onChange={handleTmemeChange}
                        />
                        {theme.title}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              <div>
                <button
                  className={s.courseBtn}
                  onClick={() => dispatch(addCourseTheme(currentCourseData.id, themenum))}
                >
                  Закрепить тему за курсом
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseItemSkin
