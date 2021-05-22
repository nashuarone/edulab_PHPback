import React, { useState, useEffect } from "react";
import { compose } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
//import { uploadAvatarAPI } from "../../../api/api";
import { putUserAvatar, deleteUserAvatar, getAnotherUserProfile } from "../../../redux/profileReducer";
//import { API_URL } from "../../../config";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  const dispatch = useDispatch()
  const currentLearner = useSelector((s) => s.profilePage.profileData);
  const [avatar, setAvatar] = useState("");


  let userId = props.match.params.userId;
  if (!userId) {
    userId = currentLearner.id;
  }

  const handlleChangeA = (e) => {
    setAvatar(e.target.value);
  };

  useEffect(() => {
    dispatch(getAnotherUserProfile(userId));
  }, [userId, dispatch, currentLearner.avatar]);

  const otherLearner = useSelector((s) => s.profilePage.otherProfileData);

  let second_name = currentLearner.second_name;
  let first_name = props.profileData.first_name;
  let third_name = currentLearner.third_name;
  let email = props.profileData.email;
  let birth_date = props.profileData.birth_date;
  let gender = currentLearner.gender;
  let city = currentLearner.city;
  let tel = currentLearner.tel;
  let role = currentLearner.role;
  let avatarLogo = currentLearner.avatar;

  if (otherLearner) {
    second_name = otherLearner.second_name ? otherLearner.second_name : "";
    first_name = otherLearner.first_name ? otherLearner.first_name : "";
    third_name = otherLearner.third_name ? otherLearner.third_name : ""
    email = otherLearner.email ? otherLearner.email : "";
    birth_date = otherLearner.birth_date ? otherLearner.birth_date : ""
    gender = otherLearner.gender ? otherLearner.gender : ""
    city = otherLearner.city ? otherLearner.city : ""
    tel = otherLearner.tel ? otherLearner.tel : ""
    role = otherLearner.role ? otherLearner.role : ""
    avatarLogo = otherLearner.avatar ? otherLearner.avatar : ""
  }

  let roleLvl = "Пользователь"
  if (+role === 2) {
    roleLvl = "Админ"
  }
  if (+role === 1) {
    roleLvl = "Преподаватель"
  }
  let genderText = "Не выбрано";
  if (gender === 2) {
    genderText = "Женский";
  }
  if (gender === 1) {
    genderText = "Мужской";
  }
  return (
    <div>
      <div className={s.profileTitle}>
        <h3>
          Профиль{" "}
          {userId === currentLearner.id && (
            <NavLink to={"/profileditor"}>
              <i
                title="Редактировать профиль"
                className="fas fa-pencil-alt"
              ></i>
            </NavLink>
          )}
        </h3>
      </div>
      <div className={s.mainProfile}>
        <div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Имя</div>
              <div className={s.postBlock}>{first_name}</div>
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Фамилия</div>
              <div className={s.postBlock}>{second_name}</div>
            </div>
          </div>
          {third_name && (
            <div className={s.profileItem}>
              <div className={s.profileItemHalf}>
                <div className={s.boldValue}>Отчество</div>
                <div className={s.postBlock}>{third_name}</div>
              </div>
            </div>
          )}
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>e-mail</div>
              <div className={s.postBlock}>{email}</div>
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Дата рождения</div>
              <div className={s.postBlock}>
                {new Date(birth_date).toLocaleString().slice(0, 10)}
              </div>
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Роль</div>
              <div className={s.postBlock}>{roleLvl}</div>
            </div>
          </div>
          {gender && (
            <div className={s.profileItem}>
              <div className={s.profileItemHalf}>
                <div className={s.boldValue}>Пол</div>
                <div className={s.postBlock}>{genderText}</div>
              </div>
            </div>
          )}
          {city && (
            <div className={s.profileItem}>
              <div className={s.profileItemHalf}>
                <div className={s.boldValue}>Город</div>
                <div className={s.postBlock}>{city}</div>
              </div>
            </div>
          )}
          {tel && (
            <div className={s.profileItem}>
              <div className={s.profileItemHalf}>
                <div className={s.boldValue}>Телефон</div>
                <div className={s.postBlock}>{tel}</div>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={s.avatarBlock}>
            <img src={avatarLogo} alt="" />
          </div>
          {userId === currentLearner.id && (
            <div className={s.buttonsBlock}>
              <button onClick={() => dispatch(deleteUserAvatar(null))}>
                Удалить аватар
              </button>
              <input
                className={s.avatarInput}
                onChange={handlleChangeA}
                value={avatar}
                type="text"
                placeholder="Ссылка на аватар в формате .jpg или .png"
              />
              <button onClick={() => dispatch(putUserAvatar(avatar))}>
                Ok
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default compose(withRouter)(ProfileInfo);
