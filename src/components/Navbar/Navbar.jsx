import React from 'react'
import { NavLink } from 'react-router-dom';
import s from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={s.nav}>
      <nav className={s.nav2}>
        <div className={s.item}>
          <NavLink to="/profile" activeClassName={s.activeLink}>
            Profile
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/dialogs" activeClassName={s.activeLink}>
            Messages
          </NavLink>
        </div>
        <div className={s.item}>
          <NavLink to="/courses" activeClassName={s.activeLink}>
            Курсы
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
          <a href="s.com">Если затык</a>
        </div>
        <div className={s.item}>
          <a href="s.com">Календарь</a>
        </div>
        <div className={s.item}>
          <a href="s.com">Инструменты</a>
        </div>
        <div className={s.friends}>
          <h3>Students</h3>
          <div className={s.friendsblock}>
            <div>
              <img
                src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
                alt=""
              />
              <p>Pups</p>
            </div>
            <div>
              <img
                src="https://media.gettyimages.com/vectors/human-face-avatar-icon-profile-for-social-network-man-vector-vector-id1227618765"
                alt=""
              />
              <p>Keks</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;