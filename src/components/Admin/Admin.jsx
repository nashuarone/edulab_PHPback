import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Admin.module.css";

const Admin = () => {
  return (
    <div>
      <div className={s.darkTheme}>
        Панель администратора v.0.2.1
        <div>
          <div className={s.contentMain}>
            <div className={s.contentBlock}>
              <div className={s.contentItem}>
                <NavLink to={"/users"}>
                  <div>
                    <i className="fas fa-user-friends"></i>
                    <div>Пользователи</div>
                  </div>
                </NavLink>
              </div>
              <div className={s.contentItem}>
                <NavLink to={"/courses"}>
                  <div>
                    <i className="fas fa-book-reader"></i>
                    <div>Курсы</div>
                  </div>
                </NavLink>
              </div>
              <div className={s.contentItem}>
                <NavLink to={"/news"}>
                  <div>
                    <i className="far fa-newspaper"></i>
                    <div>Новости</div>
                  </div>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
