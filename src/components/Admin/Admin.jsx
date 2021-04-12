import React from "react";
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
                <i class="fas fa-photo-video"></i>
                <div>Медиа</div>
              </div>
              <div className={s.contentItem}>
                <i class="fas fa-align-left"></i>
                <div>Текст</div>
              </div>
              <div className={s.contentItem}>
                <i class="fas fa-file-word"></i>
                <div>Файлы</div>
              </div>
              <div className={s.contentItem}>
                <i class="fas fa-link"></i>
                <div>Ссылки</div>
              </div>
            </div>
          </div>
          <div className={s.contentMain}>
            <span>Пользователи</span>
            <div className={s.contentBlock}>
              <div className={s.contentItem}>
                <i class="fas fa-graduation-cap"></i>
                <div>Ученики</div>
              </div>
              <div className={s.contentItem}>
                <i class="fas fa-university"></i>
                <div>Преподаватели</div>
              </div>
            </div>
          </div>
          <div className={s.contentMain}>
            <span>Обучение</span>
            <div className={s.contentBlock}>
              <div className={s.contentItem}>
                <i class="fas fa-book-reader"></i>
                <div>Курсы</div>
              </div>
              <div className={s.contentItem}>
                <i class="fas fa-video"></i>
                <div>Вебинары</div>
              </div>
              <div className={s.contentItem}>
                <i class="far fa-calendar-check"></i>
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
