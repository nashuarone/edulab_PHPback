import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
//import { uploadAvatarAPI } from "../../../api/api";
import { putUserAvatar, deleteUserAvatar, putUserProfile } from "../../../../redux/profileReducer";
//import { API_URL } from "../../../config";
import s from "../ProfileInfo.module.css";

const ProfileInfoEdit = (props) => {
  const dispatch = useDispatch()
  const isLoginFetching = useSelector((s) => s.profilePage.isLoginFetching);
  const currentLearner = useSelector((s) => s.profilePage.profileData);
  const avatarLogo = currentLearner.avatar
  const [avatar, setAvatar] = useState("");

  const [email, setEmail] = useState(currentLearner.email);
  const [second_name, setSecondName] = useState(currentLearner.second_name);
  const [first_name, setFirstName] = useState(currentLearner.first_name);
  const [third_name, setThirdName] = useState(currentLearner.third_name);
  const [birth_date, setBirthdate] = useState(currentLearner.birth_date);
  const [gender, setGender] = useState(currentLearner.gender);
  const [city, setCity] = useState(currentLearner.city);
  const [tel, setTel] = useState(currentLearner.tel);
  let genderText = "Не выбрано"
  if (gender === 2) {
    genderText = "Женский"
  }
  if (gender === 1) {
    genderText = "Мужской";
  }

  const handlleChangeA = (e) => {
    setAvatar(e.target.value);
  };
  const handlleChangeF = (e) => {
    setFirstName(e.target.value);
  };
  const handlleChangeS = (e) => {
    setSecondName(e.target.value);
  };
  const handlleChangeE = (e) => {
    setEmail(e.target.value);
  };
  const handlleChangeB = (e) => {
    setBirthdate(e.target.value);
  };
  const handlleChangeG = (e) => {
    setGender(e.target.value);
  };
  const handlleChangeT = (e) => {
    setThirdName(e.target.value);
  };
  const handlleChangeC = (e) => {
    setCity(e.target.value);
  };
  const handlleChangePh = (e) => {
    setTel(e.target.value);
  };

  return (
    <div className={s.leftPad}>
      <div className={s.profileTitle}>
        <h3>
          Редактирование профиля{" "}
          <NavLink to={"/profile"}>
            <i className="fas fa-arrow-alt-circle-left"></i> в профиль
          </NavLink>
        </h3>
      </div>
      <div className={s.mainProfile}>
        <div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Имя</div>
              <div className={s.postBlock}>{first_name}</div>
              <input
                className={s.regInput}
                value={first_name}
                onChange={handlleChangeF}
                type="text"
                placeholder="Введите имя"
              />
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Фамилия</div>
              <div className={s.postBlock}>{second_name}</div>
              <input
                className={s.regInput}
                value={second_name}
                onChange={handlleChangeS}
                type="text"
                placeholder="Введите фамилию"
              />
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Отчество</div>
              <div className={s.postBlock}>{third_name}</div>
              <input
                className={s.regInput}
                value={third_name}
                onChange={handlleChangeT}
                type="text"
                placeholder="Введите отчество"
              />
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>e-mail</div>
              <div className={s.postBlock}>{email}</div>
              <input
                className={s.regInput}
                value={email}
                onChange={handlleChangeE}
                type="text"
                placeholder="Введите email"
              />
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Дата рождения</div>
              <div className={s.postBlock}>
                {new Date(birth_date).toLocaleString().slice(0, 10)}
              </div>
              <input
                className={s.regInput}
                value={birth_date}
                onChange={handlleChangeB}
                type="date"
                placeholder="Введите дату рождения"
              />
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Пол</div>
              <div className={s.postBlock}>{genderText}</div>
              <select value={gender} onChange={handlleChangeG}>
                <option value="0">Не выбрано</option>
                <option value="1">Муж</option>
                <option value="2">Жен</option>
              </select>
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Город</div>
              <div className={s.postBlock}>{city}</div>
              <input
                className={s.regInput}
                value={city}
                onChange={handlleChangeC}
                type="text"
                placeholder="Введите город"
              />
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalf}>
              <div className={s.boldValue}>Телефон</div>
              <div className={s.postBlock}>{tel}</div>
              <input
                className={s.regInput}
                value={tel}
                onChange={handlleChangePh}
                type="text"
                placeholder="Введите номер телефона"
              />
            </div>
          </div>
          <div className={s.profileItem}>
            <div className={s.profileItemHalfButton}>
              <button
                disabled={isLoginFetching}
                className={s.regBtn}
                onClick={() =>
                  dispatch(
                    putUserProfile(
                      email,
                      first_name,
                      second_name,
                      birth_date,
                      third_name,
                      gender,
                      city,
                      tel
                    )
                  )
                }
              >
                Обновить данные
              </button>
            </div>
          </div>
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

export default ProfileInfoEdit;
