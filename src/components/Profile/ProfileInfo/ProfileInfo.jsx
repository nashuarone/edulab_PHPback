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
  }, [userId, dispatch]);

  const otherLearner = useSelector((s) => s.profilePage.otherProfileData);

  let second_name = otherLearner.second_name ? otherLearner.second_name : currentLearner.second_name;
  let first_name = otherLearner.first_name ? otherLearner.first_name : props.profileData.first_name;
  let third_name = otherLearner.third_name ? otherLearner.third_name : currentLearner.third_name;
  let email = otherLearner.email ? otherLearner.email : props.profileData.email;
  let birth_date = otherLearner.birth_date ? otherLearner.birth_date : props.profileData.birth_date;
  let gender = otherLearner.gender ? otherLearner.gender : currentLearner.gender;
  let city = otherLearner.city ? otherLearner.city : currentLearner.city;
  let tel = otherLearner.tel ? otherLearner.tel : currentLearner.tel;
  let role = otherLearner.role === 0 ? otherLearner.role : props.profileData.role;
  let roleLvl = "Пользователь"
  if (role === 2) {
    roleLvl = "Админ"
  }
  if (role === 1) {
    roleLvl = "Преподаватель"
  }
  let genderText = "Не выбрано";
  if (gender === 2) {
    genderText = "Женский";
  }
  if (gender === 1) {
    genderText = "Мужской";
  }
  let avatarLogo = otherLearner.avatar ? otherLearner.avatar : currentLearner.avatar;

  return (
    <div>
      <div className={s.profileTitle}>
        <h3>
          Профиль{" "}
          {(userId === currentLearner.id) && <NavLink to={"/profileditor"}>
            <i title="Редактировать профиль" className="fas fa-pencil-alt"></i>
          </NavLink>}
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
          {third_name && <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Отчество</div>
              <div className={s.postBlock}>{third_name}</div>
            </div>
          </div>}
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
          {gender && <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Пол</div>
              <div className={s.postBlock}>{genderText}</div>
            </div>
          </div>}
          {city && <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Город</div>
              <div className={s.postBlock}>{city}</div>
            </div>
          </div>}
          {tel && <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Телефон</div>
              <div className={s.postBlock}>{tel}</div>
            </div>
          </div>}
        </div>
        <div>
          <div className={s.avatarBlock}>
            <img src={avatarLogo} alt="" />
          </div>
          <div className={s.buttonsBlock}>
            <button onClick={() => dispatch(deleteUserAvatar(null))}>
              Удалить аватар
            </button>
            {/* <div className={s.disk__upload}>
              <label
                htmlFor="disk__uploadInput"
                className={s.disk__uploadLabel}
              >
                Загрузить аватар
              </label>
              <input
                type="file"
                id="disk__uploadInput"
                className={s.disk__uploadInput}
                multiple={true}
                onChange={(e) => avatarUpHandler(e)}
              />
            </div> */}
            <input
              onChange={handlleChangeA}
              value={avatar}
              type="text"
              placeholder="Загрузить аватар"
            />
            <button onClick={() => dispatch(putUserAvatar(avatar))}>Ok</button>
            {/* <input
              className={s.regInput}
              value={first_name}
              onChange={handlleChangeM}
              type="text"
              placeholder="Введите имя"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default compose(withRouter)(ProfileInfo);
