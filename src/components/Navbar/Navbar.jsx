import React from 'react'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import s from "./Navbar.module.css";

const Navbar = () => {
  const isAdminos = useSelector((s) => s.profilePage.isAdminos);
  const totalCount = useSelector((s) => s.usersPage.totalCount);
  return (
    <div className={s.nav}>
      <nav className={s.nav2}>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.activeLink}>
            Профиль
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/courses" activeClassName={s.activeLink}>
            Курсы
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/mycourses" activeClassName={s.activeLink}>
            Мои курсы
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.activeLink}>
            Сообщения
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/disk" activeClassName={s.activeLink}>
            Диск
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/news" activeClassName={s.activeLink}>
            Новости
          </NavLink>
        </div>
        <div className={s.item}>
          <a href="s.com">Группы</a>
        </div>
        <div className={s.item}>
          <a href="s.com">Задания и оценки</a>
        </div>
        <div className={s.item}>
          <a href="s.com">Календарь</a>
        </div>
        <div className={s.item}>
          <a href="s.com">Инструменты</a>
        </div>
        {isAdminos && (
          <div className={s.itemA}>
            <NavLink to="/admin" activeClassName={s.activeLink}>
              ADMIN &#128520;
            </NavLink>
          </div>
        )}
        {isAdminos && (
          <div className={s.friends}>
            <h3>
              Всего пользователей в системе -{" "}
              {totalCount > 0
                ? totalCount + 1
                : "...для обновления данных посетите страницу с пользователями..."}
            </h3>
            <div className={s.friendsblock}>
              <div>
                <img
                  src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
                  alt=""
                />
                <p>Препод</p>
              </div>
              <div>
                <img
                  src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
                  alt=""
                />
                <p>Юзер с длинным ником</p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
