import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Admin.module.css";

const Admin = () => {
  return (
    <div>
      <div className={s.darkTheme}>
        Будь осторожен, мой друг, на этой странице...
        <div>
          <div className={s.contentMain}>
            <span>Контент</span>
            <div className={s.contentBlock}>
              <div className={s.contentItem}>
                <i className="fas fa-photo-video"></i>
                <div>Медиа</div>
              </div>
              <div className={s.contentItem}>
                <i className="fas fa-align-left"></i>
                <div>Текст</div>
              </div>
              <div className={s.contentItem}>
                <i className="fas fa-file-word"></i>
                <div>Файлы</div>
              </div>
              <div className={s.contentItem}>
                <i className="fas fa-link"></i>
                <div>Ссылки</div>
              </div>
            </div>
          </div>
          <div className={s.contentMain}>
            <span>Пользователи</span>
            <div className={s.contentBlock}>
              <div className={s.contentItem}>
                <NavLink to={"/users"}>
                  <i className="fas fa-user-friends"></i>
                  <div>Все пользователи</div>
                </NavLink>
              </div>
              <div className={s.contentItem}>
                <i className="fas fa-graduation-cap"></i>
                <div>Ученики</div>
              </div>
              <div className={s.contentItem}>
                <i className="fas fa-university"></i>
                <div>Преподаватели</div>
              </div>
            </div>
          </div>
          <div className={s.contentMain}>
            <span>Обучение</span>
            <div className={s.contentBlock}>
              <div className={s.contentItem}>
                <i className="far fa-newspaper"></i>
                <div>Новости</div>
              </div>
              <div className={s.contentItem}>
                <i className="fas fa-book-reader"></i>
                <div>Курсы</div>
              </div>
              <div className={s.contentItem}>
                <i className="fas fa-video"></i>
                <div>Вебинары</div>
              </div>
              <div className={s.contentItem}>
                <i className="far fa-calendar-check"></i>
                <div>Мероприятия</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
