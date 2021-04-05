import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { logout } from '../../redux/profileReducer';
import { API_URL } from "../../config";
import s from "./Header.module.css";

const Header = () => {
  const isAuth = useSelector(s => s.profilePage.isAuth)
  const currentLearner = useSelector((s) => s.profilePage.profileData);
  const avatarLogo = `${API_URL + currentLearner.avatar}`;
  const dispatch = useDispatch()
  return (
    <div className={s.header}>
      <div className={s.header1}>
        <header>
          <img
            src="https://pngimage.net/wp-content/uploads/2018/06/flowers-logo-png-6.png"
            alt="default-logo"
          />
        </header>
        <div className={s.header2}>eduLab</div>
        <div className={s.loginBlock}>
          {!isAuth && <NavLink to={"/registration"}>Registration</NavLink>}
          {!isAuth && <NavLink to={"/login"}>Login</NavLink>}
          {isAuth && (
            <div className={s.closeDiv} onClick={() => dispatch(logout())}>
              Выход
            </div>
          )}
          {isAuth && (
            <div className={s.avatarLogo}>
              <NavLink to={"/profile"}>
                {currentLearner.avatar ? <img src={avatarLogo} alt="" /> : <i class="fas fa-user-graduate"></i>}
              </NavLink>
            </div>
          )}
          {/* {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>} */}
        </div>
      </div>
    </div>
  );
}

export default Header;